
// ./src/components/Footer.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // Correct import for framer-motion
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const pathname = usePathname(); // Get current route for active link styling

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home", ariaLabel: "Home page" },
                { href: "/about", label: "About", ariaLabel: "About page" },
                { href: "/resources/faq", label: "FAQs", ariaLabel: "FAQ page" },
                { href: "/resources/forms", label: "Forms", ariaLabel: "Downloadable forms page" },
                { href: "/resources/contact", label: "Contact", ariaLabel: "Contact page" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-gray-300 hover:text-white transition ${
                      pathname === link.href ? "text-white font-semibold" : ""
                    }`}
                    aria-label={link.ariaLabel}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a
                  href="mailto:support@stateagency.gov"
                  className="text-gray-300 hover:text-white transition"
                  aria-label="Email support"
                >
                  support@stateagency.gov
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a
                  href="tel:+1-800-555-1234"
                  className="text-gray-300 hover:text-white transition"
                  aria-label="Call support"
                >
                  +923084931083
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
 <span className="text-gray-300">sk-plaza fsd</span>              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/stateagency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/stateagency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/stateagency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} State Agency. All rights reserved SK-TECHNOLOGY.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
