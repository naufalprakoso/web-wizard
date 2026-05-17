"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { listContactMessages } from "@/lib/contact/contact-service";
import type { ContactMessage } from "@/lib/contact/contact-types";

export function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    void listContactMessages().then(setMessages);
  }, []);

  return (
    <Card className="p-5">
      <h2 className="text-xl font-black text-primary">Contact messages</h2>
      <div className="mt-4 grid gap-3">
        {messages.length === 0 ? <p className="text-sm text-slate-600">No messages yet.</p> : null}
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
