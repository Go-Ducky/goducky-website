export default function Stats() {
  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-5">
        <h3 className="text-base font-bold text-text-strong mb-3 font-sans">
          The open source AI coding agent
        </h3>
        <p className="text-text">
          With over <strong className="font-medium text-text-strong">195,000</strong> GitHub stars,{" "}
          <strong className="font-medium text-text-strong">950</strong> contributors, and over{" "}
          <strong className="font-medium text-text-strong">13,000</strong> commits, GoDucky is used
          and trusted by over <strong className="font-medium text-text-strong">16M</strong> developers
          every month.
        </p>
        <div className="flex gap-16 mt-12">
          <div className="text-center">
            <p className="text-xs text-text-weak">Fig N.</p>
            <p className="text-2xl font-bold text-text-strong mb-1 font-sans">
              195K
            </p>
            <p className="text-sm text-text-weak">GitHub Stars</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-weak">Fig N.</p>
            <p className="text-2xl font-bold text-text-strong mb-1 font-sans">
              950
            </p>
            <p className="text-sm text-text-weak">Contributors</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-weak">Fig N.</p>
            <p className="text-2xl font-bold text-text-strong mb-1 font-sans">
              16M
            </p>
            <p className="text-sm text-text-weak">Monthly Devs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
