"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check, ChevronDown } from "lucide-react";

const modes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 rounded">
        <Monitor size={18} className="text-text-weak" />
      </div>
    );
  }

  const currentTheme =
    theme === "light"
      ? modes[0]
      : theme === "dark"
        ? modes[1]
        : modes[2];

  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 p-2 rounded no-underline hover:bg-background-weak transition-colors"
        aria-label={`Theme: ${currentTheme.label}. Click to change.`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <CurrentIcon size={18} className="text-text-weak" />
        <ChevronDown
          size={14}
          className={`text-text-weak transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-40 py-1.5 bg-background border border-border rounded-md shadow-lg z-50"
        >
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = theme === mode.value;
            return (
              <button
                key={mode.value}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setTheme(mode.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm no-underline transition-colors ${
                  isActive
                    ? "text-text-strong bg-background-weak"
                    : "text-text-weak hover:text-text-strong hover:bg-background-weak"
                }`}
              >
                <Icon size={16} />
                <span className="flex-1 text-left">{mode.label}</span>
                {isActive && <Check size={16} className="text-text-strong" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
