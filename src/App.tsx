import { useState, useEffect, useRef } from "react";
import { CylinderCarousel } from "@/components/ui/cylinder-carousel";
import { MorphText } from "@/components/ui/morph-text";
import { ImageTrail } from "@/components/ui/image-trail";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { TwistingRibbon } from "@/components/ui/twisting-ribbon";
import { AuroraHero } from "@/components/ui/aurora-hero";
import { ScrollZoomReveal } from "@/components/ui/scroll-zoom-reveal";
import { ChevronDown, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Curated local high-quality generated Seoul photos for the 3D Carousel
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

// Local high-quality generated images for the Image Trail
const TRAIL_IMAGES = [
  "/hangul_trail.png",
  "/kpop_trail.png",
  "/kdrama_trail.png",
  "/boba_tea_trail.png",
  "/hybe_ent_trail.png"
];

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [page3Scrolled, setPage3Scrolled] = useState(false);

  const page3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent the browser from restoring scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const handlePage1Scroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setHasScrolled(true);
    setScrolled(scrollTop > 100);
  };

  const handlePage3Scroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const clientHeight = e.currentTarget.clientHeight;
    // Show bounce helper during the static full-screen buffer (between 3.0 and 4.0 viewports scrolled)
    setPage3Scrolled(scrollTop > 2.95 * clientHeight && scrollTop < 4.0 * clientHeight);
  };

  const goToPage2 = () => {
    setCurrentPage(1);
  };

  const goToPage1 = () => {
    setCurrentPage(0);
  };

  const goToPage3 = () => {
    setCurrentPage(2);
  };

  const goToPage2FromPage3 = () => {
    setCurrentPage(1);
    // Reset scroll of Page 3 after slide transition completes
    setTimeout(() => {
      if (page3Ref.current) {
        page3Ref.current.scrollTop = 0;
      }
    }, 850);
  };

  return (
    <div className="min-h-screen w-screen bg-[#06070b] text-neutral-100 font-sans relative overflow-hidden">
      
      {/* Horizontal Page Slider Container */}
      <div 
        className="flex w-[300vw] h-screen transition-transform duration-[850ms] cubic-bezier(0.85, 0, 0.15, 1)"
        style={{ transform: `translateX(-${currentPage * 100}vw)` }}
      >
        
        {/* ── PAGE 1: Cylinder Carousel & Scroll MorphText ─────────────── */}
        <div 
          onScroll={handlePage1Scroll}
          className="h-screen w-screen overflow-y-auto relative scroll-smooth select-none"
        >
          {/* Section 1: Sticky 3D Carousel (Fixed in view within Page 1) */}
          <div className="sticky top-0 left-0 h-screen w-full flex flex-col items-center justify-center z-10 overflow-hidden bg-[#06070b]">
            {/* Aurora Background Effect */}
            <AuroraHero
              title=""
              className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.25]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
            
            <CylinderCarousel 
              images={SEOUL_IMAGES} 
              animationDuration={21}
              cardWidth={577.89}
              className="w-full"
              cardClassName="border border-white/10 hover:border-violet-500/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.03]"
            />

            <div 
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-500 animate-bounce cursor-pointer z-30 transition-opacity duration-500 ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              onClick={(e) => {
                e.currentTarget.parentElement?.parentElement?.scrollTo({ top: window.innerHeight, behavior: "smooth" });
              }}
            >
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-neutral-400">Scroll Down</span>
              <ChevronDown className="w-5 h-5 text-violet-400" />
            </div>
          </div>

          {/* Section 2: Relative MorphText Overlay */}
          <div className="relative h-screen w-full flex flex-col items-center justify-center bg-transparent z-20 overflow-hidden pointer-events-none mt-[100vh]">
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-600/10 blur-[120px] pointer-events-none animate-pulse duration-[10000ms]" />
            <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />
            
            {hasScrolled && scrolled && (
              <MorphText
                words={["SEOUL", "DREAM", "INTUITION"]}
                interval={2500}
                subtext="Move fast. Break things."
                fontSize="clamp(2rem, 10vw, 8rem)"
                className="relative z-10"
              />
            )}
          </div>
        </div>

        {/* ── PAGE 2: Split Layout with Image Trail & Metallic Button ── */}
        <div className="h-screen w-screen overflow-y-auto relative bg-[#06070b] flex flex-col lg:flex-row items-center justify-center px-8 md:px-16 lg:px-24 py-16 gap-12 lg:gap-16">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-600/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
          
          {/* Page 2 Background Twisting Ribbon */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.25] mix-blend-screen">
            <TwistingRibbon
              segments={400}
              waveSpeed={0.018}
              waveAmplitude={1}
              twistCycles={6}
              className="w-full h-full rounded-none"
            />
          </div>
          
          {/* Left Column: Typography */}
          <motion.div 
            initial={{ y: 150, opacity: 0 }}
            animate={currentPage === 1 ? { y: 0, opacity: 1 } : { y: 150, opacity: 0 }}
            transition={{ type: "tween", duration: 3, ease: "easeOut", delay: 0.3 }}
            className="flex-1 flex flex-col justify-center text-left max-w-xl space-y-6 relative z-10"
          >
            <div className="space-y-2">
              <span 
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-rose-500 font-mono text-xs uppercase tracking-[0.45em] font-semibold block"
              >
                Lets Explore
              </span>
              <h1 
                style={{ fontFamily: "'Pinyon Script', cursive" }}
                className="text-8xl md:text-[9.5rem] tracking-normal leading-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(255,255,255,0.05)] py-2 font-normal"
              >
                Seoul
              </h1>
            </div>
            <p 
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              className="text-neutral-400 text-sm md:text-base leading-relaxed tracking-wide font-light max-w-lg"
            >
              Delve into the pulse of South Korea’s lifestyle. From the historic strokes of Hangul to the global wave of K-Pop, the emotional depth of K-Dramas, the sweetness of Boba, and the modern entertainment powerhouse HYBE. Hover over the showcase to reveal the trail.
            </p>
            {/* Liquid Metal Button */}
            <div className="pt-4">
              <LiquidMetalButton
                onClick={goToPage3}
                icon={<ArrowRight className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />}
                metalConfig={{
                  colorBack: "#3b82f6",
                  colorTint: "#93c5fd",
                }}
              >
                Discover
              </LiquidMetalButton>
            </div>
          </motion.div>

          {/* Right Column: Showcase with Image Trail */}
          <motion.div 
            initial={{ scale: 0.96, opacity: 0 }}
            animate={currentPage === 1 ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            className="flex-1 w-full max-w-xl flex flex-col items-center justify-center relative z-10"
          >
            <ImageTrail
              images={TRAIL_IMAGES}
              threshold={74}
              minDelay={45}
              duration={1100}
              maxItems={9}
              rotationRange={34}
              imageClassName="w-32 rounded-md md:w-40"
              className="w-full h-[500px] flex items-center justify-center bg-neutral-950/40 border border-neutral-900/60 rounded-3xl backdrop-blur-md shadow-2xl overflow-hidden cursor-crosshair group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none" />
              <h2 
                style={{ fontFamily: "'Pinyon Script', cursive" }}
                className="pointer-events-none text-6xl md:text-8xl tracking-normal bg-gradient-to-r from-violet-400 via-rose-400 to-amber-300 bg-clip-text text-transparent select-none py-2 font-normal"
              >
                Seoul Life
              </h2>
            </ImageTrail>
          </motion.div>
        </div>

        {/* ── PAGE 3: Scroll Zoom Reveal Section ── */}
        <div 
          ref={page3Ref}
          onScroll={handlePage3Scroll}
          className="h-screen w-screen overflow-y-auto relative bg-[#06070b] scroll-smooth"
        >
          <ScrollZoomReveal 
            containerRef={page3Ref}
            image={{ src: "/throne_room.jpg", alt: "Gyeongbokgung Palace Throne Room" }}
            leftText="@1392"
            rightText="Joseon"
            buttonText="Enter Palace"
            buttonLink="#palace"
            textColor="#ffffff"
            buttonTextColor="#ffffff"
            buttonBgColor="#3b82f6"
            className="w-full"
          />

          {/* Palace Exploration content (Buffer data) */}
          <div className="relative z-20 w-full min-h-screen bg-[#06070b] text-neutral-100 flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-24 gap-12 border-t border-neutral-900/60">
            <div className="max-w-4xl w-full space-y-8 text-left">
              <div className="space-y-3">
                <span className="text-rose-500 font-mono text-xs uppercase tracking-[0.4em] font-semibold block">Historical Records</span>
                <h2 
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="text-4xl md:text-6xl font-bold tracking-tight text-white"
                >
                  Gyeongbokgung Palace
                </h2>
              </div>
              
              <div 
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-400 text-sm md:text-base leading-relaxed font-light"
              >
                <p>
                  Gyeongbokgung Palace, built in 1392 by King Taejo, was the main royal palace of the Joseon Dynasty. Located in northern Seoul, it is the largest of the Five Grand Palaces built during the dynasty. Geonjeongjeon, the Throne Hall, is where the king held official audiences, received foreign envoys, and conducted state affairs.
                </p>
                <p>
                  The hall features majestic wooden columns, a double-tiered roof structure, and the iconic Eojwa throne. Above the throne sits a dragon painting carved on the ceiling representing the king's ultimate authority. Today, Gyeongbokgung is preserved as a national cultural monument, showcasing traditional architecture and heritage.
                </p>
              </div>

              {/* Decorative timeline cards (buffer data) */}
              <div 
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8"
              >
                <div className="p-6 rounded-2xl bg-neutral-950/40 border border-neutral-900 hover:border-violet-500/30 transition-all duration-300 space-y-3">
                  <span className="text-violet-400 font-mono text-xs">1395 — Founding</span>
                  <h3 className="text-lg font-bold text-white">Palace Construction</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">
                    Completed three years after the founding of the Joseon Dynasty, becoming the heart of the new capital, Hanyang.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-950/40 border border-neutral-900 hover:border-violet-500/30 transition-all duration-300 space-y-3">
                  <span className="text-violet-400 font-mono text-xs">1592 — Fire</span>
                  <h3 className="text-lg font-bold text-white">Imjin War Destruction</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">
                    The entire palace complex was burned down during the Japanese invasions and lay in ruins for over 270 years.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-950/40 border border-neutral-900 hover:border-violet-500/30 transition-all duration-300 space-y-3">
                  <span className="text-violet-400 font-mono text-xs">1867 — Rebirth</span>
                  <h3 className="text-lg font-bold text-white">Grand Reconstruction</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">
                    Rebuilt to its original grand scale under the leadership of Prince Regent Heungseon Daewongun.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Buttons (Placed at root level, positioned in top corners to avoid 3D Cylinder Carousel overlap) */}
      {currentPage === 0 && (
        <button 
          onClick={goToPage2}
          className="fixed right-6 top-6 z-50 bg-violet-600/10 border border-violet-500/30 hover:bg-violet-600/20 hover:scale-105 px-5 py-2.5 rounded-full text-violet-400 cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(109,40,217,0.15)] flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
        >
          <span>Explore</span>
          <ChevronRight className="w-4 h-4 text-violet-300" />
        </button>
      )}

      {currentPage === 1 && (
        <button 
          onClick={goToPage1}
          className="fixed left-6 top-6 z-50 bg-rose-600/10 border border-rose-500/30 hover:bg-rose-600/20 hover:scale-105 px-5 py-2.5 rounded-full text-rose-400 cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
        >
          <ChevronLeft className="w-4 h-4 text-rose-300" />
          <span>Back</span>
        </button>
      )}

      {currentPage === 2 && (
        <>
          <button 
            onClick={goToPage2FromPage3}
            className="fixed left-6 top-6 z-50 bg-rose-600/10 border border-rose-500/30 hover:bg-rose-600/20 hover:scale-105 px-5 py-2.5 rounded-full text-rose-400 cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
          >
            <ChevronLeft className="w-4 h-4 text-rose-300" />
            <span>Back</span>
          </button>

          {/* Conditional Scroll Helper when image is fully zoomed */}
          {page3Scrolled && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-400 animate-bounce pointer-events-none z-50 transition-opacity duration-300">
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-neutral-300">Scroll Down to Explore</span>
              <ChevronDown className="w-5 h-5 text-violet-400" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
