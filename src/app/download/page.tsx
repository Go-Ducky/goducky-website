import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallCommands from "@/components/InstallCommands";
import UpdateCommands from "@/components/UpdateCommands";

export const metadata = {
  title: "GoDucky | Download",
};

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="text-2xl font-bold mb-1">Download GoDucky</h1>
          <p className="text-sm text-text-weak mb-8">
            Install the GoDucky CLI on your platform.
          </p>

          <h2 className="text-base font-bold text-text-strong mb-4">
            Install
          </h2>
          <div className="flex justify-center mb-12">
            <InstallCommands />
          </div>

          <UpdateCommands />
        </div>
      </main>
      <Footer />
    </>
  );
}