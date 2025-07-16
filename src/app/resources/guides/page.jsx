"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Search, AlertCircle, FileText } from "lucide-react";

// Mock API for guides (replace with real API call in production)
const fetchGuides = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return [
    {
      id: 1,
      title: "How to Apply for a State License",
      description: "Step-by-step guide to applying for various state licenses online.",
      category: "Licenses",
      href: "/resources/guides/license-application",
    },
    {
      id: 2,
      title: "Guide to Obtaining a State Permit",
      description: "Detailed instructions for securing state permits for businesses and projects.",
      category: "Permits",
      href: "/resources/guides/permit-application",
    },
    {
      id: 3,
      title: "Filing State Taxes Online",
      description: "Learn how to file your state taxes securely through our online portal.",
      category: "Taxes",
      href: "/resources/guides/tax-filing",
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

// Guides Grid Component
function GuidesGrid() {
  const [guides, setGuides] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuides()
      .then((data) => {
        setGuides(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(guides.map((guide) => guide.category))];
  const filteredGuides = category === "All"
    ? guides.filter(
        (guide) =>
          guide.title.toLowerCase().includes(search.toLowerCase()) ||
          guide.description.toLowerCase().includes(search.toLowerCase())
      )
    : guides.filter(
        (guide) =>
          guide.category === category &&
          (guide.title.toLowerCase().includes(search.toLowerCase()) ||
           guide.description.toLowerCase().includes(search.toLowerCase()))
      );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
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
    <div>
      <div className="mb-8 flex flex-col sm:flex-row items-center gap-4 max-w-4xl mx-auto">
        <div className="flex items-center w-full sm:w-auto">
          <Search className="w-6 h-6 text-gray-500 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guides..."
            className="w-full sm:w-64 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            aria-label="Search guides"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-48 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          aria-label="Filter guides by category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {filteredGuides.length === 0 ? (
        <p className="text-center text-gray-600">No guides found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: guide.id * 0.1 }}
            >
              <Link
                href={guide.href}
                className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
                aria-label={`Access ${guide.title}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative z-10">
                  <FileText className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{guide.title}</h3>
                  <p className="text-gray-600">{guide.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GuidesPage() {
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
              Guides and Tutorials
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Explore step-by-step guides to help you navigate state services with ease.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#guides"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="Explore guides"
              >
                Explore Guides
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section id="guides" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Available Guides</h2>
            <Suspense fallback={<div>Loading guides...</div>}>
              <GuidesGrid />
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
              Need More Help?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto mb-6"
            >
              Contact our support team or explore FAQs for additional assistance.
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