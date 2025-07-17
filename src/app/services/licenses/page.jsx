
// ./src/app/services/licenses/page.jsx
"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, FileText, Mail, Download } from "lucide-react";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-2xl font-bold text-gray-900">Something went wrong</p>
          <p className="mt-2 text-gray-600">Please try again later or contact support.</p>
          <Link
            href="/"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            aria-label="Back to home"
          >
            Back to Home
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}

// License Form Component
function LicenseForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    licenseType: "",
    businessName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic (e.g., API call)
    console.log("Form submitted:", formData);
    alert("License application submitted! (Placeholder)");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="bg-blue-950 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-3xl w-full mx-auto space-y-6"
    >
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-white">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Full name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Email address"
        />
      </div>
      <div>
        <label htmlFor="licenseType" className="block text-sm font-medium text-white">
          License Type
        </label>
        <select
          id="licenseType"
          name="licenseType"
          value={formData.licenseType}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          aria-label="License type"
        >
          <option value="">Select a license type</option>
          <option value="professional">Professional License</option>
          <option value="business">Business License</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-white">
          Business Name (Optional)
        </label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Business name"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
        aria-label="Submit license application"
      >
        Submit Application
      </button>
    </motion.form>
  );
}

export default function LicensesPage() {
  const pathname = usePathname();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              License Application
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Apply for a professional or business license quickly and securely through our online portal.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#license-form"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="Start application"
              >
                Start Application
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section id="license-form" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div>Loading form...</div>}>
              <LicenseForm />
            </Suspense>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-center"
            >
              <Link
                href="/forms/license-application.pdf"
                className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 transition"
                aria-label="Download license application form"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF Form</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Need Assistance?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto mb-6"
            >
              Contact our support team or explore our resources for help with your license application.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center space-x-4"
            >
              <Link
                href="/resources/contact"
                className="bg-white text-blue-900 px-6 py-3 rounded-md hover:bg-gray-200 transition font-semibold"
                aria-label="Contact support"
              >
                Contact Support
              </Link>
              <Link
                href="/resources/faq"
                className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="View FAQs"
              >
                View FAQs
              </Link>
              <Link
                href="/resources/forms"
                className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="View downloadable forms"
              >
                View Forms
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}
