"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, Search, AlertCircle } from "lucide-react";

// Mock API for FAQs (replace with real API call in production)
const fetchFAQs = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return [
    {
      id: 1,
      question: "How do I apply for a state license?",
      answer: "Visit the Licenses section under Services, select the appropriate license type, and complete the online application form. Ensure you have all required documents ready for upload.",
      category: "Licenses",
    },
    {
      id: 2,
      question: "What are the requirements for a state permit?",
      answer: "Permit requirements vary by type. Navigate to the Permits section under Services to view specific requirements and submit your application online.",
      category: "Permits",
    },
    {
      id: 3,
      question: "How can I schedule an appointment?",
      answer: "Go to the Appointments section under Services, choose the appointment type, and select an available date and time slot. You'll receive a confirmation email upon booking.",
      category: "Appointments",
    },
    {
      id: 4,
      question: "How do I file my state taxes online?",
      answer: "Access the Tax Services section, select 'Income Tax Filing,' and follow the prompts to submit your tax information securely.",
      category: "Taxes",
    },
    {
      id: 5,
      question: "How do I request a health certificate?",
      answer: "Visit the Health Services section, select 'Health Certificate Application,' and complete the form with your health ID and supporting documents.",
      category: "Health",
    },
    {
      id: 6,
      question: "How can I apply for student financial aid?",
      answer: "Navigate to the Education Services section, select 'Student Aid Application,' and provide the required details and documentation for your application.",
      category: "Education",
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

// FAQ Item Component
function FAQItem({ faq, isOpen, toggleOpen }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={toggleOpen}
        className="flex justify-between w-full py-4 px-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span className="text-lg font-medium text-gray-900">{faq.question}</span>
        <span className="text-blue-600">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <motion.div
          id={`faq-answer-${faq.id}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-4 text-gray-600"
        >
          {faq.answer}
        </motion.div>
      )}
    </div>
  );
}

// FAQ List Component
function FAQList() {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState("");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs()
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()) ||
      faq.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center max-w-2xl mx-auto">
        <Search className="w-6 h-6 text-gray-500 mr-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search FAQs..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          aria-label="Search FAQs"
        />
      </div>
      {filteredFAQs.length === 0 ? (
        <p className="text-center text-gray-600">No FAQs found matching your search.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-lg">
          {filteredFAQs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openFAQ === faq.id}
              toggleOpen={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
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
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Find answers to common questions about state services, applications, and more.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#faqs"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="View FAQs"
              >
                View FAQs
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section id="faqs" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
            <Suspense fallback={<div>Loading FAQs...</div>}>
              <FAQList />
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
              Still Have Questions?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto mb-6"
            >
              Contact our support team for further assistance or explore other resources.
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
                href="/resources"
                className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="Back to resources"
              >
                Back to Resources
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}