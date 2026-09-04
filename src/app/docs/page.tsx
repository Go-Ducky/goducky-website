import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DocsView from "@/components/DocsView";

export const metadata = {
  title: "GoDucky | Docs",
};

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="section">
        <DocsView />
      </main>
      <Footer />
    </>
  );
}