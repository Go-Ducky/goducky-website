"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is GoDucky?",
    answer: "GoDucky is an open source AI coding agent that helps you write, understand, and refactor code. It runs in your terminal, IDE, or as a desktop application.",
  },
  {
    question: "How do I use GoDucky?",
    answer: "Install GoDucky using npm, bun, brew, or paru. Then run `goducky` in your terminal to start interacting with the AI agent.",
  },
  {
    question: "Do I need extra AI subscriptions to use GoDucky?",
    answer: "No. GoDucky comes with free models included. You can also connect your own API keys from providers like OpenAI, Anthropic, or Google.",
  },
  {
    question: "Can I use my existing AI subscriptions with GoDucky?",
    answer: "Yes! GoDucky supports GitHub Copilot, ChatGPT Plus/Pro, and any provider through Models.dev with over 75 LLM options.",
  },
  {
    question: "Can I only use GoDucky in the terminal?",
    answer: "No. GoDucky is available as a terminal interface, desktop application, and IDE extension for VS Code and other editors.",
  },
  {
    question: "How much does GoDucky cost?",
    answer: "GoDucky is completely free and open source. You only pay for the AI model usage if you choose to use a paid provider.",
  },
  {
    question: "What about data and privacy?",
    answer: "GoDucky does not store any of your code or context data. Everything runs locally and your data stays private.",
  },
  {
    question: "Is GoDucky open source?",
    answer: "Yes. GoDucky is fully open source under a permissive license. You can view, modify, and contribute to the code on GitHub.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-border rounded-xl overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-medium hover:bg-secondary/50 transition-colors"
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`faq-answer ${openIndex === i ? "open" : ""}`}
              >
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
