
// ./src/app/portal/page.jsx
"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Building2, MapPin, FileText, Users, Clock } from "lucide-react";

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

// Portal Content Component
function PortalContent() {
  const pathname = usePathname();

  const services = [
    {
      title: "License Applications",
      href: "/resources/license-application",
      icon: Shield,
      description: "Apply for professional or business licenses quickly and securely.",
    },
    {
      title: "Permit Requests",
      href: "/resources/permit-application",
      icon: FileText,
      description: "Request permits for construction, events, or other activities.",
    },
    {
      title: "Tax Filing",
      href: "/resources/tax-filing",
      icon: Building2,
      description: "File your state taxes or access tax-related resources.",
    },
    {
      title: "Find an Office",
      href: "/contact/locations",
      icon: MapPin,
      description: "Locate state agency offices near you for in-person assistance.",
    },
    {
      title: "Resources & FAQs",
      href: "/resources/faq",
      icon: Users,
      description: "Explore FAQs and downloadable forms for quick answers.",
    },
    {
      title: "Online Services",
      href: "/services/online",
      icon: Clock,
      description: "Access a range of online services for efficient task management.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-blue-950 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-7xl w-full mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className={`p-6 bg-white rounded-md shadow-md hover:bg-blue-100 transition flex flex-col items-center text-center ${
              pathname === service.href ? "bg-blue-100 text-blue-900" : "text-gray-900"
            }`}
            aria-label={`Go to ${service.title}`}
          >
            <service.icon className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm">{service.description}</p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default function PortalPage() {
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
              State Agency Portal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Access state services, apply for licenses and permits, file taxes, and explore resources all in one place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#portal-content"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="Explore services"
              >
                Explore Services
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="portal-content" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div>Loading services...</div>}>
              <PortalContent />
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
              Contact our support team or explore our resources for help with your state services.
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
