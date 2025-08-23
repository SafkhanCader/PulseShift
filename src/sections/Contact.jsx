// src/sections/Contact.jsx
import React, { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaCheck,
  FaExternalLinkAlt,
} from "react-icons/fa";

/**
 * Contact.jsx
 * - Lottie animation removed (per request)
 * - Polished, professional contact section with form, socials as cards, and decorative left panel
 * - Client-side validation + simulated submit
 * - Motion used for subtle entrance animations
 *
 * Drop this file into your project (e.g. src/sections/Contact.jsx).
 * Ensure dependencies: framer-motion, react-icons, Tailwind CSS.
 */

const socials = [
  { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com", blurb: "Follow our updates" },
  { name: "Twitter", icon: FaTwitter, href: "https://twitter.com", blurb: "Real-time updates" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "https://linkedin.com", blurb: "Business & careers" },
  { name: "Instagram", icon: FaInstagram, href: "https://instagram.com", blurb: "Visual highlights" },
];

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

export default function Contact() {
  // form state
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const mountedRef = useRef(true);
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // basic validation
  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (!values.message.trim() || values.message.trim().length < 6) e.message = "Please write a short message";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Simulate network request
      await new Promise((r) => setTimeout(r, 900));
      if (!mountedRef.current) return;
      setSubmitted(true);
      // optionally reset form after brief moment
      setTimeout(() => {
        if (!mountedRef.current) return;
        setValues({ name: "", email: "", message: "" });
        setSubmitted(false);
      }, 2400);
    } finally {
      if (mountedRef.current) setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative isolate bg-gray-900 overflow-hidden py-24">
      {/* Decorative top background (matches other sections) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[580px] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[1150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.header {...fadeUp} className="text-center mx-auto max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Get in Touch</h2>
          <p className="mt-4 text-lg text-gray-300">
            Have a project in mind or want to collaborate? Fill out the form, ping us on socials or schedule a call.
          </p>
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
                      src="https://lottie.host/8e106bec-b59e-4318-9ee9-65f9fdf7d8d4/QDaJMYEpOl.lottie"
                      loop
                      autoplay
                      style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                      aria-label="Decorative web development animation"
                    />
                  </div>
                </motion.div>

        <div className="mt-16 lg:flex lg:items-start lg:gap-12">
          {/* Left decorative panel (replaces Lottie) */}
          <motion.div
            {...fadeUp}
            className="lg:w-1/2 flex flex-col items-stretch"
            style={{ minWidth: 320 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/8 bg-gradient-to-br from-indigo-700/60 to-purple-700/40 p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <FaCheck className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Let's build something great</h3>
                  <p className="mt-2 text-gray-200">
                    Tell us about your goals — we specialise in performance-first, accessible and scalable web
                    platforms. We'll respond within one business day.
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-4 text-sm text-white/90">
                <div className="flex items-start gap-3">
                  <div className="flex-none">
                    <div className="h-9 w-9 rounded-md bg-white/8 flex items-center justify-center">✓</div>
                  </div>
                  <div>
                    <dt className="font-medium">Fast proposal</dt>
                    <dd className="text-sm text-white/80 mt-1">Clear scope, timeline and estimate within 48 hours.</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-none">
                    <div className="h-9 w-9 rounded-md bg-white/8 flex items-center justify-center">🔒</div>
                  </div>
                  <div>
                    <dt className="font-medium">Privacy & security</dt>
                    <dd className="text-sm text-white/80 mt-1">NDAs and secure handling of your information.</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-none">
                    <div className="h-9 w-9 rounded-md bg-white/8 flex items-center justify-center">⚙️</div>
                  </div>
                  <div>
                    <dt className="font-medium">Technical audit</dt>
                    <dd className="text-sm text-white/80 mt-1">Optional audit to identify quick wins & long-term improvements.</dd>
                  </div>
                </div>
              </dl>

              <div className="mt-6 flex gap-3">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-md font-medium hover:bg-white/20 transition"
                >
                  View pricing
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/6 text-white rounded-md font-medium hover:bg-white/20 transition"
                >
                  Our services
                </a>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Prefer a direct call? Email us or request a meeting and we'll set up a time.
            </p>
          </motion.div>

          {/* Form + Social cards */}
          <motion.div {...fadeUp} className="mt-12 lg:mt-0 lg:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800/60 p-8 rounded-3xl shadow-2xl ring-1 ring-white/8 backdrop-blur-md"
              noValidate
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-xl px-4 py-3 bg-gray-900 text-white placeholder-gray-400 border ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    } focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                    placeholder="Your full name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <div className="mt-1 text-xs text-red-400">{errors.name}</div>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-xl px-4 py-3 bg-gray-900 text-white placeholder-gray-400 border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <div className="mt-1 text-xs text-red-400">{errors.email}</div>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-xl px-4 py-3 bg-gray-900 text-white placeholder-gray-400 border ${
                      errors.message ? "border-red-500" : "border-gray-700"
                    } focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                    placeholder="Tell us a little about the project or question..."
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <div className="mt-1 text-xs text-red-400">{errors.message}</div>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-500 transform hover:-translate-y-0.5 transition"
                  >
                    {submitting ? "Sending..." : submitted ? "Sent ✓" : "Send Message"}
                    {submitted && <FaCheck className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Social cards block */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-200 mb-3">Reach us on socials</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socials.map((s) => (
                    <motion.a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-start gap-4 rounded-xl bg-gradient-to-b from-white/3 to-white/2 p-4 hover:from-white/4 hover:to-white/3 transition-shadow shadow-sm"
                      whileHover={{ y: -4 }}
                    >
                      <div className="flex-shrink-0">
                        <div className="rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-3 shadow-md">
                          <s.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{s.name}</p>
                        <p className="mt-1 text-xs text-gray-300">{s.blurb}</p>
                      </div>

                      <div className="ml-auto mt-1 text-white/60 group-hover:text-white">
                        <FaExternalLinkAlt className="h-3 w-3" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Local styles for subtle float used on decorative containers */}
      <style jsx>{`
        @keyframes float8D {
          0% {
            transform: translate3d(0, 0, 0) rotateZ(0deg);
          }
          20% {
            transform: translate3d(-8px, 6px, 4px) rotateZ(-0.8deg);
          }
          40% {
            transform: translate3d(10px, -8px, -6px) rotateZ(1deg);
          }
          60% {
            transform: translate3d(-6px, 4px, 3px) rotateZ(-0.6deg);
          }
          80% {
            transform: translate3d(6px, -4px, -3px) rotateZ(0.5deg);
          }
          100% {
            transform: translate3d(0, 0, 0) rotateZ(0deg);
          }
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
