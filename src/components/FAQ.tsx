"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqItems = [
  {
    question: "What is GoDucky?",
    answer:
      "GoDucky is an open source agent that helps you write code with any AI model. It's available as a GUI desktop app, WebUI, and CLI.",
  },
  {
    question: "How do I use GoDucky?",
    answer:
      "The easiest way to get started is to read the intro in our documentation.",
  },
  {
    question: "Do I need extra AI subscriptions to use GoDucky?",
    answer:
      "Not necessarily. GoDucky comes with a set of free models that you can use without creating an account. You can also use any of the popular coding models by creating an account. GoDucky works with all popular providers such as OpenAI, Anthropic, xAI and more. You can even connect your local models.",
  },
  {
    question: "Can I use my existing AI subscriptions with GoDucky?",
    answer:
      "Yes! GoDucky supports subscription plans from all major providers. You can use your Claude Pro/Max, ChatGPT Plus/Pro, or GitHub Copilot subscriptions.",
  },
  {
    question: "Can I only use GoDucky in the terminal?",
    answer:
      "Not anymore! GoDucky is available as a desktop GUI app, a WebUI, and a CLI.",
  },
  {
    question: "How much does GoDucky cost?",
    answer:
      "GoDucky is 100% free to use. It also comes with a set of free models. There might be additional costs if you connect any other provider.",
  },
  {
    question: "What about data and privacy?",
    answer:
      "Your data and information is only stored when you use our free models or create sharable links. Learn more about our privacy policy.",
  },
  {
    question: "Is GoDucky open source?",
    answer:
      "Yes, GoDucky is fully open source. The source code is public on GitHub under the MIT License, which means anyone can use, modify, or contribute to its development.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-5">
        <h3 className="text-base font-bold text-text-strong mb-8 font-sans">
          FAQ
        </h3>
        <div className="divide-y divide-border-weak border-y border-border-weak">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <button
                  className="w-full flex items-center justify-between gap-4 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-text-strong text-sm flex-1">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 shrink-0 text-text-weak" />
                  ) : (
                    <Plus className="w-5 h-5 shrink-0 text-text-weak" />
                  )}
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden ml-8">
                    <p className="text-text text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}