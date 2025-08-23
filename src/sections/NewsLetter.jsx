import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

/**
 * NewsLetter.jsx
 *
 * Layout:
 * - Top-level heading centered
 * - Two-column content beneath heading:
 *     - Left column: large Lottie animation
 *     - Right column: copy, form, and feature list
 *
 * All text is in English. Uses Tailwind utility classes consistent with your other components.
 */

export default function NewsLetter() {
  return (
    <section id="newsletter" className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mx-auto max-w-3xl"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Subscribe to our newsletter
          </h2>
          <p className="mt-3 text-lg text-gray-300">
            Get curated articles, product updates and practical tips delivered to your inbox every week.
            We keep things useful — no spam, ever.
          </p>
        </motion.header>

        {/* Two-column layout: left = Lottie, right = form + features */}
        <div className="mx-auto mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Lottie animation */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-4xl animate-8d">
              <DotLottieReact
                src="https://lottie.host/fb75c594-b239-481e-b051-e120278e0bb3/YYg6iBWp3y.lottie"
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
                aria-label="Decorative newsletter animation"
              />
            </div>
          </motion.div>

          {/* Right: copy, form and features */}
          <div className="max-w-xl lg:ml-8">
            <p className="text-base font-medium text-indigo-400">Stay informed</p>
            <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Join our community — short, practical emails.
            </h3>
            <p className="mt-4 text-gray-300">
              Each week we share in-depth guides, product updates, and hand-picked resources to help you ship better products.
            </p>

            {/* Email form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // placeholder: attach your submit handler here
                const form = e.currentTarget;
                const data = new FormData(form);
                const email = data.get("email");
                // Simple client-side feedback (replace with real submission)
                alert(`Thanks — we'll send updates to ${email}`);
                form.reset();
              }}
              className="mt-6 flex max-w-md gap-x-4"
            >
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 outline-offset-0 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </form>

            {/* Feature list */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <CalendarDaysIcon className="h-6 w-6 text-white" aria-hidden />
                </div>
                <div>
                  <dt className="text-base font-semibold text-white">Weekly articles</dt>
                  <dd className="mt-1 text-sm text-gray-400">
                    Short, practical posts focused on design, engineering and product decisions.
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <HandRaisedIcon className="h-6 w-6 text-white" aria-hidden />
                </div>
                <div>
                  <dt className="text-base font-semibold text-white">No spam</dt>
                  <dd className="mt-1 text-sm text-gray-400">
                    We send only useful content — unsubscribe anytime with one click.
                  </dd>
                </div>
              </div>
            </div>

            {/* Small note */}
            <p className="mt-6 text-xs text-gray-500">
              By subscribing you agree to receive occasional promotional emails. We respect your privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative clipped gradient behind — consistent visual identity */}
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/678 w-[288.75px] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>


      {/* Bottom decorative background (mirrors top) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[580px] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[1150px]"
        />
      </div>

      {/* Local 8D float animation helper (keeps parity with other components) */}
      <style jsx>{`
        @keyframes float8D {
          0% {
            transform: translate3d(0, 0, 0) rotateZ(0deg);
          }
          20% {
            transform: translate3d(-12px, 8px, 6px) rotateZ(-1deg);
          }
          40% {
            transform: translate3d(14px, -10px, -8px) rotateZ(1.2deg);
          }
          60% {
            transform: translate3d(-10px, 6px, 4px) rotateZ(-0.8deg);
          }
          80% {
            transform: translate3d(8px, -6px, -5px) rotateZ(0.6deg);
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
