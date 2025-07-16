
// ./src/app/resources/tax-filing/page.jsx
"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, AlertCircle, Download } from "lucide-react";

// Mock API for form submission (replace with real API call in production)
const submitForm = async (formData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return { success: true, message: "Tax filing application submitted successfully!" };
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

// Tax Filing Form Component
function TaxFilingForm() {
  const [formData, setFormData] = useState({
    taxpayerName: "",
    email: "",
    taxType: "",
    incomeDetails: "",
    document: null,
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      // Simulate form data submission (replace with actual API logic)
      const formDataToSend = new FormData();
      formDataToSend.append("taxpayerName", formData.taxpayerName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("taxType", formData.taxType);
      formDataToSend.append("incomeDetails", formData.incomeDetails);
      if (formData.document) {
        formDataToSend.append("document", formData.document);
      }
      const response = await submitForm(formDataToSend);
      setStatus(response.message);
      setFormData({
        taxpayerName: "",
        email: "",
        taxType: "",
        incomeDetails: "",
        document: null,
      });
    } catch (error) {
      setStatus("Error submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-blue-950 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-lg w-full"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Tax Filing Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="taxpayerName" className="block text-sm font-medium text-gray-200">
            Taxpayer Name
          </label>
          <input
            type="text"
            id="taxpayerName"
            name="taxpayerName"
            value={formData.taxpayerName}
            onChange={handleChange}
            required
            className="mt-1 w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Your email"
          />
        </div>
        <div>
          <label htmlFor="taxType" className="block text-sm font-medium text-gray-200">
            Tax Type
          </label>
          <select
            id="taxType"
            name="taxType"
            value={formData.taxType}
            onChange={handleChange}
            required
            className="mt-1 w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select tax type"
          >
            <option value="">Select a tax type</option>
            <option value="income">Income Tax</option>
            <option value="property">Property Tax</option>
            <option value="sales">Sales Tax</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="incomeDetails" className="block text-sm font-medium text-gray-200">
            Income Details
          </label>
          <textarea
            id="incomeDetails"
            name="incomeDetails"
            value={formData.incomeDetails}
            onChange={handleChange}
            required
            rows="5"
            className="mt-1 w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Income details"
          ></textarea>
        </div>
        <div>
          <label htmlFor="document" className="block text-sm font-medium text-gray-200">
            Supporting Document (PDF)
          </label>
          <input
            type="file"
            id="document"
            name="document"
            accept="application/pdf"
            onChange={handleChange}
            className="mt-1 w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Upload supporting document"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Submit tax filing application"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link
          href="/forms/tax-filing.pdf"
          download
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold"
          aria-label="Download tax filing application form"
        >
          <Download className="w-5 h-5 mr-2" />
          Download PDF Form
        </Link>
      </div>
      {status && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`mt-4 text-center ${status.includes("Error") ? "text-red-400" : "text-green-400"}`}
        >
          {status}
        </motion.p>
      )}
    </motion.div>
  );
}

export default function TaxFilingPage() {
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
              Tax Filing Application
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              File your state taxes online or download the form for offline submission.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#tax-form"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="Go to tax filing application form"
              >
                Start Application
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section id="tax-form" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            <Suspense fallback={<div>Loading form...</div>}>
              <TaxFilingForm />
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
                className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
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
