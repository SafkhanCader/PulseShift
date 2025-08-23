import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import PulseShiftLogo from "../assets/images/PulseShift.png";

/* --------- Config --------- */
const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services", mega: true },
  { label: "Tech", href: "#tech" },
  { label: "Pricing", href: "#pricing" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "NewsLetter", href: "#newsletter" },
];

const MEGA_LINKS = [
  { label: "Analytics", href: "#analytics" },
  { label: "Integrations", href: "#integrations" },
  { label: "API Access", href: "#api" },
  { label: "Enterprise", href: "#enterprise" },
];

/* --------- Navbar component (logo image instead of typing logo) --------- */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [megaOpen, setMegaOpen] = useState(false);

  // header scroll background
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // close menus on Escape
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMegaOpen(false);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // lock body scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const headerClass = scrolled
    ? "bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow"
    : "bg-transparent border-transparent";

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`fixed w-full z-50 top-0 left-0 ${headerClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4">
            {/* Left: Logo image (replace src with your logo path) */}
            <div className="flex items-center flex-1 min-w-0">
              <a href="#home" aria-label="Go to home" className="flex items-center">
                {/* Update the src to point to your logo file in /public or an external URL */}
                <img
                  src={PulseShiftLogo}
                  alt="PulseShift"
                  className="h-8 sm:h-10 md:h-12 object-contain"
                  loading="eager"
                />
              </a>
            </div>

            {/* Center: nav */}
            <nav className="hidden md:flex md:flex-1 md:justify-center md:items-center" aria-label="Primary navigation">
              <ul className="flex items-center gap-6">
                {NAV_LINKS.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <li key={link.label} className="relative">
                      <div
                        onMouseEnter={() => link.mega && setMegaOpen(true)}
                        onMouseLeave={() => link.mega && setMegaOpen(false)}
                      >
                        <a
                          href={link.href}
                          onClick={() => setActive(link.href.slice(1))}
                          className={`inline-flex items-center gap-2 px-1 py-1 rounded-md transition ${
                            isActive ? "text-slate-900 font-semibold" : scrolled ? "text-slate-700 hover:text-blue-600" : "text-white/90 hover:text-white"
                          } text-sm md:text-base`}
                          aria-haspopup={link.mega ? "menu" : undefined}
                          aria-expanded={link.mega ? megaOpen : undefined}
                        >
                          <span>{link.label}</span>
                          {link.mega && <ChevronDown size={14} strokeWidth={1.5} />}
                        </a>

                        {/* Mega dropdown */}
                        {link.mega && (
                          <AnimatePresence>
                            {megaOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.16 }}
                                className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 bg-white rounded-xl shadow-2xl ring-1 ring-black/6 z-50"
                                onMouseEnter={() => setMegaOpen(true)}
                                onMouseLeave={() => setMegaOpen(false)}
                                role="menu"
                                aria-label="Services menu"
                              >
                                <div className="p-4 grid gap-2">
                                  <h4 className="text-sm font-semibold text-slate-900">Our solutions</h4>
                                  <div className="grid gap-1">
                                    {MEGA_LINKS.map((m) => (
                                      <a
                                        key={m.label}
                                        href={m.href}
                                        role="menuitem"
                                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                                      >
                                        <div className="font-medium">{m.label}</div>
                                        <div className="text-xs text-slate-400 mt-0.5">Short description for {m.label.toLowerCase()}.</div>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right: CTAs & mobile toggle */}
            <div className="flex items-center gap-3 justify-end flex-1 md:flex-none ml-auto">
              <a
                href="#contact"
                className="hidden md:inline-flex items-center px-3 py-2 rounded-md border border-transparent bg-black text-white text-sm md:text-sm font-medium hover:bg-white/5 transition"
                aria-label="Contact"
              >
                Contact
              </a>

              <motion.a
                href="#get-started"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm md:text-sm font-semibold shadow-lg hover:brightness-105 transition"
                aria-label="Get Started"
              >
                Get Started
              </motion.a>

              <button
                onClick={() => setMobileOpen((s) => !s)}
                className="ml-2 md:hidden inline-flex items-center justify-center p-2 rounded-md bg-white/95 shadow-sm"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile backdrop + panel: rendered outside header so it overlays everything */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop (below panel but above content) */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-black z-50"
              aria-hidden="true"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel (on top of header) */}
            <motion.aside
              id="mobile-navigation"
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.26 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-60 shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-lg">Official</span>
                </div>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2 rounded-md">
                  <X size={18} />
                </button>
              </div>

              <nav className="px-4 py-6 space-y-2" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => {
                        setMobileOpen(false);
                        setActive(link.href.slice(1));
                      }}
                      className="block px-3 py-3 rounded text-base font-medium text-slate-800 hover:bg-slate-100"
                    >
                      {link.label}
                    </a>

                    {link.mega && (
                      <div className="pl-4">
                        {MEGA_LINKS.map((m) => (
                          <a
                            key={m.label}
                            href={m.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded"
                          >
                            {m.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="mt-6 px-3">
                  <a
                    href="#services"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold"
                  >
                    Get Started
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="mt-3 block w-full text-center px-4 py-2 rounded-md border border-slate-200 text-slate-800 font-semibold"
                  >
                    Contact
                  </a>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
