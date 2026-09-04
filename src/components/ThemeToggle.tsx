"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const label =
    theme === "light"
      ? "Light theme"
      : theme === "dark"
        ? "Dark theme"
        : "System theme";

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded no-underline"
      aria-label={label}
    >
      {theme === "light" && <Sun size={18} className="text-amber-500" />}
      {theme === "dark" && <Moon size={18} className="text-blue-400" />}
      {theme === "system" && (
        <Monitor size={18} className="text-text-weak" />
      )}
    </button>
  );
}
