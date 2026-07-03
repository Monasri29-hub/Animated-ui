import { useState, useEffect } from "react";
import { CylinderCarousel } from "@/components/ui/cylinder-carousel";
import { MorphText } from "@/components/ui/morph-text";
import { ChevronDown } from "lucide-react";

// Curated local high-quality generated Seoul photos
const SEOUL_IMAGES = [
  {
    src: "/seoul_tower.png",
    alt: "N Seoul Tower",
    title: "N Seoul Tower",
    description: "Rising 236 meters above Namsan Mountain, offering panoramic views of the entire metropolis."
  },
  {
    src: "/gyeongbokgung_palace.png",
    alt: "Gyeongbokgung Palace",
    title: "Gyeongbokgung Palace",
    description: "The main royal palace of the Joseon dynasty, built in 1395, representing historical majesty."
  },
  {
    src: "/ddp_plaza.png",
    alt: "Dongdaemun Design Plaza",
    title: "DDP Plaza",
    description: "A futuristic neofuturistic landmark designed by Zaha Hadid, featuring powerful curved forms."
  },
  {
    src: "/hanok_village.png",
    alt: "Bukchon Hanok Village",
    title: "Bukchon Village",
    description: "A traditional village home to hundreds of hanok (traditional houses) dating back to the Joseon dynasty."
  },
  {
    src: "/han_river.png",
    alt: "Han River and Banpo Bridge",
    title: "Han River Vista",
    description: "The Han River running through the city, flanked by parks and bridges with colorful light shows."
  },
  {
    src: "/lotte_tower.png",
    alt: "Lotte World Tower",
    title: "Lotte World Tower",
    description: "The tallest building in South Korea, standing at 555 meters as a beacon of modern architectural power."
  },
  {
    src: "/gwanghwamun_gate.png",
    alt: "Gwanghwamun Gate",
    title: "Gwanghwamun Gate",
    description: "The main and largest gate of Gyeongbokgung Palace, glowing under evening illumination."
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Prevent the browser from restoring scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setHasScrolled(true);
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-[#06070b] text-neutral-100 flex flex-col font-sans relative overflow-x-hidden">
      
      {/* ── Section 1: Full Screen 3D Carousel (Fixed in background) ── */}
      <section className="fixed inset-0 h-screen w-full flex flex-col items-center justify-center z-10 overflow-hidden bg-[#06070b]">
        {/* Decorative background grid and glowing circles */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
        
        {/* Centered Cylinder Carousel */}
        <CylinderCarousel 
          images={SEOUL_IMAGES} 
          animationDuration={21}
          cardWidth={577.89}
          className="w-full select-none"
          cardClassName="border border-white/10 hover:border-violet-500/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.03]"
        />

        {/* Bouncing Scroll Down Indicator (Fades out when scrolled) */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-500 select-none animate-bounce cursor-pointer z-30 pointer-events-auto transition-opacity duration-500 ${
            scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-neutral-400">Scroll Down</span>
          <ChevronDown className="w-5 h-5 text-violet-400" />
        </div>
      </section>

      {/* ── Section 2: Full Screen Morph Text (Scrolls transparently over Section 1) ── */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-transparent z-20 mt-[100vh] overflow-hidden pointer-events-none">
        {/* Glowing circle for the second fold */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-600/10 blur-[120px] pointer-events-none animate-pulse duration-[10000ms]" />
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />
        
        {/* Curated Morph Text component (Centered, rendered only when scrolled down and user scrolled since load) */}
        {hasScrolled && scrolled && (
          <MorphText
            words={["SEOUL", "DREAM", "INTUITION"]}
            interval={2500}
            subtext="Move fast. Break things."
            fontSize="clamp(2rem, 10vw, 8rem)"
            className="relative z-10"
          />
        )}
      </section>

    </div>
  );
}
