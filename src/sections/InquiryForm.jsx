// src/components/FormOnly.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * FormOnly
 * - Standalone contact/inquiry form
 * - Decorative blurred gradient background shapes
 * - Accessible, responsive, professional UI
 * - Uses Tailwind CSS and Framer Motion
 *
 * Usage:
 * import FormOnly from "./components/FormOnly";
 * <FormOnly />
 */

export default function FormOnly() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    country: "US",
    phone: "",
    message: "",
    agree: false,
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [charCount, setCharCount] = useState(0);

  const firstRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    firstRef.current?.focus();
  }, []);

  const validators = {
    firstName: (v) => (v.trim().length >= 2 ? "" : "Please enter your first name."),
    lastName: (v) => (v.trim().length >= 2 ? "" : "Please enter your last name."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email."),
    message: (v) => (v.trim().length >= 10 ? "" : "Message must be at least 10 characters."),
    phone: (v) =>
      v.trim() === "" || /^[0-9+\-\s()]{7,20}$/.test(v) ? "" : "Enter a valid phone number.",
    agree: (v) => (v ? "" : "Please agree to the policy."),
  };

  function validateField(name, value) {
    if (!validators[name]) return "";
    return validators[name](value);
  }

  function validateAll() {
    const newErr = {};
    Object.keys(validators).forEach((k) => {
      const err = validators[k](form[k]);
      if (err) newErr[k] = err;
    });
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  }

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((p) => ({ ...p, [name]: checked }));
      setErrors((p) => ({ ...p, [name]: validateField(name, checked) }));
    } else if (type === "file") {
      const f = files && files[0] ? files[0] : null;
      setForm((p) => ({ ...p, file: f }));
      setFileName(f ? f.name : "");
    } else {
      setForm((p) => ({ ...p, [name]: value }));
      if (name === "message") setCharCount(value.length);
      setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
    }
  }

  // Replace with your real API integration
  async function fakeSubmit(payload) {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, message: "We received your message. We'll respond soon." };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMessage("");
    if (!validateAll()) {
      // focus first invalid
      const firstInvalid = Object.keys(errors)[0];
      if (firstInvalid) {
        const el = document.querySelector(`[name="${firstInvalid}"]`);
        el?.focus();
      }
      return;
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([k, v]) => payload.append(k, v ?? ""));
      const res = await fakeSubmit(payload);
      if (res.ok) {
        setSuccessMessage(res.message);
        setForm({
          firstName: "",
          lastName: "",
          company: "",
          email: "",
          country: "US",
          phone: "",
          message: "",
          agree: false,
          file: null,
        });
        setFileName("");
        setCharCount(0);
        setErrors({});
        submitRef.current?.focus();
      } else {
        setErrors({ submit: res.message || "Submission failed." });
      }
    } catch (err) {
      setErrors({ submit: err.message || "Submission failed." });
    } finally {
      setSubmitting(false);
    }
  }

  // Small inline chevron used for select
  const Chevron = ({ className = "h-4 w-4 text-gray-400" }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const FileSvg = ({ className = "h-5 w-5 text-gray-500" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3v5a1 1 0 0 0 1 1h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <section id="inquiry" className="relative py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Decorative blurred background shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 transform-gpu blur-3xl">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="w-[40rem] h-[28rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 rotate-12"
          />
        </div>

        <div className="absolute -bottom-40 right-1/2 translate-x-1/2 transform-gpu blur-3xl">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="w-[48rem] h-[32rem] bg-gradient-to-tr from-[#87f1ff] to-[#7b61ff] opacity-20 -rotate-6"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Get in touch</h2>
            <p className="mt-2 text-gray-600">
              Tell us about your project, questions, or partnership inquiry. We typically reply within one business day.
            </p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-2xl p-8 sm:p-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                ref={firstRef}
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Jane"
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                className={`mt-2 block w-full rounded-lg px-4 py-3 text-gray-900 bg-white border ${
                  errors.firstName ? "border-red-400" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
              />
              {errors.firstName && <p id="firstName-error" className="mt-2 text-sm text-red-600">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                className={`mt-2 block w-full rounded-lg px-4 py-3 text-gray-900 bg-white border ${
                  errors.lastName ? "border-red-400" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
              />
              {errors.lastName && <p id="lastName-error" className="mt-2 text-sm text-red-600">{errors.lastName}</p>}
            </div>

            {/* Company (full width) */}
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="Your organization (optional)"
                className="mt-2 block w-full rounded-lg px-4 py-3 text-gray-900 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`mt-2 block w-full rounded-lg px-4 py-3 text-gray-900 bg-white border ${
                  errors.email ? "border-red-400" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
              />
              {errors.email && <p id="email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone (country + input) */}
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="mt-2 flex gap-3">
                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="appearance-none rounded-lg bg-white border border-gray-200 px-3 py-3 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="US">US</option>
                    <option value="CA">CA</option>
                    <option value="EU">EU</option>
                    <option value="IN">IN</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <Chevron />
                  </div>
                </div>

                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="123-456-7890"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`flex-1 block w-full rounded-lg px-4 py-3 text-gray-900 bg-white border ${
                    errors.phone ? "border-red-400" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                />
              </div>
              {errors.phone && <p id="phone-error" className="mt-2 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your goals, timeline, and budget (if any)."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`mt-2 block w-full rounded-lg px-4 py-3 text-gray-900 bg-white border ${
                  errors.message ? "border-red-400" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-y`}
              />
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <div>{errors.message ? <span className="text-red-600">{errors.message}</span> : "We usually respond within 1 business day."}</div>
                <div>{charCount}/1000</div>
              </div>
            </div>

            {/* File upload */}
            <div className="sm:col-span-2">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Attachment (optional)
              </label>
              <div className="mt-2 flex items-center gap-3">
                <label
                  htmlFor="file"
                  className="inline-flex items-center gap-3 rounded-lg border border-dashed border-gray-300 px-4 py-3 bg-white text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition"
                >
                  <FileSvg />
                  <span>Attach a file</span>
                  <input id="file" name="file" type="file" accept=".pdf,.png,.jpg,.docx" onChange={handleChange} className="hidden" />
                </label>
                <div className="text-sm text-gray-500">{fileName || "Max 10MB"}</div>
              </div>
            </div>

            {/* Agree checkbox */}
            <div className="sm:col-span-2 flex items-start gap-3">
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    checked={form.agree}
                    onChange={handleChange}
                    className="sr-only peer"
                    aria-describedby={errors.agree ? "agree-error" : undefined}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-checked:bg-indigo-600 rounded-full transition-colors relative">
                    <span className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${form.agree ? "translate-x-5" : "translate-x-1"}`} />
                  </div>
                </label>
              </div>
              <div className="text-sm text-gray-500">
                By selecting this, you agree to our{" "}
                <a href="#" className="text-indigo-600 font-medium">
                  privacy policy
                </a>.
                {errors.agree && <p id="agree-error" className="mt-2 text-sm text-red-600">{errors.agree}</p>}
              </div>
            </div>
          </div>

          {/* Submit & status */}
          <div className="mt-6">
            {errors.submit && <div className="mb-4 text-sm text-red-600">{errors.submit}</div>}

            <motion.button
              ref={submitRef}
              type="submit"
              disabled={submitting}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              className={`w-full inline-flex items-center justify-center gap-3 rounded-lg py-3 px-6 text-white font-semibold transition ${
                submitting ? "bg-indigo-400 cursor-wait" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              } shadow-xl`}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-80" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Let's talk"
              )}
            </motion.button>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: successMessage ? 1 : 0, height: successMessage ? "auto" : 0 }}
              transition={{ duration: 0.45 }}
              className="overflow-hidden mt-4"
            >
              {successMessage && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <span className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-green-100">
                        <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <path d="M4 10l3 3 9-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                    <div className="flex-1 text-sm text-green-800">
                      <strong className="block font-medium">Submission received</strong>
                      <span className="block mt-1">{successMessage}</span>
                    </div>
                    <button onClick={() => setSuccessMessage("")} className="text-green-700 hover:text-green-900">
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
