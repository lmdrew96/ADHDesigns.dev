"use client"

import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import type { Tier, TierField } from "@/lib/services-tiers"

type Status = "idle" | "submitting" | "success" | "error"

const initialValues = (fields: readonly TierField[]): Record<string, string> =>
  Object.fromEntries(fields.map((f) => [f.name, ""]))

const inputBase =
  "w-full rounded-xl glass text-adhd-sage placeholder:text-adhd-lavender/50 px-4 py-3 focus:outline-adhd-sage transition-colors font-medium"

export function InquiryForm({ tier }: { tier: Tier }) {
  const formId = useId()
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(tier.fields))
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const update = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }))

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "submitting") return
    setStatus("submitting")
    setErrorMsg(null)
    try {
      const res = await fetch("/api/services-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId: tier.id, values }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setStatus("error")
        setErrorMsg(data.error ?? "Something went wrong. Try again.")
        return
      }
      setStatus("success")
      setValues(initialValues(tier.fields))
    } catch {
      setStatus("error")
      setErrorMsg("Network error. Try again, or email nae@adhdesigns.dev.")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-adhd-green/15 border-2 border-adhd-green/40 p-6 text-adhd-lavender">
        <p className="font-bold text-lg text-adhd-green">Got it — message received.</p>
        <p className="mt-2 text-adhd-lavender/90">
          I'll reply from <span className="font-mono text-adhd-sage">nae@adhdesigns.dev</span> within a few days. If it's urgent,
          feel free to email directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-adhd-sage underline underline-offset-4 hover:text-adhd-sage/80 text-sm"
        >
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <p className="text-adhd-lavender/80 text-sm leading-relaxed">{tier.formIntro}</p>

      {tier.fields.map((field) => {
        const id = `${formId}-${field.name}`
        const value = values[field.name] ?? ""

        return (
          <div key={field.name} className="space-y-2">
            <label htmlFor={id} className="block font-bold text-adhd-lavender text-sm">
              {field.label}
              {field.required && <span className="text-adhd-sage ml-1">*</span>}
            </label>

            {field.kind === "textarea" ? (
              <textarea
                id={id}
                name={field.name}
                value={value}
                required={field.required}
                placeholder={field.placeholder}
                onChange={(e) => update(field.name, e.target.value)}
                rows={4}
                className={`${inputBase} resize-y min-h-[110px]`}
              />
            ) : field.kind === "select" ? (
              <select
                id={id}
                name={field.name}
                value={value}
                required={field.required}
                onChange={(e) => update(field.name, e.target.value)}
                className={inputBase}
              >
                <option value="" disabled>
                  Select…
                </option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={field.name}
                type={field.kind === "email" ? "email" : "text"}
                value={value}
                required={field.required}
                placeholder={field.placeholder}
                onChange={(e) => update(field.name, e.target.value)}
                className={inputBase}
                autoComplete={field.kind === "email" ? "email" : field.name === "name" ? "name" : "off"}
              />
            )}
          </div>
        )
      })}

      {status === "error" && errorMsg && (
        <div
          role="alert"
          className="rounded-xl bg-adhd-sage/15 border-2 border-adhd-sage/40 px-4 py-3 text-adhd-lavender text-sm"
        >
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="rounded-full px-8 font-bold bg-adhd-sage/35 text-adhd-sage border border-adhd-sage hover:bg-adhd-sage/70 hover:text-adhd-dark transition-colors duration-300 flex-shrink-0"
        >
          {status === "submitting" ? "Sending…" : "Send inquiry"}
        </Button>
        <p className="text-adhd-lavender/60 text-xs sm:self-center">
          Or email{" "}
          <a href="mailto:nae@adhdesigns.dev" className="text-adhd-sage underline underline-offset-4">
            nae@adhdesigns.dev
          </a>{" "}
          directly.
        </p>
      </div>
    </form>
  )
}
