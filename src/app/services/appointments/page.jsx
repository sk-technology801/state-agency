"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";

// Mock API for appointment types (replace with real API call in production)
const fetchAppointmentTypes = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return [
    { id: 1, name: "License Application", description: "Schedule an in-person or virtual license appointment." },
    { id: 2, name: "Permit Consultation", description: "Book a consultation for permit applications." },
    { id: 3, name: "Document Review", description: "Schedule a review of submitted documents." },
    { id: 4, name: "General Inquiry", description: "Meet with a state representative for inquiries." },
  ];
};

// Mock API for available time slots (replace with real API call in production)
const fetchAvailableTimeSlots = async (appointmentType, date) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
  return [
    { id: 1, time: "09:00 AM" },
    { id: 2, time: "10:30 AM" },
    { id: 3, time: "01:00 PM" },
    { id: 4, time: "03:30 PM" },
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

// Appointment Selection Component
function AppointmentSelection({ onSelect }) {
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointmentTypes()
      .then((data) => {
        setAppointmentTypes(data);
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
      {appointmentTypes.map((appointment) => (
        <motion.div
          key={appointment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: appointment.id * 0.1 }}
        >
          <button
            onClick={() => onSelect(appointment)}
            className="block w-full bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all group relative overflow-hidden text-left"
            aria-label={`Select ${appointment.name}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative z-10">
              <Clock className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{appointment.name}</h3>
              <p className="text-gray-600">{appointment.description}</p>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
}

// Appointment Scheduling Form Component
function AppointmentForm({ selectedAppointment, onSubmit }) {
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    date: "",
    time: "",
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (formData.date) {
      setLoadingSlots(true);
      fetchAvailableTimeSlots(selectedAppointment.name, formData.date)
        .then((slots) => {
          setTimeSlots(slots);
          setFormData((prev) => ({ ...prev, time: "" }));
          setLoadingSlots(false);
        })
        .catch(() => {
          setError("Failed to load time slots.");
          setLoadingSlots(false);
        });
    }
  }, [formData.date, selectedAppointment.name]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.email || !formData.date || !formData.time) {
      setError("All fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Invalid email address.");
      return;
    }
    onSubmit(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900">Appointment Scheduled</h3>
        <p className="mt-2 text-gray-600">
          Your {selectedAppointment.name} appointment has been scheduled successfully.
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
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Schedule {selectedAppointment.name}</h3>
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
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Select Time
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            disabled={!formData.date || loadingSlots}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            aria-required="true"
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot.id} value={slot.time}>
                {slot.time}
              </option>
            ))}
          </select>
          {loadingSlots && <p className="mt-2 text-sm text-gray-600">Loading time slots...</p>}
        </div>
        <button
          type="submit"
          disabled={loadingSlots}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
          aria-label={`Schedule ${selectedAppointment.name}`}
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  );
}

export default function AppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleSubmit = (formData) => {
    // Handle form submission (e.g., send to API)
    console.log("Appointment scheduled:", formData, selectedAppointment);
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
              Appointment Scheduling
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Book in-person or virtual appointments with ease for state services.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#schedule"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="Start scheduling appointment"
              >
                Start Scheduling
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section id="schedule" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              {selectedAppointment ? `Schedule ${selectedAppointment.name}` : "Select an Appointment Type"}
            </h2>
            <Suspense fallback={<div>Loading appointment types...</div>}>
              {selectedAppointment ? (
                <AppointmentForm selectedAppointment={selectedAppointment} onSubmit={handleSubmit} />
              ) : (
                <AppointmentSelection onSelect={setSelectedAppointment} />
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
              Contact our support team for help with scheduling appointments or explore our FAQ.
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