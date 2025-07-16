"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, CheckCircle, AlertCircle, FileText } from "lucide-react";

// Mock API for education service types (replace with real API call in production)
const fetchEducationServices = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return [
    { id: 1, name: "Transcript Request", description: "Request official academic transcripts." },
    { id: 2, name: "Education Program Application", description: "Apply for state education programs or grants." },
    { id: 3, name: "Certification Verification", description: "Verify teaching or professional certifications." },
    { id: 4, name: "Student Aid Application", description: "Apply for state-sponsored student financial aid." },
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

// Education Service Selection Component
function EducationServiceSelection({ onSelect }) {
  const [educationServices, setEducationServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducationServices()
      .then((data) => {
        setEducationServices(data);
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
      {educationServices.map((service) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: service.id * 0.1 }}
        >
          <button
            onClick={() => onSelect(service)}
            className="block w-full bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all group relative overflow-hidden text-left"
            aria-label={`Select ${service.name}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative z-10">
              <Book className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
}

// Education Service Form Component
function EducationServiceForm({ selectedService, onSubmit }) {
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    studentId: "",
    details: "",
    file: null,
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.email || !formData.studentId) {
      setError("Applicant Name, Email, and Student ID are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Invalid email address.");
      return;
    }
    if (
      ["Transcript Request", "Certification Verification"].includes(selectedService.name) &&
      !formData.file
    ) {
      setError("A supporting document is required.");
      return;
    }
    if (formData.file && !["application/pdf", "image/jpeg", "image/png"].includes(formData.file.type)) {
      setError("Only PDF, JPEG, or PNG files are allowed.");
      return;
    }
    if (
      ["Education Program Application", "Student Aid Application"].includes(selectedService.name) &&
      !formData.details
    ) {
      setError("Application details are required.");
      return;
    }
    onSubmit(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900">Submission Successful</h3>
        <p className="mt-2 text-gray-600">
          Your {selectedService.name} request has been submitted successfully.
        </p>
        <Link
          href="/services"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          aria-label="Return to services"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Submit {selectedService.name}</h3>
      {error && (
        <p className="text-red-500 mb-4" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700">
            Applicant Name
          </label>
          <input
            type="text"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
            Student ID Number
          </label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            aria-required="true"
          />
        </div>
        {["Education Program Application", "Student Aid Application"].includes(selectedService.name) && (
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
              Application Details
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              aria-required="true"
            ></textarea>
          </div>
        )}
        {["Transcript Request", "Certification Verification"].includes(selectedService.name) && (
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Upload Supporting Document (PDF, JPEG, PNG)
            </label>
            <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleChange}
                      className="sr-only"
                      aria-required="true"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, JPEG, PNG up to 10MB</p>
              </div>
            </div>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
          aria-label={`Submit ${selectedService.name}`}
        >
          Submit {selectedService.name}
        </button>
      </form>
    </div>
  );
}

export default function EducationPage() {
  const [selectedService, setSelectedService] = useState(null);

  const handleSubmit = (formData) => {
    // Handle form submission (e.g., send to API)
    console.log("Education service submitted:", formData, selectedService);
  };

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
              Education Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Access state education services, including transcripts, certifications, and financial aid.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#education"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="Start education service"
              >
                Start Education Service
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section id="education" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              {selectedService ? `Submit ${selectedService.name}` : "Select an Education Service"}
            </h2>
            <Suspense fallback={<div>Loading education services...</div>}>
              {selectedService ? (
                <EducationServiceForm selectedService={selectedService} onSubmit={handleSubmit} />
              ) : (
                <EducationServiceSelection onSelect={setSelectedService} />
              )}
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
              Contact our support team for help with education services or explore our FAQ.
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