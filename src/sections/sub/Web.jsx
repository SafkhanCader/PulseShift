// src/sections/Web.jsx
import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";

/**
 * Web.jsx
 *
 * Focus: when user clicks **Start a project** on any service card the page
 * smoothly scrolls to the pricing section below (id="pricing-list").
 *
 * Kept minimal / cleaned:
 * - ServiceCard receives onStart callback and calls scroll handler.
 * - Smooth scroll uses Element.scrollIntoView({ behavior: 'smooth' }).
 * - Unnecessary imports removed; rest of layout/visuals unchanged.
 */

/* ---------- data ---------- */
const cards = [
  {
    id: "ecommerce",
    title: "E-commerce Platforms",
    summary: "Performant, secure storefronts focused on conversion.",
    features: ["Headless checkout", "Inventory & order sync"],
    tech: ["Next.js", "Stripe"],
    engagement: "Built for growth-focused online stores.",
  },
  {
    id: "saas",
    title: "SaaS Products",
    summary: "From MVP to scale with billing and auth built-in.",
    features: ["Subscription & billing", "Role-based access"],
    tech: ["React", "Postgres"],
    engagement: "Perfect for product-led, B2B offerings.",
  },
  {
    id: "content",
    title: "Content & Editorial Sites",
    summary: "SEO-first publishing with editorial workflows.",
    features: ["Scheduling & drafts", "Image optimization"],
    tech: ["Headless CMS", "Static rendering"],
    engagement: "Great for magazines, docs and blogs.",
  },
  {
    id: "landing",
    title: "Landing Pages & Campaigns",
    summary: "High-converting pages built for speed and testing.",
    features: ["Fast Core Web Vitals", "A/B ready"],
    tech: ["Static hosting", "Analytics"],
    engagement: "Ideal for launches and funnels.",
  },
  {
    id: "headless",
    title: "Headless & Decoupled Sites",
    summary: "Flexible frontends powered by content APIs.",
    features: ["Composable architecture", "Omnichannel delivery"],
    tech: ["GraphQL APIs", "Edge caching"],
    engagement: "When content drives many experiences.",
  },
  {
    id: "pwa",
    title: "Progressive Web Apps (PWA)",
    summary: "Installable, offline-capable apps that feel native.",
    features: ["Service workers", "Push & background sync"],
    tech: ["Workbox", "IndexedDB"],
    engagement: "App-like UX without app stores.",
  },
];

const tiers = [
  {
    name: "Alpha",
    id: "tier-alpha",
    href: "#contact",
    priceMonthly: "$199",
    description: "Starter website for small businesses — fast launch and essential features.",
    features: [
      "Custom 5–7 page site",
      "Responsive design",
      "Basic SEO setup",
      "1 month support & minor updates",
    ],
    featured: false,
  },
  {
    name: "Beta",
    id: "tier-beta",
    href: "#contact",
    priceMonthly: "$499",
    description: "Growth package with CMS, analytics and conversion optimisations.",
    features: [
      "CMS integration (headless/hosted)",
      "Conversion tracking & analytics",
      "Performance optimisation",
      "3 months support",
    ],
    featured: false,
  },
  {
    name: "Gamma",
    id: "tier-gamma",
    href: "#contact",
    priceMonthly: "$1,299",
    description: "Business-ready platform with integrations and advanced UX.",
    features: [
      "E-commerce or subscription setup",
      "Custom integrations (CRM/Payments)",
      "Advanced SEO & accessibility",
      "6 months SLA & support",
    ],
    featured: true,
  },
  {
    name: "Gamma Pro",
    id: "tier-gamma-pro",
    href: "#contact",
    priceMonthly: "$3,499",
    description: "Enterprise-grade solution — dedicated infra, security and tailored SLAs.",
    features: [
      "Dedicated infrastructure & scaling",
      "SLA & onboarding support",
      "Custom automations & integrations",
      "Priority support & feature roadmap",
    ],
    featured: true,
  },
];

/* ---------- motion + variants ---------- */
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

/* ---------- Service card (receives onStart prop) ---------- */
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
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-90" />
      <div className="pl-4">
        <h3 id={`card-${card.id}-title`} className="text-xl font-semibold text-white">
          {card.title}
        </h3>
        <p className="mt-2 text-gray-300">{card.summary}</p>

        <dl className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-300">
          <div>
            <dt className="font-medium text-gray-200">Key features</dt>
            <dd className="mt-1">
              <ul className="list-disc list-inside mt-1">
                {card.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </dd>
          </div>

          <div className="mt-3">
            <dt className="font-medium text-gray-200">Tech highlights</dt>
            <dd className="mt-1 text-sm text-gray-300">{card.tech.join(" · ")}</dd>
          </div>

          <div className="mt-3">
            <dt className="font-medium text-gray-200">Engagement</dt>
            <dd className="mt-1 text-gray-300">{card.engagement}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-3">
          {/* Use a button that triggers smooth scroll to pricing */}
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

/* ---------- Pricing section component ---------- */
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function PricingSection() {
  return (
    <div id="pricing-list" className="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"
        />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Plans built for startups, scaleups and enterprises
        </p>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-400 sm:text-xl">
        Pick a plan that matches your stage — we can also tailor any package for bespoke requirements.
      </p>

      <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-6 sm:mt-16 lg:max-w-6xl lg:grid-cols-4">
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
              <span className="text-3xl font-semibold tracking-tight text-white">{tier.priceMonthly}</span>
              <span className="text-sm text-gray-400">one-time / from</span>
            </p>

            <p className="mt-4 text-sm text-gray-300">{tier.description}</p>

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
    </div>
  );
}

/* ---------- Main Web component (contains scroll handler) ---------- */
export default function Web() {
  // Scroll handler: scroll to pricing section and update hash (for back / sharing)
  const scrollToPricing = (sourceCardId) => {
    const el = document.getElementById("pricing-list");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // update hash without jumping (pushState keeps smooth scroll)
      try {
        history.replaceState(null, "", "#pricing-list");
      } catch (e) {
        // fail silently if history isn't available
        window.location.hash = "#pricing-list";
      }
      // Optionally: you can highlight the pricing card matching sourceCardId
      // by applying a temporary animation class via JS here.
    }
  };

  return (
    <section id="web" className="relative isolate bg-gray-900 overflow-hidden min-h-screen py-20">
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
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mx-auto max-w-3xl"
        >
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Web Development</h1>
          <p className="mt-3 text-lg text-gray-300">
            Modern websites focused on performance, accessibility and conversion.
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

        {/* Lottie animation (kept) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.06 }}
          className="mt-10 flex justify-center"
        >
          <div className="w-full max-w-5xl animate-8d">
            <DotLottieReact
              src="https://lottie.host/3b9b49e3-ac44-4148-a318-6f8b2ad18ee5/K5veFKOg6N.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
              aria-label="Decorative web development animation"
            />
          </div>
        </motion.div>

        {/* Services */}
        <div className="text-center mt-10">
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Discover Our Services</h2>
          <p className="mt-2 text-gray-300">We build secure, scalable, and fully responsive platforms.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <ServiceCard key={c.id} card={c} i={i} onStart={scrollToPricing} />
          ))}
        </div>

        {/* Pricing list section */}
        <div className="mt-16">
          <PricingSection />
        </div>
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

      {/* Local styles for 8D motion */}
      <style jsx>{`
        @keyframes float8D {
          0% { transform: translate3d(0, 0, 0) rotateZ(0deg); }
          20% { transform: translate3d(-12px, 8px, 6px) rotateZ(-1deg); }
          40% { transform: translate3d(14px, -10px, -8px) rotateZ(1.2deg); }
          60% { transform: translate3d(-10px, 6px, 4px) rotateZ(-0.8deg); }
          80% { transform: translate3d(8px, -6px, -5px) rotateZ(0.6deg); }
          100% { transform: translate3d(0, 0, 0) rotateZ(0deg); }
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
