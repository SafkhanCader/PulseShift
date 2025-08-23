import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";


export default function Services() {
  const services = [
    {
      title: "Web Development",
      desc: "Responsive, fast, and secure websites tailored to your needs.",
    },
    {
      title: "Mobile App Solutions",
      desc: "Cross-platform apps with beautiful UI and smooth performance.",
    },
    {
      title: "Cloud & DevOps",
      desc: "Scalable cloud solutions with modern DevOps practices.",
    },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section id="services" className="relative isolate bg-gray-900 overflow-hidden">
      {/* Top decorative background */}
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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Heading + intro */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mx-auto max-w-3xl"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">What We Do</h2>
          <p className="mt-3 text-lg text-gray-300">
            We combine design, engineering and business sense to build digital products that scale.
            Below is a short selection of the services we provide — tap into any to learn more.
          </p>
        </motion.div>

        {/* Lottie animation only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-10 flex justify-center"
        >
          <div className="w-full max-w-5xl animate-8d">
            <DotLottieReact
              src="https://lottie.host/f5abee11-6bfe-42c6-b59b-855d905bc4be/PKo27cNcAG.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
              aria-label="Hero decorative animation"
            />
          </div>
        </motion.div>

        {/* Services cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariant}
              className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10 bg-black/10 p-6"
            >
              {/* accent strip */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-90" />
              <div className="pl-4">
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-gray-300">{service.desc}</p>
                <Link
                  to={service.title === "Web Development" ? "/web" :
                      service.title === "Mobile App Solutions" ? "/mobile" :
                      "/cloud"}
                  className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Learn more →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Local styles for 8D motion */}
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
