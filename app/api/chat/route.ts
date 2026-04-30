import { NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { Resend } from "resend"

import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-system-prompt"

export const runtime = "nodejs"
export const maxDuration = 30

const MODEL = "claude-haiku-4-5-20251001"
const MAX_MESSAGES = 40
const MAX_CONTENT_LENGTH = 4000

type ClientMessage = {
  role: "user" | "assistant"
  content: string
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const validateMessages = (
  raw: unknown,
): { ok: true; messages: ClientMessage[] } | { ok: false; error: string } => {
  if (!Array.isArray(raw)) return { ok: false, error: "messages must be an array" }
  if (raw.length === 0) return { ok: false, error: "messages cannot be empty" }
  if (raw.length > MAX_MESSAGES) return { ok: false, error: "Too many messages in this conversation." }

  const out: ClientMessage[] = []
  for (const m of raw) {
    if (!m || typeof m !== "object") return { ok: false, error: "Invalid message shape" }
    const { role, content } = m as Record<string, unknown>
    if (role !== "user" && role !== "assistant") return { ok: false, error: "Invalid role" }
    if (typeof content !== "string") return { ok: false, error: "Invalid content" }
    const trimmed = content.trim()
    if (!trimmed) continue
    if (trimmed.length > MAX_CONTENT_LENGTH) return { ok: false, error: "Message too long." }
    out.push({ role, content: trimmed })
  }
  if (out.length === 0) return { ok: false, error: "No valid messages." }
  if (out[out.length - 1].role !== "user") return { ok: false, error: "Last message must be from user." }
  return { ok: true, messages: out }
}

type ContactInput = {
  name: string
  email: string
  message: string
}

const validateContact = (
  input: unknown,
): { ok: true; contact: ContactInput } | { ok: false; error: string } => {
  if (!input || typeof input !== "object") return { ok: false, error: "Invalid contact input." }
  const { name, email, message } = input as Record<string, unknown>
  if (typeof name !== "string" || !name.trim()) return { ok: false, error: "Name is required." }
  if (typeof email !== "string" || !isEmail(email.trim())) return { ok: false, error: "A valid email is required." }
  if (typeof message !== "string" || !message.trim()) return { ok: false, error: "A message is required." }
  if (name.length > 200 || email.length > 200 || message.length > 4000) {
    return { ok: false, error: "Contact fields are too long." }
  }
  return {
    ok: true,
    contact: { name: name.trim(), email: email.trim(), message: message.trim() },
  }
}

const sendContactEmail = async (
  contact: ContactInput,
  transcript: ClientMessage[],
): Promise<{ ok: true } | { ok: false; error: string }> => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("[chat] RESEND_API_KEY missing — logging contact instead")
    console.log("[chat] Contact submission:", contact)
    return { ok: true }
  }

  const to = process.env.CHAT_CONTACT_TO || "nae@adhdesigns.dev"
  const from = process.env.SERVICES_INQUIRY_FROM || "ADHDesigns <onboarding@resend.dev>"

  const transcriptHtml = transcript
    .map((m) => {
      const role = m.role === "user" ? "Visitor" : "Assistant"
      const safe = escapeHtml(m.content).replace(/\n/g, "<br>")
      return `<div style="margin:8px 0;"><strong style="color:#244952">${role}:</strong> <span style="color:#1E1830">${safe}</span></div>`
    })
    .join("")

  const html = `<!doctype html>
    <html><body style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#F7F5FA;padding:24px;color:#1E1830;">
      <div style="max-width:640px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(30,24,48,0.12);background:#fff;">
        <div style="background:#244952;color:#DFA649;padding:24px;">
          <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.85;">Portfolio Chatbot</div>
          <div style="font-size:22px;font-weight:700;color:#F7F5FA;margin-top:6px;">New visitor message</div>
        </div>
        <div style="padding:24px;">
          <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;background:#F7F5FA;padding:12px;border-radius:8px;">${escapeHtml(contact.message)}</p>
          <hr style="border:none;border-top:1px solid #DBD5E2;margin:24px 0;">
          <p style="color:#88739E;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Transcript</p>
          ${transcriptHtml}
        </div>
      </div>
    </body></html>`

  const text = `New chatbot contact:
Name: ${contact.name}
Email: ${contact.email}
Message: ${contact.message}

--- Transcript ---
${transcript.map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`).join("\n\n")}`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `[ADHDesigns Chatbot] New message from ${contact.name}`,
      html,
      text,
      replyTo: contact.email,
    })
    if (error) {
      console.error("[chat] Resend error:", error)
      return { ok: false, error: "Failed to deliver your message. Try emailing nae@adhdesigns.dev directly." }
    }
    return { ok: true }
  } catch (err) {
    console.error("[chat] Resend threw:", err)
    return { ok: false, error: "Failed to deliver your message. Try emailing nae@adhdesigns.dev directly." }
  }
}

const SUBMIT_CONTACT_TOOL: Anthropic.Tool = {
  name: "submit_contact",
  description:
    "Submit a visitor's contact information to Nae after collecting their name, email, and a brief message. Only call this once you have all three pieces of information.",
  input_schema: {
    type: "object",
    properties: {
      name: { type: "string", description: "Visitor's full name" },
      email: { type: "string", description: "Visitor's email address" },
      message: { type: "string", description: "What the visitor wants Nae to know" },
    },
    required: ["name", "email", "message"],
  },
}

export async function POST(req: Request) {
  let body: { messages?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 })
  }

  const validation = validateMessages(body.messages)
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }
  const messages = validation.messages

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error("[chat] ANTHROPIC_API_KEY missing")
    return NextResponse.json(
      { error: "The chat assistant isn't configured yet. Email nae@adhdesigns.dev directly." },
      { status: 503 },
    )
  }

  const client = new Anthropic({ apiKey })

  const apiMessages: Anthropic.MessageParam[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }))

  try {
    let response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: [
        {
          type: "text",
          text: CHAT_SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      tools: [SUBMIT_CONTACT_TOOL],
      messages: apiMessages,
    })

    if (response.stop_reason === "tool_use") {
      const toolUse = response.content.find(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
      )
      if (toolUse && toolUse.name === "submit_contact") {
        const validated = validateContact(toolUse.input)
        let toolResultContent: string
        let contactStatus: "sent" | "error" = "error"
        if (validated.ok) {
          const sent = await sendContactEmail(validated.contact, messages)
          if (sent.ok) {
            contactStatus = "sent"
            toolResultContent =
              "Contact submitted successfully. Nae will get the message and follow up by email."
          } else {
            toolResultContent = sent.error
          }
        } else {
          toolResultContent = `Validation failed: ${validated.error} Please ask the visitor for the missing information.`
        }

        const followup = await client.messages.create({
          model: MODEL,
          max_tokens: 512,
          system: [
            {
              type: "text",
              text: CHAT_SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          tools: [SUBMIT_CONTACT_TOOL],
          messages: [
            ...apiMessages,
            { role: "assistant", content: response.content },
            {
              role: "user",
              content: [
                {
                  type: "tool_result",
                  tool_use_id: toolUse.id,
                  content: toolResultContent,
                  is_error: contactStatus === "error",
                },
              ],
            },
          ],
        })
        response = followup
      }
    }

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim()

    return NextResponse.json({
      content: text || "Sorry — I couldn't generate a response just now.",
    })
  } catch (err) {
    console.error("[chat] Anthropic error:", err)
    return NextResponse.json(
      { error: "The chat assistant ran into trouble. Try again, or email nae@adhdesigns.dev." },
      { status: 502 },
    )
  }
}
