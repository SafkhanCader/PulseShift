// src/sections/Cloud.jsx
import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";

/**
 * Cloud.jsx
 * Professional Cloud & DevOps page
 * - Expanded service cards
 * - Pricing section
 * - "Start a project" buttons scroll smoothly to pricing (#cloud-pricing)
 * - Consistent background & 8D subtle animation
 */

const services = [
  {
    id: "scalability",
    title: "Scalability",
    summary: "Autoscaling, cost-aware architectures that grow with your traffic.",
    features: ["Autoscaling policies", "Horizontal & vertical scaling", "Edge/CDN integration"],
  },
  {
    id: "resilience",
    title: "Resilience & DR",
    summary: "Multi-zone deployments, health checks and robust failover strategies.",
    features: ["Multi-zone replication", "Automated failover", "Backup & restore playbooks"],
  },
  {
    id: "cicd",
    title: "CI / CD",
    summary: "Automated pipelines, safe rollouts and reproducible builds.",
    features: ["Pipeline as code (GitOps)", "Blue/green & canary deploys", "Artifact immutability"],
  },
  {
    id: "cost",
    title: "Cost Optimization",
    summary: "Right-sizing, reserved/spot strategy and cost-aware architectures.",
    features: ["Cost reporting & alerts", "Reserved vs spot planning", "Autoscaling cost rules"],
  },
  {
    id: "security",
    title: "Security & Compliance",
    summary: "IAM hardening, secrets management and basic compliance posture.",
    features: ["IAM least-privilege", "Secrets rotation", "Baseline compliance checks"],
  },
  {
    id: "observability",
    title: "Observability & SRE",
    summary: "Logging, metrics, traces and SRE practices for production reliability.",
    features: ["Centralized metrics & logging", "Distributed tracing", "SLOs & runbooks"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 + i * 0.06, duration: 0.6, ease: "easeOut" },
  }),
};

const tiers = [
  {
    name: "Alpha",
    id: "cloud-alpha",
    href: "#contact",
    price: "$499",
    description: "Foundations: infra setup, IaC, and basic monitoring.",
    features: [
      "Cloud account & IAM setup",
      "Basic Terraform stacks",
      "Logging & lightweight monitoring",
      "1 month post-launch support",
    ],
    featured: false,
  },
  {
    name: "Beta",
    id: "cloud-beta",
    href: "#contact",
    price: "$1,799",
    description: "Production-ready platform with autoscaling and CI/CD.",
    features: [
      "Autoscaling & cost policies",
      "CI/CD with safe deploys",
      "Centralized observability",
      "3 months runbook & support",
    ],
    featured: false,
  },
  {
    name: "Gamma",
    id: "cloud-gamma",
    href: "#contact",
    price: "$5,499",
    description: "Business grade: HA, DR planning, and integrations.",
    features: [
      "Multi-region deployments",
      "DR & backup automation",
      "Security audits & compliance basics",
      "6 months SLA & maintenance",
    ],
    featured: true,
  },
  {
    name: "Gamma Pro",
    id: "cloud-gamma-pro",
    href: "#contact",
    price: "$14,999",
    description: "Enterprise — dedicated architecture, private networking & SRE support.",
    features: [
      "Dedicated SRE team & on-call",
      "Private networking & VPC peering",
      "Advanced compliance & custom SLAs",
      "Roadmap & feature delivery support",
    ],
    featured: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ---------------- Service card ---------------- */
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

        {card.features && (
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            {card.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <CheckIcon className="h-4 w-4 text-indigo-400 flex-none mt-1" />
                <span>{f}</span>
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
    <section id="cloud-pricing" className="relative isolate bg-gray-900 px-6 py-20 sm:py-28 lg:px-8 mt-12">
      <div aria-hidden="true" className="absolute inset-x-0 -top-6 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-1155/678 w-[680px] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-16"
        />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-indigo-400">Pricing — Cloud & DevOps</h2>
        <p className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Operational reliability at every scale
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
          Choose a plan that fits your operational maturity — we can tailor any package.
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

/* ---------------- Main Cloud component ---------------- */
export default function Cloud() {
  const scrollToPricing = (sourceId) => {
    const el = document.getElementById("cloud-pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      try {
        history.replaceState(null, "", "#cloud-pricing");
      } catch {
        window.location.hash = "#cloud-pricing";
      }
    }
  };

  return (
    <section id="cloud" className="relative isolate bg-gray-900 overflow-hidden min-h-screen py-20">
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Cloud & DevOps</h1>
          <p className="mt-3 text-lg text-gray-300">
            Cloud-native, resilient and scalable systems with modern DevOps practices for continuous delivery.
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
          <div className="w-full max-w-4xl animate-8d">
            <DotLottieReact
              src="https://lottie.host/47b3fdd2-3f21-4404-ae39-8ec0a2667797/Fi06Fafy5X.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
              aria-label="Decorative cloud animation"
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
