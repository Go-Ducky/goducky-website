export function Stats() {
  const stats = [
    { value: "195K", label: "GitHub Stars", figure: "Fig 1." },
    { value: "950", label: "Contributors", figure: "Fig 2." },
    { value: "16M", label: "Monthly Devs", figure: "Fig 3." },
  ];

  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            The open source AI coding agent
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            With over <strong className="text-foreground">195,000</strong> GitHub stars, <strong className="text-foreground">950</strong> contributors,
            and over <strong className="text-foreground">13,000</strong> commits, GoDucky is used and trusted by over <strong className="text-foreground">16M</strong> developers every month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-xl border border-border bg-card"
            >
              <p className="text-xs text-muted-foreground mb-2">{stat.figure}</p>
              <p className="text-5xl font-bold tracking-tight mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
