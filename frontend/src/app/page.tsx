import Hero from "@/components/Hero";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import ExtraSection from "@/components/ExtraSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 relative">
      <Hero />
      <ExtraSection />
      <WhatsAppButton />
      <Footer />
    </main>
  );
}
