import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import Overview from "@/components/landing-page/Overview";
import Features from "@/components/landing-page/Features";
import Faq from "@/components/landing-page/Faq";
import Footer from "@/components/landing-page/Footer";

export default function LandingPage() {
   return (
      <main className="bg-ink">
         <Header />
         <Hero />
         <Overview />
         <Features />
         <Faq />
         <Footer />
      </main>
   );
}
