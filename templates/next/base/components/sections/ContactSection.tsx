"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitContactMessage } from "@/lib/contact/contact-service";

export function ContactSection({ title = "Start the conversation", subtitle = "Tell us what you need and we will get back to you soon." }: { title?: string; subtitle?: string }) {
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await submitContactMessage({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        message: String(form.get("message") ?? ""),
        website: String(form.get("website") ?? "")
      });
      event.currentTarget.reset();
      setStatus("Message sent. We will reply soon.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Check your details and try again.";
      setStatus(message);
    }
  }

  return (
    <section id="contact" className="bg-primary py-16 text-white md:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-secondary">Contact</p>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-white/75 md:text-lg">{subtitle}</p>
          <div className="mt-8 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
            {["Product questions", "Availability checks", "Custom requests"].map((item) => (
              <div key={item} className="rounded-theme border border-white/10 bg-white/5 p-4">
                <p className="font-bold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="rounded-theme bg-white p-5 text-slate-950 shadow-2xl md:p-6">
          <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-bold">
              Name
              <input className="focus-ring mt-2 min-h-12 w-full rounded-theme border border-slate-300 px-4" name="name" required />
            </label>
            <label className="text-sm font-bold">
              Email
              <input className="focus-ring mt-2 min-h-12 w-full rounded-theme border border-slate-300 px-4" name="email" type="email" required />
            </label>
          </div>
          <label className="mt-4 block text-sm font-bold">
            Message
            <textarea className="focus-ring mt-2 min-h-36 w-full rounded-theme border border-slate-300 px-4 py-3" name="message" required />
          </label>
          {status ? <p className="mt-4 rounded-theme bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">{status}</p> : null}
          <Button className="mt-5 w-full md:w-auto" type="submit">Send message</Button>
        </form>
      </div>
    </section>
  );
}
