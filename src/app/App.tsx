import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LogoMarquee } from "./components/LogoMarquee";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { TextMarquee } from "./components/TextMarquee";
import { Portfolio } from "./components/Portfolio";
import { WhyUs } from "./components/WhyUs";
import { Process } from "./components/Process";
import { TechStack } from "./components/TechStack";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Navbar />
      <Hero />
      <LogoMarquee />
      <Stats />
      <Services />
      <TextMarquee />
      <Portfolio />
      <WhyUs />
      <Process />
      <TechStack />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <Analytics />
    </div>
  );
}
