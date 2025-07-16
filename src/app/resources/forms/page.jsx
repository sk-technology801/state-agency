
"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, AlertCircle, Download } from "lucide-react";

// Mock data for downloadable forms (replace with real data or API call in production)
const forms = [
  {
    id: 1,
    title: "State License Application Form",
    category: "Licenses",
    description: "Apply for a state license for professional or business purposes.",
    fileUrl: "/forms/license-application.pdf",
  },
  {
    id: 2,
    title: "State Permit Request Form",
    category: "Permits",
    description: "Request a permit for construction, events, or other regulated activities.",
    fileUrl: "/forms/permit-request.pdf",
  },
  {
    id: 3,
    title: "Income Tax Filing Form",
    category: "Taxes",
    description: "File your state income taxes with this form.",
    fileUrl: "/forms/tax-filing.pdf",
  },
  {
    id: 4,
    title: "Health Certificate Application",
    category: "Health",
    description: "Apply for a health certificate for employment or travel.",
    fileUrl: "/forms/health-certificate.pdf",
  },
  {
    id: 5,
    title: "Student Financial Aid Application",
    category: "Education",
    description: "Apply for state-funded financial aid for education.",
    fileUrl: "/forms/student-aid.pdf",
  },
];

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

// Form Item Component
function FormItem({ form }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4 hover:bg-gray-50 transition"
    >
      <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{form.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{form.description}</p>
        <p className="text-sm text-gray-500 mt-1">Category: {form.category}</p>
        <Link
          href={form.fileUrl}
          download
          className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold"
          aria-label={`Download ${form.title}`}
        >
          <Download className="w-5 h-5 mr-2" />
          Download Form
        </Link>
      </div>
    </motion.div>
  );
}

// Forms List Component
function FormsList() {
  return (
    <div className="space-y-4">
      {forms.map((form) => (
        <FormItem key={form.id} form={form} />
      ))}
    </div>
  );
}

export default function FormsPage() {
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
              Downloadable Forms
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Access and download forms for various state services, including licenses, permits, taxes, and more.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#forms"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="View forms"
              >
                View Forms
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Forms Section */}
        <section id="forms" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Available Forms</h2>
            <Suspense fallback={<div>Loading forms...</div>}>
              <FormsList />
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
              Contact our support team or explore our FAQs for additional help.
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
                className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-7001980 transition font-semibold"
                aria-label="View FAQs"
              >
                View FAQs
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}
