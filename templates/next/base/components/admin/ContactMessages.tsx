"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { listContactMessages } from "@/lib/contact/contact-service";
import type { ContactMessage } from "@/lib/contact/contact-types";

export function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    void listContactMessages()
      .then((items) => {
        setMessages(items);
        setError("");
      })
      .catch((messagesError) => {
        const message = messagesError instanceof Error ? messagesError.message : "Unable to load contact messages.";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-black text-primary">Contact messages</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">Inbound product questions and catalog inquiries.</p>
        </div>
        <span className="rounded-full bg-page px-3 py-1 text-xs font-black text-slate-600">{messages.length} total</span>
      </div>
      <div className="mt-4 grid gap-3">
        {loading ? <p className="text-sm font-semibold text-slate-600">Loading messages...</p> : null}
        {error ? <p className="rounded-theme bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}
        {!loading && !error && messages.length === 0 ? (
          <div className="rounded-theme border border-dashed border-slate-300 bg-slate-50 p-5">
            <p className="font-black text-primary">No messages yet.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">When visitors submit the contact form, their inquiries will appear here if Firestore is configured.</p>
          </div>
        ) : null}
        {messages.map((message) => (
          <article key={message.id} className="rounded-theme border border-slate-200 p-4">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <p className="font-bold text-primary">{message.name}</p>
              <a className="text-sm font-semibold text-accent" href={`mailto:${message.email}`}>{message.email}</a>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{message.message}</p>
          </article>
        ))}
      </div>
    </Card>
  );
}
