import { Shield } from "lucide-react";

export function Privacy() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-6">
            <Shield className="w-7 h-7 text-muted-foreground" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Built for privacy first
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            GoDucky does not store any of your code or context data, so that it can operate in privacy sensitive environments.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Learn more about privacy
          </a>
        </div>
      </div>
    </section>
  );
}
