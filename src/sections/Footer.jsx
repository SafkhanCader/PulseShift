import React from "react";
import { motion } from "framer-motion";
import PulseShiftLogo from "../assets/images/PulseShift.png";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpCircle,
} from "lucide-react";

/**
 * Footer.jsx
 *
 * A polished, professional footer component:
 * - Responsive 4-column layout (About, Links, Resources, Contact + Newsletter)
 * - Accessible markup, aria-labels and keyboard-friendly controls
 * - Newsletter form (simple client-side placeholder submit)
 * - Social icons with accessible labels and safe external link attributes
 * - Small utility "back to top" button that smoothly scrolls to top
 * - Subtle entrance animation using framer-motion
 *
 * Replace text, links and contact info with your real data.
 */

export default function Footer() {
  const socials = [
    { name: "Facebook", icon: <Facebook size={18} />, link: "#" },
    { name: "Twitter", icon: <Twitter size={18} />, link: "#" },
    { name: "LinkedIn", icon: <Linkedin size={18} />, link: "#" },
  ];

  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.elements.email?.value;
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    // Replace with your submission integration
    alert(`Thanks — we'll send updates to ${email}`);
    e.target.reset();
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <motion.footer
      id="footer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-gray-900 text-white pt-12 pb-8"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        {/* Top area: 4-column grid on lg, stacked on small screens */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* About / Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div>
                {/* Simple initial / logo placeholder */}
                <img
                                  src={PulseShiftLogo}
                                  alt="PulseShift"
                                  className="h-8 sm:h-10 md:h-12 object-contain"
                                  loading="eager"
                                />
              </div>
              <div>
                <p className="text-lg font-semibold">PulseShift</p>
                <p className="mt-1 text-sm text-gray-400 max-w-xs">
                  Building secure, high-performance web and embedded solutions that scale.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${s.name} page`}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/6 hover:bg-white/10 transition focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                  <span className="text-gray-100">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="text-sm">
            <p className="text-sm font-semibold text-gray-200 mb-3">Links</p>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#web" className="hover:text-white transition">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#mobile" className="hover:text-white transition">
                  Mobile Apps
                </a>
              </li>
              <li>
                <a href="#cloud" className="hover:text-white transition">
                  Cloud & DevOps
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition">
                  Projects
                </a>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <div className="text-sm">
            <p className="text-sm font-semibold text-gray-200 mb-3">Resources</p>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#pricing" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition">
                  Blog & Guides
                </a>
              </li>
              <li>
                <a href="#docs" className="hover:text-white transition">
                  Docs / API
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <p className="text-sm font-semibold text-gray-200 mb-3">Contact</p>

            <address className="not-italic text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-300" />
                <span>London, United Kingdom</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Phone className="h-4 w-4 text-indigo-300" />
                <a href="tel:+1234567890" className="hover:text-white transition">
                  +44 7743593453
                </a>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-300" />
                <a href="mailto:hello@mycompany.com" className="hover:text-white transition">
                  info@pulseshift.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/6" />

        {/* Bottom bar: legal + sitemap */}
        <div className="mt-6 flex flex-col gap-4 items-center justify-between sm:flex-row">
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} PulseShift — Built with care. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#privacy" className="text-sm text-gray-300 hover:text-white transition">
              Privacy
            </a>
            <a href="#terms" className="text-sm text-gray-300 hover:text-white transition">
              Terms
            </a>
            <a href="#sitemap" className="text-sm text-gray-300 hover:text-white transition">
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* Back to top floating button */}
      <div className="fixed right-4 bottom-6 z-50 sm:right-6">
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex items-center gap-2 rounded-full bg-indigo-600 p-3 text-white shadow-lg hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
        >
          <ArrowUpCircle size={20} />
          <span className="sr-only">Back to top</span>
        </button>
      </div>
    </motion.footer>
  );
}
