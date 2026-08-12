"use client";

import { memo } from "react";
import { LazyBackground } from "@/components/background/LazyBackground";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Report } from "@/components/sections/Report";
import { Services } from "@/components/sections/Services";
import { Symbol } from "@/components/sections/Symbol";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

function LandingPageComponent() {
  return (
    <div className="relative min-h-screen bg-[#f5f5f7]">
      <LazyBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Symbol />
          <Report />
          <Contact />
        </main>
        <Footer />
        <WhatsAppCTA />
      </div>
    </div>
  );
}

export const LandingPage = memo(LandingPageComponent);
