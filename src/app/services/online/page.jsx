"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, FileText, Clock, Globe, AlertCircle } from "lucide-react";

// Mock API data (replace with real API call in production)
const fetchServices = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return [
    {
      id: 1,
      title: "Online License Application",
      description: "Apply for state licenses securely with real-time status tracking.",
      icon: Shield,
      href: "/services/licenses/apply",
    },
    {
      id: 2,
      title: "Document Submission Portal",
      description: "Upload, manage, and track documents for state services.",
      icon: FileText,
      href: "/services/documents",
    },
    {
      id: 3,
      title: "Appointment Scheduling",
      description: "Book in-person or virtual appointments with ease.",
      icon: Clock,
      href: "/services/appointments",
    },
    {
      id: 4,
      title: "E-Services Portal",
      description: "Access all digital state services in one platform.",
      icon: Globe,
      href: "/services/portal",
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
          <h2 className="text-2xl font-bold text-gray-900">
            Something went wrong
          </h2>
          <p className="mt-2 text-gray-600">
            Please try again later or contact support.
          </p>
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

// Services Grid Component
function ServicesGrid() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md animate-pulse"
          >
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
      {services.map((service) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: service.id * 0.1 }}
        >
          <Link
            href={service.href}
            className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
            aria-label={`View ${service.title}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative z-10">
              <service.icon className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

// Sidebar Component
function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:block sticky top-20 w-64 bg-blue-950 text-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-bold mb-4">Quick Navigation</h3>
      <ul className="space-y-2">
        {[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Contact", href: "/contact" },
          { name: "FAQ", href: "/resources/faq" },
        ].map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="block hover:text-blue-300 transition"
              aria-label={`Navigate to ${link.name}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}

export default function OnlineServicesPage() {
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
              Online State Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Discover seamless access to state services, from license applications
              to document management, all from the comfort of your home.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#services"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="Explore online services"
              >
                Explore Services
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
            <Sidebar />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-center mb-12">
                Available Online Services
              </h2>
              <Suspense fallback={<div>Loading services...</div>}>
                <ServicesGrid />
              </Suspense>
            </div>
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
              Need Help?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto mb-6"
            >
              Our support team is here to assist with any online service queries.
              Explore our FAQ or contact us directly.
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