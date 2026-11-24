export default function Privacy() {
  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-5">
        <h3 className="text-base font-bold text-text-strong mb-3 font-sans">
          Built for privacy first
        </h3>
        <p className="text-text leading-relaxed">
          CLI sessions stay on your device. WebUI saves your conversations in your
          account; Anonymous Chat keeps conversations out of chat history.{" "}
          <a
            href="/privacy"
            className="text-text-weak hover:text-text-strong underline underline-offset-[3px]"
          >
            Learn more about privacy
          </a>
        </p>
      </div>
    </section>
  );
}