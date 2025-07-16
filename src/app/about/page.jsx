
// ./src/app/about/page.jsx
"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Info, AlertCircle } from "lucide-react";

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
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
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

// About Content Component
function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-blue-950 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-4xl w-full"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">About the State Agency</h2>
      <div className="space-y-6 text-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Our Mission
          </h3>
          <p className="mt-2 text-sm">
            The State Agency is dedicated to serving the residents of our state by providing efficient, transparent, and accessible services. We strive to support economic growth, public safety, and community well-being through streamlined processes and innovative solutions.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Our Services
          </h3>
          <p className="mt-2 text-sm">
            We offer a wide range of services, including licensing, permitting, tax administration, and public health certifications. Our online portal allows residents to apply for services, access resources, and connect with our support team effortlessly.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Our History
          </h3>
          <p className="mt-2 text-sm">
            Established in 1980, the State Agency has been a cornerstone of public administration, evolving to meet the needs of a growing and diverse population. Our commitment to excellence drives us to continually improve our services and embrace modern technology.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
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
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Learn more about the State Agency, our mission, services, and commitment to serving our community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#about-content"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="Learn more about the agency"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about-content" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            <Suspense fallback={<div>Loading content...</div>}>
              <AboutContent />
            </Suspense>
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
              Get in Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto mb-6"
            >
              Have questions or need assistance? Contact our support team or explore our resources.
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
