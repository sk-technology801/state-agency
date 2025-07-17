
// ./src/app/contact/locations/page.jsx
"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

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

// Locations Content Component
function LocationsContent() {
  const pathname = usePathname();

  const locations = [
    {
      name: "Main Office",
      address: "123 State Agency Rd, Capital City, ST 12345",
      phone: "+1-800-555-1234",
      email: "mainoffice@stateagency.gov",
      hours: "Monday - Friday, 8:00 AM - 5:00 PM",
    },
    {
      name: "North Branch",
      address: "456 North Ave, North City, ST 67890",
      phone: "+1-800-555-5678",
      email: "northbranch@stateagency.gov",
      hours: "Monday - Friday, 9:00 AM - 4:00 PM",
    },
    {
      name: "South Branch",
      address: "789 South St, South City, ST 54321",
      phone: "+1-800-555-9012",
      email: "southbranch@stateagency.gov",
      hours: "Monday - Thursday, 8:30 AM - 4:30 PM",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-blue-950 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-7xl w-full mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Office Locations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-md shadow-md text-gray-900"
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              {location.name}
            </h3>
            <p className="text-sm flex items-center mb-1">
              <MapPin className="w-4 h-4 mr-2" />
              {location.address}
            </p>
            <p className="text-sm flex items-center mb-1">
              <Phone className="w-4 h-4 mr-2" />
              <a
                href={`tel:${location.phone}`}
                className="text-blue-600 hover:text-blue-800"
                aria-label={`Call ${location.name}`}
              >
                {location.phone}
              </a>
            </p>
            <p className="text-sm flex items-center mb-1">
              <Mail className="w-4 h-4 mr-2" />
              <a
                href={`mailto:${location.email}`}
                className="text-blue-600 hover:text-blue-800"
                aria-label={`Email ${location.name}`}
              >
                {location.email}
              </a>
            </p>
            <p className="text-sm">{location.hours}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold text-white mb-4">Find Us on the Map</h3>
        <div className="bg-gray-300 h-64 rounded-md flex items-center justify-center">
          <p className="text-gray-600">
            Map Placeholder (Integrate with a map API for interactive map)
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LocationsPage() {
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
              Find Our Offices
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Visit one of our state agency offices for in-person assistance with licenses, permits, taxes, and more.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#locations-content"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition font-semibold"
                aria-label="View office locations"
              >
                View Locations
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Locations Section */}
        <section id="locations-content" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div>Loading locations...</div>}>
              <LocationsContent />
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
              Contact our support team or explore our resources for additional help.
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
