import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GoDucky | Download",
};

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="max-w-3xl mx-auto px-5 py-24 text-center">
          <h1 className="text-2xl font-bold mb-2">Download GoDucky</h1>
          <p className="text-text-weak text-sm">
            Under construction. Coming soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
