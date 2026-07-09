"use client";

import React, { useRef, useEffect, useState, startTransition } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollZoomRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  image?: {
    src: string;
    alt?: string;
  };
  leftText?: string;
  rightText?: string;
  buttonText?: string;
  buttonLink?: string;
  textColor?: string;
  buttonTextColor?: string;
  buttonBgColor?: string;
  animationStiffness?: number;
  animationDamping?: number;
  animationMass?: number;
  iconType?: "play" | "arrow" | "custom" | "none";
  customIconSvg?: string;
}

export function ScrollZoomReveal({
  containerRef,
  image = { src: "/throne_room.jpg", alt: "Throne Room" },
  leftText = "Golden Era",
  rightText = "The Jonsen Era",
  buttonText = "Play showreel",
  buttonLink = "#",
  textColor = "#ffffff",
  buttonTextColor = "#ffffff",
  buttonBgColor = "#3b82f6",
  animationStiffness = 90,
  animationDamping = 25,
  animationMass = 0.6,
  iconType = "play",
  customIconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  className,
  ...props
}: ScrollZoomRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Responsive Breakpoint Detection
  const [screen, setScreen] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 810) {
        startTransition(() => setScreen("mobile"));
      } else if (window.innerWidth <= 1799) {
        startTransition(() => setScreen("tablet"));
      } else {
        startTransition(() => setScreen("desktop"));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsive = {
    desktop: {
      leftFont: "55px",
      rightFont: "55px",
      textWidth: "350px",
      centerFont: "56px",
      playSize: "60px",
      gap: "30px",
      startWidth: "32vw",
      startHeight: "20vh",
    },
    tablet: {
      leftFont: "40px",
      rightFont: "40px",
      textWidth: "220px",
      centerFont: "42px",
      playSize: "52px",
      gap: "24px",
      startWidth: "35vw",
      startHeight: "22vh",
    },
    mobile: {
      leftFont: "22px",
      rightFont: "22px",
      textWidth: "120px",
      centerFont: "26px",
      playSize: "42px",
      gap: "15px",
      startWidth: "45vw",
      startHeight: "25vh",
    },
  };

  const current = responsive[screen];
  const imageSrc = image?.src || "/throne_room.jpg";

  // Scroll Animation
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const rawWidth = useTransform(scrollYProgress, [0, 0.75], [current.startWidth, "100vw"]);
  const rawHeight = useTransform(scrollYProgress, [0, 0.75], [current.startHeight, "100vh"]);
  const rawRadius = useTransform(scrollYProgress, [0, 0.75], [50, 0]);

  const width = useSpring(rawWidth, {
    stiffness: animationStiffness,
    damping: animationDamping,
    mass: animationMass,
  });
  const height = useSpring(rawHeight, {
    stiffness: animationStiffness,
    damping: animationDamping,
    mass: animationMass,
  });
  const borderRadius = useSpring(rawRadius, {
    stiffness: animationStiffness,
    damping: animationDamping,
  });

  // Text Animation
  const centerTextOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const centerTextY = useTransform(scrollYProgress, [0.35, 0.55], [60, 0]);

  // Icon rendering function
  const renderIcon = () => {
    if (iconType === "none") return null;
    const iconSize = screen === "mobile" ? 14 : 20;

    if (iconType === "play") {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: buttonBgColor,
            width: current.playSize,
            height: current.playSize,
            borderRadius: "50%",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              left: "2px",
              borderStyle: "solid",
              borderWidth: screen === "mobile" ? "7px 0px 7px 14px" : "10px 0px 10px 20px",
              borderColor: `transparent transparent transparent ${buttonTextColor}`,
            }}
          />
        </div>
      );
    }

    if (iconType === "arrow") {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: buttonBgColor,
            width: current.playSize,
            height: current.playSize,
            borderRadius: "50%",
            flexShrink: 0,
          }}
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke={buttonTextColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    }

    if (iconType === "custom" && customIconSvg) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: buttonBgColor,
            width: current.playSize,
            height: current.playSize,
            borderRadius: "50%",
            flexShrink: 0,
          }}
          dangerouslySetInnerHTML={{ __html: customIconSvg }}
        />
      );
    }

    return null;
  };

  return (
    <section
      ref={ref}
      className={cn("relative w-full h-[400vh] bg-[#06070b]", className)}
      {...props}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: current.gap,
          padding: "0 20px",
          overflow: "hidden",
        }}
      >
        {/* Left Typography */}
        <div
          style={{
            whiteSpace: "nowrap",
            width: "auto",
            minWidth: "max-content",
            textAlign: "right",
            fontWeight: 500,
            color: textColor,
            fontSize: current.leftFont,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {leftText}
        </div>

        {/* Zooming Image Container */}
        <motion.div
          style={{
            width,
            height,
            borderRadius,
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
            transform: "translateZ(0)",
            willChange: "width, height",
          }}
        >
          <img
            src={imageSrc}
            alt={image?.alt || "Throne Room background"}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              transform: "translate(-50%, -50%) translateZ(0)",
              willChange: "transform",
              imageRendering: "auto",
              backfaceVisibility: "hidden",
            }}
          />

          {/* Centered Action Button */}
          <motion.a
            href={buttonLink}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
              opacity: centerTextOpacity,
              y: centerTextY,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              color: buttonTextColor,
              textAlign: "center",
              textDecoration: "none",
              whiteSpace: "nowrap",
              fontSize: current.centerFont,
            }}
          >
            <span>{buttonText}</span>
            {renderIcon()}
          </motion.a>
        </motion.div>

        {/* Right Typography */}
        <div
          style={{
            whiteSpace: "nowrap",
            width: "auto",
            minWidth: "max-content",
            textAlign: "left",
            fontWeight: 500,
            color: textColor,
            fontSize: current.rightFont,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {rightText}
        </div>
      </div>
    </section>
  );
}

export default ScrollZoomReveal;
