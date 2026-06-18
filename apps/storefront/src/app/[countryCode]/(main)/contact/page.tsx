import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | HaveHer",
  description:
    "Get in touch with the HaveHer customer care team on social or email.",
}

export default function ContactPage() {
  return (
    <div className="content-container mx-auto py-16 md:py-24 max-w-2xl px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
          Contact Us
        </h1>
        <div className="h-1 w-12 bg-berry-primary mx-auto mb-4"></div>
        <p className="text-sm text-gray-500">
          Have a question about sizing, delivery, or a custom order? Drop us a
          line below or reach out directly on social media.
        </p>
      </div>

      {/* SOCIAL MEDIA QUICK CHANNELS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* WHATSAPP CONTAINER */}
        <a
          href="https://wa.me/919876543210?text=Hi%20HaveHer!%20I%20have%20a%20query%20about%20a%20product."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-x-4 p-4 rounded-2xl border border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50/50 transition-all group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.411 0 11.973 0c3.178.001 6.165 1.239 8.413 3.488 2.247 2.248 3.483 5.236 3.484 8.414-.003 6.657-5.353 12.006-11.916 12.006-1.996-.001-3.96-.502-5.711-1.454L0 24zm6.59-4.846c1.66.986 3.288 1.499 4.93 1.503 5.405.001 9.805-4.393 9.808-9.799.001-2.62-1.02-5.086-2.871-6.939C16.608 2.066 14.145 1.041 11.98 1.041c-5.411 0-9.815 4.397-9.819 9.801-.001 1.77.475 3.499 1.38 5.044L2.527 21.1l5.22-.137-.1-.009zm11.234-7.147c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
            </svg>
          </div>
          <div className="text-left">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Chat on WhatsApp
            </h4>
            <p className="text-sm font-medium text-emerald-700 mt-0.5">
              Instant Support
            </p>
          </div>
        </a>

        {/* INSTAGRAM CONTAINER */}
        <a
          href="https://instagram.com/haveher"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-x-4 p-4 rounded-2xl border border-pink-100 bg-pink-50/20 hover:bg-pink-50/50 transition-all group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-violet-600 text-white shadow-md shadow-pink-500/10 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </div>
          <div className="text-left">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Follow Instagram
            </h4>
            <p className="text-sm font-medium text-pink-700 mt-0.5">@haveher</p>
          </div>
        </a>
      </div>

      {/* CORE CONTACT FORM */}
      <form className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            className="w-full font-sans text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-berry-primary transition-colors"
            placeholder="e.g., Priya Patel"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full font-sans text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-berry-primary transition-colors"
            placeholder="e.g., priya@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
            How can we help?
          </label>
          <textarea
            rows={4}
            required
            className="w-full font-sans text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-berry-primary transition-colors resize-none"
            placeholder="Write your message here..."
          />
        </div>

        <button
          type="submit"
          className="w-full martial-gradient py-4 rounded-full bg-berry-primary text-white font-bold tracking-wide hover:bg-berry-dark shadow-lg shadow-berry-primary/20 transition-all"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 text-center text-sm border-t border-gray-100 pt-8 text-gray-600">
        <div>
          <h4 className="font-semibold text-gray-900">Email Support</h4>
          <p className="mt-1 text-gray-500">support@haveher.in</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Response Window</h4>
          <p className="mt-1 text-gray-500">Within 24-48 business hours</p>
        </div>
      </div>
    </div>
  )
}
