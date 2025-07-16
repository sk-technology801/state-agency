"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, FileText, BookOpen, Phone, AlertCircle } from "lucide-react";

// Mock API for resource types (replace with real API call in production)
const fetchResources = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return [
    {
      id: 1,
      name: "Frequently Asked Questions",
      description: "Find answers to common questions about state services.",
      icon: HelpCircle,
      href: "/resources/faq",
    },
    {
      id: 2,
      name: "Guides and Tutorials",
      description: "Access guides for licenses, permits, taxes, and more.",
      icon: BookOpen,
      href: "/resources/guides",
    },
    {
      id: 3,
      name: "Downloadable Forms",
      description: "Download forms for various state services.",
      icon: FileText,
      href: "/resources/forms",
    },
    {
      id: 4,
      name: "Contact Information",
      description: "Get in touch with state agency support.",
      icon: Phone,
      href: "/contact",
    },
  ];
};

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
            href="/contact"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            aria-label="Contact support team"
          >
            Contact Support
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}

// Resources Grid Component
function ResourcesGrid() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources()
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: resource.id * 0.1 }}
        >
          <Link
            href={resource.href}
            className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
            aria-label={`Access ${resource.name}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative z-10">
              <resource.icon className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{resource.name}</h3>
              <p className="text-gray-600">{resource.description}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default function ResourcesPage() {
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
              Resources
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Access helpful resources, including FAQs, guides, forms, and contact information.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#resources"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="Explore resources"
              >
                Explore Resources
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section id="resources" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Available Resources</h2>
            <Suspense fallback={<div>Loading resources...</div>}>
              <ResourcesGrid />
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
              Need Assistance?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto mb-6"
            >
              Contact our support team for help with resources or explore our FAQ for quick answers.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center space-x-4"
            >
              <Link
                href="/contact"
                className="bg-white text-blue-900 px-6 py-3 rounded-md hover:bg-gray-200 transition font-semibold"
                aria-label="Contact support team"
              >
                Contact Support
              </Link>
              <Link
                href="/resources/faq"
                className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="View frequently asked questions"
              >
                View FAQ
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}