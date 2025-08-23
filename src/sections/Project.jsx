import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaProjectDiagram,
  FaExternalLinkAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

/**
 * Project.jsx
 *
 * - Auto-advancing slideshow (centered project details)
 * - Pause on hover/focus, keyboard support, manual controls
 * - Modal for full project details
 * - Stats after heading (animated when scrolled into view)
 * - Mobile: dedicated Ongoing Projects grid (2 columns)
 *
 * Tailwind classes follow the visual language from your Web.jsx (rounded cards, subtle rings, clipped gradient bg).
 */

/* ---------------------- Data (replace with your real data) ---------------------- */
const projects = [
  {
    title: "Smart Parking System",
    description:
      "Real-time parking availability detection using sensors, edge processing and a mobile dashboard.",
    image: "https://via.placeholder.com/1200x700?text=Smart+Parking+System",
    tags: ["AI", "Sensors", "Edge"],
    year: 2024,
    status: "completed",
  },
  {
    title: "IoT Fingerprint Door Access",
    description:
      "Secure door lock system using IoT, biometric authentication and MQTT-based remote management.",
    image: "https://via.placeholder.com/1200x700?text=IoT+Fingerprint+Door",
    tags: ["IoT", "Biometrics", "Embedded"],
    year: 2024,
    status: "completed",
  },
  {
    title: "Bluetooth Smartwatch",
    description:
      "Custom smartwatch with heart-rate monitoring, fitness tracking and seamless phone notifications.",
    image: "https://via.placeholder.com/1200x700?text=Bluetooth+Smartwatch",
    tags: ["Wearables", "Bluetooth", "Firmware"],
    year: 2023,
    status: "ongoing",
  },
  {
    title: "Smart Parking — Phase II",
    description:
      "Edge analytics pipeline and predictive availability models for city-wide rollout.",
    image: "https://via.placeholder.com/1200x700?text=Smart+Parking+Phase+2",
    tags: ["Edge", "ML", "Infrastructure"],
    year: 2025,
    status: "planned",
  },
];

const customersCount = 15;

/* ---------------------- Derived stats ---------------------- */
const derivedStats = {
  completed: projects.filter((p) => p.status === "completed").length,
  ongoing: projects.filter((p) => p.status === "ongoing").length,
  customers: customersCount,
  totalProjects: projects.length,
};

const statsConfig = [
  { id: "completed", name: "Projects Completed", value: derivedStats.completed, icon: FaCheckCircle, color: "from-green-400 to-green-600" },
  { id: "ongoing", name: "Ongoing Projects", value: derivedStats.ongoing, icon: FaClock, color: "from-yellow-400 to-yellow-600" },
  { id: "customers", name: "Happy Customers", value: derivedStats.customers, icon: FaUsers, color: "from-indigo-400 to-indigo-600" },
  { id: "total", name: "Total Projects", value: derivedStats.totalProjects, icon: FaProjectDiagram, color: "from-blue-400 to-blue-600" },
];

/* ---------------------- Utilities ---------------------- */
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* AnimatedNumber */
function AnimatedNumber({ value, duration = 900, start }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) {
      setDisplay(0);
      return;
    }
    const startTs = performance.now();
    let rafId;
    const step = (now) => {
      const t = Math.min(1, (now - startTs) / duration);
      const current = Math.round(t * value);
      setDisplay(current);
      if (t < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [start, value, duration]);

  return (
    <span>
      {display}
      {display >= 10 && value > 20 ? "+" : ""}
    </span>
  );
}

/* StatCard */
function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const Icon = stat.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.06 * index, duration: 0.45, ease: "easeOut" }}
      className="flex flex-col items-center bg-gray-800/60 rounded-2xl p-6 shadow-md ring-1 ring-white/6"
    >
      <div className={classNames("flex items-center justify-center rounded-full p-3 shadow-md", `bg-gradient-to-br ${stat.color}`)}>
        <Icon className="h-6 w-6 text-white" aria-hidden />
      </div>

      <div className="mt-3 text-2xl font-bold text-white">
        <AnimatedNumber value={stat.value} start={inView} duration={900} />
      </div>

      <div className="mt-1 text-sm text-gray-300">{stat.name}</div>
    </motion.div>
  );
}

/* ---------------------- Modal ---------------------- */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.18 }} className="relative max-w-3xl w-full rounded-2xl bg-gray-900/95 ring-1 ring-white/8 shadow-2xl overflow-hidden">
        <div className="flex justify-end p-4">
          <button onClick={onClose} aria-label="Close" className="rounded-md p-2 bg-white/5 hover:bg-white/8 text-white">
            <FaTimes />
          </button>
        </div>

        <div className="px-6 pb-8 pt-0 sm:px-8 sm:pb-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="overflow-hidden rounded-xl mb-6">
              <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
            </div>

            <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
            <p className="mt-3 text-gray-300">{project.description}</p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {project.tags?.map((t) => (
                <span key={t} className="text-xs bg-white/6 text-gray-200 px-3 py-1 rounded-md ring-1 ring-white/5">{t}</span>
              ))}
              <span className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-md">{project.year}</span>
              <span className="text-xs bg-white/6 text-gray-200 px-3 py-1 rounded-md">{project.status}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------------- Carousel (auto-advance) ---------------------- */
function Carousel({ slides, onOpen }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  const slideCount = slides.length;
  const intervalMs = 3800;

  // Advance
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, intervalMs);
    return () => clearInterval(id);
  }, [isPaused, slideCount]);

  // keyboard
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + slideCount) % slideCount);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slideCount);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slideCount]);

  const goPrev = () => setIndex((i) => (i - 1 + slideCount) % slideCount);
  const goNext = () => setIndex((i) => (i + 1) % slideCount);
  const goTo = (i) => setIndex(i);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-4xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-[420px] sm:h-[460px] md:h-[420px]">
        {slides.map((s, i) => {
          const offset = (i - index + slideCount) % slideCount;
          const isActive = i === index;
          // Use simple fade/slide animation with framer-motion
          return (
            <motion.article
              key={s.title + i}
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.98, y: 20 }}
              transition={{ duration: 0.5 }}
              className={classNames(
                "absolute inset-0 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/2.5 p-6 flex flex-col items-center text-center",
                !isActive ? "pointer-events-none" : "pointer-events-auto"
              )}
              aria-hidden={!isActive}
            >
              {/* left accent */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-90" />

              <div className="relative rounded-lg overflow-hidden mb-4 h-56 w-full cursor-pointer" onClick={() => onOpen(s)} onKeyDown={(e) => { if (e.key === "Enter") onOpen(s); }} tabIndex={0} role="button">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute left-1/2 -translate-x-1/2 bottom-3 inline-block rounded-full bg-indigo-500/90 px-3 py-1 text-xs font-medium text-white">
                  {s.year}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white">{s.title}</h3>
              <p className="mt-3 max-w-2xl text-sm text-gray-300">{s.description}</p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {s.tags?.map((t) => (
                  <span key={t} className="text-xs bg-black/20 text-gray-200 px-2 py-1 rounded-md ring-1 ring-white/5">{t}</span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button onClick={() => onOpen(s)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition">
                  View details <FaExternalLinkAlt className="h-3 w-3" />
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Controls */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <button aria-label="Previous slide" onClick={goPrev} className="rounded-full bg-black/50 p-2 text-white hover:bg-black/60">
          <FaChevronLeft />
        </button>
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <button aria-label="Next slide" onClick={goNext} className="rounded-full bg-black/50 p-2 text-white hover:bg-black/60">
          <FaChevronRight />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={classNames(
              "h-2 w-8 rounded-full transition-all",
              i === index ? "bg-indigo-500 w-8" : "bg-white/10"
            )}
          />
        ))}
      </div>

      {/* small caption / slide counter */}
      <div className="mt-3 text-center text-xs text-gray-400">
        Slide {index + 1} of {slideCount}
      </div>
    </div>
  );
}

/* ---------------------- Mobile Compact Card used in 2-col ongoing area ---------------------- */
function CompactCenteredCard({ project, idx }) {
  return (
    <motion.article initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.04 * idx, duration: 0.45 }} className="rounded-xl overflow-hidden bg-white/2.5 p-3 ring-1 ring-white/10 flex flex-col items-center text-center">
      <div className="w-full h-24 rounded-md overflow-hidden mb-3">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      </div>

      <h4 className="text-sm font-semibold text-white">{project.title}</h4>
      <p className="mt-1 text-xs text-gray-300">{project.tags?.join(" · ")}</p>
    </motion.article>
  );
}

/* ---------------------- Main Component ---------------------- */
export default function ProjectsSection() {
  const [selected, setSelected] = useState(null);
  const ongoing = projects.filter((p) => p.status === "ongoing");

  return (
    <section id="projects" className="relative isolate bg-gray-900 overflow-hidden py-24">
      {/* Top decorative background (exact block you requested) */}
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
        <motion.header initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mx-auto max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Our Projects</h2>
          <p className="mt-3 text-lg text-gray-300">Real-world builds, proof-of-concepts and deployments — curated recent work and impact metrics.</p>
        </motion.header>

        {/* Stats row */}
        <div className="mt-8 mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {statsConfig.map((s, i) => (
              <StatCard key={s.id} stat={s} index={i} />
            ))}
          </div>
        </div>

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
                              src="https://lottie.host/fe7c0d58-d139-4fa2-aadd-f1e39091d35e/U9qEBG0pmE.lottie"
                              loop
                              autoplay
                              style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                              aria-label="Decorative web development animation"
                            />
                          </div>
                        </motion.div>

        {/* Carousel (centered project details, auto-advance) */}
        <div className="mt-10">
          <Carousel slides={projects} onOpen={(p) => setSelected(p)} />
        </div>


        {/* CTA strip */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-indigo-800/60 to-black/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg ring-1 ring-white/6">
          <div>
            <h3 className="text-lg font-semibold text-white">Have a project in mind?</h3>
            <p className="mt-1 text-sm text-gray-300">We build end-to-end IoT, embedded and cloud-connected solutions — let’s discuss your requirements.</p>
          </div>
          <div className="flex gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition">Get in touch</a>
            <a href="#portfolio" className="inline-flex items-center gap-2 rounded-md bg-white/6 px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-white/10 transition">View portfolio</a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      {/* Local styles for subtle 8D motion (keeps parity with Web.jsx) */}
      <style jsx>{`
        @keyframes float8D {
          0% { transform: translate3d(0, 0, 0) rotateZ(0deg); }
          20% { transform: translate3d(-12px, 8px, 6px) rotateZ(-1deg); }
          40% { transform: translate3d(14px, -10px, -8px) rotateZ(1.2deg); }
          60% { transform: translate3d(-10px, 6px, 4px) rotateZ(-0.8deg); }
          80% { transform: translate3d(8px, -6px, -5px) rotateZ(0.6deg); }
          100% { transform: translate3d(0, 0, 0) rotateZ(0deg); }
        }
        .animate-8d { animation: float8D 9s ease-in-out infinite; transform-style: preserve-3d; will-change: transform; }
      `}</style>
    </section>
  );
}
