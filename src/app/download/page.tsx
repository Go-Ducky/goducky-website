import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CliDownloads from "@/components/CliDownloads";

export const metadata = {
  title: "GoDucky | Download",
};

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="max-w-3xl mx-auto px-5">
          <CliDownloads />
        </div>
      </main>
      <Footer />
    </>
  );
}
