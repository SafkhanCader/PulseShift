import React, { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * HeroTypewriterFast.jsx
 *
 * Robust fast typewriter for short taglines using refs to avoid stale closures.
 * - 10 short taglines
 * - Faster typing/deleting
 * - Thicker colored blinking caret
 * - Lottie animation on the right and decorative clipped gradients preserved
 */

export default function HeroTypewriterFast() {
  const phrases = [
    "Build",
    "Innovate",
    "Scale",
    "Design",
    "Optimize",
    "Automate",
    "Secure",
    "Integrate",
    "Analyze",
    "Deliver",
  ];

  // Faster speed settings
  const TYPING_SPEED = 35; // ms per char typing
  const DELETING_SPEED = 20; // ms per char deleting
  const PAUSE_AFTER_TYPED = 600; // pause after typed
  const PAUSE_AFTER_DELETED = 150; // pause after deleted

  const [displayed, setDisplayed] = useState("");
  const phraseIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const displayedRef = useRef("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    function clearTimer() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    const loop = () => {
      const currentPhrase = phrases[phraseIndexRef.current];

      if (!isDeletingRef.current) {
        // typing mode
        if (displayedRef.current.length < currentPhrase.length) {
          displayedRef.current = currentPhrase.slice(0, displayedRef.current.length + 1);
          setDisplayed(displayedRef.current);
          timeoutRef.current = setTimeout(loop, TYPING_SPEED);
        } else {
          // finished typing -> pause then switch to deleting
          timeoutRef.current = setTimeout(() => {
            isDeletingRef.current = true;
            loop();
          }, PAUSE_AFTER_TYPED);
        }
      } else {
        // deleting mode
        if (displayedRef.current.length > 0) {
          displayedRef.current = currentPhrase.slice(0, displayedRef.current.length - 1);
          setDisplayed(displayedRef.current);
          timeoutRef.current = setTimeout(loop, DELETING_SPEED);
        } else {
          // finished deleting -> advance phrase, switch to typing after short pause
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
          isDeletingRef.current = false;
          timeoutRef.current = setTimeout(loop, PAUSE_AFTER_DELETED);
        }
      }
    };

    // Start the loop
    clearTimer();
    timeoutRef.current = setTimeout(loop, 200); // slight initial delay

    return () => {
      clearTimer();
    };
    // only run once on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cleanup on unmount (just in case)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div id="hero" className="bg-gray-900">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Top decorative clipped gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[580px] -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[1150px]"
          />
        </div>

        {/* Hero split: left = typewriter, right = Lottie */}
        <div className="mx-auto max-w-7xl py-28 sm:py-40 lg:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: heading + typewriter */}
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl text-center lg:text-left">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center lg:justify-start">
                <div className="relative rounded-full px-3 py-1 text-sm text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                  Announcing our upcoming release.{" "}
                  <a href="#" className="font-semibold text-indigo-400">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              <h1
                className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl"
                aria-live="polite"
              >
                <span style={{ minHeight: "1.15em", display: "inline-block" }}>{displayed}</span>
                {/* Thicker colored caret */}
                <span
                  className="inline-block ml-2 blink-caret"
                  aria-hidden="true"
                  style={{ verticalAlign: "text-bottom" }}
                />
              </h1>

              <p className="mt-6 text-lg font-medium text-gray-400">
                Short, focused outcomes that help teams move faster and ship confidently.
              </p>

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-x-4">
                <a
                  href="#contact"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                  Get started
                </a>
                <a href="#projects" className="text-sm font-semibold text-white">
                  View projects <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            {/* Right: Lottie */}
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="w-full max-w-5xl animate-8d">
                <DotLottieReact
                  src="https://lottie.host/ebf706e5-b559-447d-b08c-23a9aabe7ba2/uAQTbQYHNA.lottie"
                  loop
                  autoplay
                  style={{
                    width: "100%",
                    height: "420px",
                    display: "block",
                  }}
                  aria-label="Decorative hero animation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles: 8D motion + thicker colored blinking caret */}
      <style jsx>{`
        @keyframes float8D {
          0% {
            transform: translate3d(0, 0, 0) rotateZ(0deg);
          }
          25% {
            transform: translate3d(-14px, 8px, 8px) rotateZ(-1.6deg);
          }
          50% {
            transform: translate3d(14px, -8px, -8px) rotateZ(1.6deg);
          }
          75% {
            transform: translate3d(-10px, 6px, 6px) rotateZ(-0.8deg);
          }
          100% {
            transform: translate3d(0, 0, 0) rotateZ(0deg);
          }
        }
        .animate-8d {
          animation: float8D 7s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* thicker caret */
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .blink-caret {
          display: inline-block;
          width: 14px; /* thicker */
          height: 1.15em;
          margin-left: 6px;
          border-radius: 3px;
          background: linear-gradient(180deg, #7c3aed 0%, #4f46e5 100%); /* indigo gradient */
          animation: blink 650ms steps(2, jump-start) infinite;
        }

        /* reduce layout shift during typing */
        h1 {
          min-height: 1.15em;
        }
      `}</style>
    </div>
  );
}
