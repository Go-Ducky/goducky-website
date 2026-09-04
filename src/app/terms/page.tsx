import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GoDucky | Terms of Service",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="text-2xl font-bold mb-2">Terms of Use</h1>
          <p className="text-sm text-text-weak mb-8">Effective date: Sep 4, 2026</p>

          <div className="text-sm leading-relaxed space-y-6">
            <p>Welcome to GoDucky. Please read on to learn the rules and restrictions that govern your use of GoDucky's website, inference product and hosted software offering (the "Services").</p>

            <h2 className="text-lg font-bold mt-8 mb-4">What is GoDucky?</h2>
            <p>GoDucky is an AI-powered coding agent that helps you write, understand, and modify code using large language models. GoDucky enables you to access the functionality of models through a coding agent running in your GUI, WebUI, or CLI.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Will these Terms ever change?</h2>
            <p>We are constantly trying to improve our Services, so these Terms may need to change along with our Services. We reserve the right to change the Terms at any time. If you don't agree with the new Terms, you are free to reject them; unfortunately, that means you will no longer be able to use the Services.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Privacy</h2>
            <p>GoDucky takes the privacy of its users very seriously. For the current GoDucky Privacy Policy, please visit our <a href="/privacy" className="text-text-weak hover:text-text-strong">Privacy Policy</a>.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">What are the basics of using GoDucky?</h2>
            <p>You represent and warrant that you are an individual of legal age to form a binding contract. You will only use the Services for your own internal use, and only in a manner that complies with all laws that apply to you.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Restrictions</h2>
            <p>You agree not to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Infringe or violate the intellectual property rights of anyone else</li>
              <li>Violate any law or regulation</li>
              <li>Use the Services for any dangerous, harmful, fraudulent, or deceptive purpose</li>
              <li>Automatically or programmatically extract data or Output from the Services</li>
              <li>Use Output to develop AI models that compete with the Services</li>
              <li>Attempt to obtain security information from any other user</li>
              <li>Crawl, scrape, or spider any page or data of the Services</li>
            </ul>

            <h2 className="text-lg font-bold mt-8 mb-4">Intellectual Property</h2>
            <p><strong className="text-text-strong">Our IP:</strong> We retain all right, title and interest in and to the Services.</p>
            <p><strong className="text-text-strong">Your IP:</strong> You retain your ownership rights in Input and own the Output. We hereby assign to you all our right, title, and interest, if any, in and to Output.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Cost</h2>
            <p>GoDucky may be free or we may charge a fee for using certain Services. If you are using a free version of the Services, we will notify you before any Services you are then using begin carrying a fee.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Termination</h2>
            <p>You're free to stop using the Services at any time. GoDucky may also terminate your use of the Services for any reason, including your breach of these Terms.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Warranty Disclaimer</h2>
            <p>THE SERVICES AND CONTENT ARE PROVIDED ON AN "AS-IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR THAT USE OF THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Limitation of Liability</h2>
            <p>UNDER NO CIRCUMSTANCES SHALL GO DUCKY BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY AMOUNT IN EXCESS OF THE GREATER OF $100 OR THE AMOUNTS PAID BY YOU TO GO DUCKY IN THE TWELVE (12) MONTH PERIOD PRECEDING THE APPLICABLE CLAIM.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@goducky.dev" className="text-text-weak hover:text-text-strong">legal@goducky.dev</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
