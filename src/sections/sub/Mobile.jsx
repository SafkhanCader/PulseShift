// src/sections/Mobile.jsx
import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";

/**
 * Mobile.jsx
 *
 * - Adds more service cards (expanded) for Mobile App Solutions.
 * - "Start a project" buttons scroll smoothly to the pricing area (#mobile-pricing).
 * - Keeps the consistent decorative background and 8D subtle animation class.
 * - Clean, professional layout and motion.
 */

/* ---------------- data ---------------- */
const services = [
  {
    id: "cross",
    title: "Cross-Platform",
    summary: "Shared codebases delivering native-like performance and polished UI.",
    features: [
      "Shared logic + native bridges",
      "Platform-adaptive UI",
      "Single codebase for iOS & Android",
    ],
  },
  {
    id: "perf",
    title: "Performance",
    summary: "Smooth animations, optimized bundles and fast startup times.",
    features: [
      "Bundle splitting & lazy loading",
      "Frame-rate optimisations",
      "Cold-start & resume tuning",
    ],
  },
  {
    id: "store",
    title: "App Store Strategy",
    summary: "Release planning, store assets and continuous improvement through analytics.",
    features: [
      "Store listing optimisation",
      "A/B creatives & experiments",
      "Release cadence & rollout strategies",
    ],
  },
  {
    id: "offline",
    title: "Offline & Sync",
    summary: "Reliable data sync with conflict resolution and graceful offline UX.",
    features: ["Background sync", "Delta sync & conflict policies", "Local-first UX"],
  },
  {
    id: "security",
    title: "Security & Privacy",
    summary: "Secure auth, encrypted storage and privacy-first design.",
    features: [
      "OAuth / SSO integrations",
      "Encrypted local storage",
      "GDPR & privacy considerations",
    ],
  },
  {
    id: "qa",
    title: "QA & Observability",
    summary: "Automated test suites and production observability for reliability.",
    features: ["E2E & unit testing", "Crash reporting & metrics", "Release monitoring"],
  },
];

/* ---------------- motion variants ---------------- */
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.06, duration: 0.6, ease: "easeOut" },
  }),
};

/* ---------------- pricing tiers ---------------- */
const tiers = [
  {
    name: "Alpha",
    id: "mobile-alpha",
    href: "#contact",
    price: "$299",
    description: "Starter mobile app — MVP-ready, fast launch.",
    features: [
      "Single platform or simple cross-platform",
      "Basic UI/UX",
      "App store submission assistance",
      "1 month support",
    ],
    featured: false,
  },
  {
    name: "Beta",
    id: "mobile-beta",
    href: "#contact",
    price: "$899",
    description: "Growth-focused app with analytics and push notifications.",
    features: [
      "Cross-platform (iOS & Android)",
      "Push notifications & analytics",
      "Performance tuning",
      "3 months support",
    ],
    featured: false,
  },
  {
    name: "Gamma",
    id: "mobile-gamma",
    href: "#contact",
    price: "$2,199",
    description: "Business-grade app with integrations and advanced UX.",
    features: [
      "Native modules & integrations",
      "Offline sync & complex flows",
      "Security & accessibility",
      "6 months SLA",
    ],
    featured: true,
  },
  {
    name: "Gamma Pro",
    id: "mobile-gamma-pro",
    href: "#contact",
    price: "$5,499",
    description: "Enterprise-grade solution — dedicated team, infra and SLAs.",
    features: [
      "Dedicated engineering team",
      "Custom infrastructure & scaling",
      "Priority support & roadmap",
      "On-prem / private deployments available",
    ],
    featured: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ---------------- Service card component (with Start button) ---------------- */
function ServiceCard({ card, i, onStart }) {
  return (
    <motion.article
      className="relative rounded-2xl overflow-hidden bg-black/10 p-6 shadow-xl ring-1 ring-white/10"
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      aria-labelledby={`card-${card.id}-title`}
    >
      <div className="pl-0">
        <h3 id={`card-${card.id}-title`} className="text-xl font-semibold text-white">
          {card.title}
        </h3>
        <p className="mt-2 text-gray-300">{card.summary}</p>

        {card.features && (
          <ul className="mt-4 list-disc list-inside text-sm text-gray-300">
            {card.features.map((f) => (
              <li key={f} className="mt-1">
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onStart && onStart(card.id)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition"
          >
            Start a project
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------- Pricing section ---------------- */
function PricingSection() {
  return (
    <section id="mobile-pricing" className="relative isolate bg-gray-900 px-6 py-20 sm:py-28 lg:px-8 mt-12">
      <div aria-hidden="true" className="absolute inset-x-0 -top-6 -z-10 transform-gpu overflow-hidden px-28 blur-3xl">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-1155/678 w-[680px] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-16"
        />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-indigo-400">Pricing — Mobile Apps</h2>
        <p className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Plans for startups, SMBs and enterprises
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
          Choose a plan that fits your mobile ambitions — all packages can be customised to suit your needs.
        </p>
      </div>

      <div className="mx-auto mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:max-w-6xl">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? "relative bg-gray-800" : "bg-white/2.5",
              "rounded-2xl p-6 ring-1 ring-white/10 flex flex-col"
            )}
          >
            <h3 id={tier.id} className="text-base font-semibold text-indigo-300">
              {tier.name}
            </h3>

            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-2xl font-semibold tracking-tight text-white">{tier.price}</span>
              <span className="text-sm text-gray-400">starting from</span>
            </p>

            <p className="mt-3 text-sm text-gray-300">{tier.description}</p>

            <ul role="list" className="mt-6 space-y-2 text-sm text-gray-300 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-2 items-start">
                  <CheckIcon className="h-5 w-5 text-indigo-400 flex-none" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={tier.href}
              className={classNames(
                tier.featured ? "bg-indigo-500 text-white hover:bg-indigo-400" : "bg-white/10 text-white hover:bg-white/20",
                "mt-6 inline-block rounded-md px-3.5 py-2 text-center text-sm font-semibold"
              )}
            >
              Get started
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Main Mobile component (scroll handler) ---------------- */
export default function Mobile() {
  const scrollToPricing = (sourceId) => {
    const el = document.getElementById("mobile-pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      try {
        history.replaceState(null, "", "#mobile-pricing");
      } catch {
        window.location.hash = "#mobile-pricing";
      }
      // Optionally highlight related tier or trigger analytics here
    }
  };

  return (
    <section id="mobile" className="relative isolate bg-gray-900 overflow-hidden min-h-screen py-20">
      {/* Top decorative background */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[580px] -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[1150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mx-auto max-w-3xl"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Mobile App Solutions</h1>
          <p className="mt-3 text-lg text-gray-300">
            Cross-platform mobile apps engineered for performance and delightful UX — shipped for iOS and Android.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link to="/" className="inline-block px-4 py-2 bg-white/10 text-white rounded-md text-sm font-medium hover:bg-white/20 transition">
              Back home
            </Link>
            <a href="#contact" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-500 transition">
              Contact us
            </a>
          </div>
        </motion.header>

        {/* Lottie animation */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.06 }}
          className="mt-10 flex justify-center"
        >
          <div className="w-full max-w-5xl animate-8d">
            <DotLottieReact
              src="https://lottie.host/cc643f54-00c1-44c2-8944-97ccbd0142d8/iPlUDOx2oR.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
              aria-label="Decorative mobile animation"
            />
          </div>
        </motion.div>

        {/* Services grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.id} card={s} i={i} onStart={scrollToPricing} />
          ))}
        </div>

        {/* Pricing Section */}
        <PricingSection />
      </div>

      {/* Bottom decorative background */}
      <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[580px] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[1150px]"
        />
      </div>

      {/* Local styles for subtle 8D motion */}
      <style jsx>{`
        @keyframes float8D {
          0% { transform: translate3d(0,0,0) rotateZ(0deg); }
          20% { transform: translate3d(-12px,8px,6px) rotateZ(-1deg); }
          40% { transform: translate3d(14px,-10px,-8px) rotateZ(1.2deg); }
          60% { transform: translate3d(-10px,6px,4px) rotateZ(-0.8deg); }
          80% { transform: translate3d(8px,-6px,-5px) rotateZ(0.6deg); }
          100% { transform: translate3d(0,0,0) rotateZ(0deg); }
        }
        .animate-8d {
          animation: float8D 9s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
