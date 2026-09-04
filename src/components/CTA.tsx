export function CTA() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-2xl border border-border bg-card card-glow">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Be the first to know when we release new products
          </h2>
          <p className="text-muted-foreground mb-8">
            Join the waitlist for early access.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
