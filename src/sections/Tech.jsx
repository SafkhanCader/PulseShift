// Tech.jsx
import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * Tech.jsx
 *
 * Tech stack grid with Lottie animations per card.
 *
 * How to use:
 * - Replace each `animationSrc` value with either:
 *   1) A hosted URL (LottieFiles / lottie.host / your CDN) that returns a .lottie or .json file.
 *   2) A local path under your public folder (e.g. "/animations/react.lottie" or "/animations/node.json").
 *
 * Example local usage:
 * - Put file at public/animations/react.lottie
 * - Use animationSrc: "/animations/react.lottie"
 *
 * Accessibility:
 * - Each animation has an aria-label describing the technology.
 */

const techItems = [
  {
    id: "react",
    name: "React",
    subtitle: "Component-driven UI",
    animationSrc:
      // <-- Replace this placeholder with a real hosted URL or local path (e.g. "/animations/react.lottie")
      "https://lottie.host/353ed292-45a7-40e7-8700-761e9f146b2e/7hK2oGr1mD.lottie",
  },
  {
    id: "node",
    name: "Node.js",
    subtitle: "Scalable backends",
    animationSrc: "https://lottie.host/f0e93bee-22a9-45aa-b00a-bdd4bf48dc17/ZC1niEjsG8.lottie",
  },
  {
    id: "docker",
    name: "Docker",
    subtitle: "Containerization",
    animationSrc: "https://lottie.host/placeholder/docker-animation.lottie",
  },
  {
    id: "k8s",
    name: "Kubernetes",
    subtitle: "Orchestration & scaling",
    animationSrc: "https://lottie.host/placeholder/k8s-animation.lottie",
  },
  {
    id: "aws",
    name: "AWS",
    subtitle: "Cloud infrastructure",
    animationSrc: "https://lottie.host/placeholder/aws-animation.lottie",
  },
  {
    id: "graphql",
    name: "GraphQL",
    subtitle: "Flexible APIs",
    animationSrc: "https://lottie.host/placeholder/graphql-animation.lottie",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    subtitle: "Utility-first styles",
    animationSrc: "https://lottie.host/placeholder/tailwind-animation.lottie",
  },
  {
    id: "postgres",
    name: "Postgres",
    subtitle: "Reliable relational DB",
    animationSrc: "https://lottie.host/placeholder/postgres-animation.lottie",
  },
];

/* subtle card entrance animation */
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.06 + i * 0.04, duration: 0.5 } }),
};

export default function Tech() {
  return (
    <section id="tech" className="relative isolate bg-gray-900 overflow-hidden py-20">
      {/* Decorative top background — keep consistent with your theme */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[580px] -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[1150px]"
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Technology Stack</h2>
          <p className="mt-3 text-lg text-gray-300">
            Visual overview of the tools and platforms we use — each card has a short animation to help identify the tech at a glance.
          </p>
        </motion.header>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {techItems.map((tech, i) => (
            <motion.article
              key={tech.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="relative rounded-2xl overflow-hidden bg-white/3 p-4 shadow-lg ring-1 ring-white/8 flex flex-col items-center text-center"
              aria-labelledby={`tech-${tech.id}`}
            >
              {/* top Lottie area */}
              <div className="w-full h-36 sm:h-32 md:h-36 mb-3 rounded-lg overflow-hidden flex items-center justify-center">
                {/* DotLottieReact accepts .lottie/.json URLs or paths. Replace animationSrc values. */}
                <DotLottieReact
                  src={tech.animationSrc}
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  aria-label={`${tech.name} animation`}
                />
              </div>

              <h3 id={`tech-${tech.id}`} className="text-lg font-semibold text-white">
                {tech.name}
              </h3>
              <p className="mt-1 text-sm text-gray-300">{tech.subtitle}</p>

              <div className="mt-4 inline-flex items-center rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-medium text-indigo-300 ring-1 ring-white/6">
                Learn more
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition"
            aria-label="Contact us about technology"
          >
            Talk about your stack
          </a>
        </div>
      </div>

      {/* Local small 8D motion helper for subtle animation parity */}
      <style jsx>{`
        @keyframes float8D {
          0% { transform: translate3d(0,0,0) rotateZ(0deg); }
          20% { transform: translate3d(-8px,6px,4px) rotateZ(-1deg); }
          40% { transform: translate3d(10px,-8px,-6px) rotateZ(1.2deg); }
          60% { transform: translate3d(-6px,4px,2px) rotateZ(-0.8deg); }
          80% { transform: translate3d(6px,-4px,-3px) rotateZ(0.6deg); }
          100% { transform: translate3d(0,0,0) rotateZ(0deg); }
        }
        .animate-8d {
          animation: float8D 9s ease-in-out infinite;
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}
