"use client"

import React, { useState, useEffect, useRef } from "react"
import { clx } from "@modules/common/components/ui"

export default function AnnouncementMarquee() {
  const [isPaused, setIsPaused] = useState(false)
  const marqueeRef = useRef<HTMLDivElement>(null)

  const marqueeText =
    "✦ SEASON 1 DROPS ARE NOW LIVE — PREMIUM ETHNIC & CONTEMPORARY WEAR FOR THE MODERN WOMAN ✦ ENJOY FREE SHIPPING ON ALL ORDERS NATIONWIDE ✦ SECURE CHECKOUT VIA RAZORPAY ✦ "

  // 👑 GLOBAL CLICK CAPTURING ENGINE (Click Anywhere Else to Play)
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (
        marqueeRef.current &&
        marqueeRef.current.contains(event.target as Node)
      ) {
        // Marquee par click hua toh permanent pause
        setIsPaused(true)
      } else {
        // Screen par kahin aur click hua toh play
        setIsPaused(false)
      }
    }

    window.addEventListener("click", handleGlobalClick)
    return () => {
      window.removeEventListener("click", handleGlobalClick)
    }
  }, [])

  return (
    <div
      ref={marqueeRef}
      className="w-full bg-[#3A1A2A] text-[#FDF1F6] h-8 flex items-center overflow-hidden border-b border-pink-950/20 select-none relative z-50 font-sans cursor-pointer"
    >
      {/* 👑 HYBRID RAIL: Combines CSS Hover and JS Click states flawlessly */}
      <div
        className={clx(
          "marquee-rail flex whitespace-nowrap items-center text-[10px] font-bold uppercase tracking-[0.2em]",
          { "marquee-paused": isPaused }
        )}
      >
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
      </div>

      {/* Injecting CSS Keyframes safely inline */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-rail {
          animation: marquee 25s linear infinite;
        }

        /* 👑 DESKTOP HOVER: Mouse enter par pause, leave par automatically continue */
        .marquee-rail:hover {
          animation-play-state: paused;
        }

        /* 👑 CLICK OVERRIDE: Global event logic gets absolute priority via !important */
        .marquee-paused,
        .marquee-paused:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  )
}
