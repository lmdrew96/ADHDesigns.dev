import { NextResponse } from "next/server"
import { Resend } from "resend"

import { TIER_BY_ID, type Tier } from "@/lib/services-tiers"

type InquiryPayload = {
  tierId: string
  values: Record<string, string>
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const validate = (
  tier: Tier,
  values: Record<string, unknown>,
): { ok: true; clean: Record<string, string> } | { ok: false; error: string } => {
  const clean: Record<string, string> = {}

  for (const field of tier.fields) {
    const raw = values[field.name]
    if (raw === undefined || raw === null) {
      if (field.required) return { ok: false, error: `Missing required field: ${field.label}` }
      continue
    }
    if (typeof raw !== "string") {
      return { ok: false, error: `Invalid value for: ${field.label}` }
    }
    const trimmed = raw.trim()
    if (field.required && trimmed.length === 0) {
      return { ok: false, error: `Missing required field: ${field.label}` }
    }
    if (trimmed.length > 5000) {
      return { ok: false, error: `${field.label} is too long.` }
    }
    if (field.kind === "email" && trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return { ok: false, error: `Invalid email address.` }
    }
    if (field.kind === "select" && field.options && !field.options.includes(trimmed)) {
      return { ok: false, error: `Invalid option for: ${field.label}` }
    }
    clean[field.name] = trimmed
  }

  return { ok: true, clean }
}

const buildEmail = (
  tier: Tier,
  clean: Record<string, string>,
): { subject: string; html: string; text: string; replyTo?: string } => {
  const submitter = clean.name ? clean.name : "someone"
  const subject = `[ADHDesigns Services] ${tier.badge} — inquiry from ${submitter}`

  const rows = tier.fields
    .map((field) => {
      const value = clean[field.name] ?? ""
      const safeLabel = escapeHtml(field.label)
      const safeValue = escapeHtml(value).replace(/\n/g, "<br>")
      return `
        <tr>
          <td style="padding:8px 12px;background:#1E1830;color:#DBD5E2;font-weight:600;vertical-align:top;width:32%;border-bottom:1px solid #244952;">${safeLabel}</td>
          <td style="padding:8px 12px;background:#F7F5FA;color:#1E1830;vertical-align:top;border-bottom:1px solid #DBD5E2;">${safeValue || "<em style='color:#88739E'>(empty)</em>"}</td>
        </tr>`
    })
    .join("")

  const html = `<!doctype html>
    <html><body style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#F7F5FA;padding:24px;color:#1E1830;">
      <div style="max-width:640px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(30,24,48,0.12);">
        <div style="background:#244952;color:#DFA649;padding:24px;">
          <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.85;">${escapeHtml(tier.badge)}</div>
          <div style="font-size:22px;font-weight:700;color:#F7F5FA;margin-top:6px;">New service inquiry</div>
        </div>
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
      </div>
    </body></html>`

  const text = tier.fields
    .map((field) => `${field.label}: ${clean[field.name] ?? ""}`)
    .join("\n")

  return { subject, html, text, replyTo: clean.email }
}

export async function POST(req: Request) {
  let body: InquiryPayload
  try {
    body = (await req.json()) as InquiryPayload
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 })
  }

  const tier = TIER_BY_ID[body.tierId as Tier["id"]]
  if (!tier) return NextResponse.json({ error: "Unknown service tier." }, { status: 400 })

  const result = validate(tier, body.values ?? {})
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[services-inquiry] RESEND_API_KEY missing")
    return NextResponse.json(
      { error: "Email service is not configured. Try emailing nae@adhdesigns.dev directly." },
      { status: 503 },
    )
  }

  const to = process.env.SERVICES_INQUIRY_TO || "nae@adhdesigns.dev"
  const from = process.env.SERVICES_INQUIRY_FROM || "ADHDesigns <onboarding@resend.dev>"
  const { subject, html, text, replyTo } = buildEmail(tier, result.clean)

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
      replyTo,
    })
    if (error) {
      console.error("[services-inquiry] Resend error:", error)
      return NextResponse.json({ error: "Failed to send. Try again in a moment." }, { status: 502 })
    }
  } catch (err) {
    console.error("[services-inquiry] Unexpected error:", err)
    return NextResponse.json({ error: "Failed to send. Try again in a moment." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
