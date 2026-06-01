"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openQuestion, setOpenQuestion] = useState(items[0]?.question ?? "");

  return (
    <div className="grid gap-3">
      {items.map((item) => {
        const open = openQuestion === item.question;
        return (
          <div key={item.question} className="rounded-theme border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              className="focus-ring flex w-full items-center justify-between gap-4 rounded-theme px-5 py-4 text-left"
              aria-expanded={open}
              onClick={() => setOpenQuestion(open ? "" : item.question)}
            >
              <span className="text-lg font-black text-primary">{item.question}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-page text-lg font-black text-accent">{open ? "-" : "+"}</span>
            </button>
            {open ? <p className="px-5 pb-5 leading-7 text-slate-600">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
