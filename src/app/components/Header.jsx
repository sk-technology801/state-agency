"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Mail,
  Globe,
  ChevronDown,
  Shield,
  Building2,
  MapPin,
} from "lucide-react";

const navItems = [
  {
    title: "Services",
    href: "/services",
    dropdown: [
      { name: "Online Services", href: "/services/online" },
      { name: "License Applications", href: "/services/licenses" },
      { name: "Permits & Renewals", href: "/services/permits" },
    ],
  },
  {
    title: "Departments",
    href: "/departments",
    dropdown: [
      { name: "Health", href: "/departments/health" },
      { name: "Education", href: "/departments/education" },
    ],
  },
  { title: "Resources", href: "/resources" },
  { title: "Contact", href: "/contact" },
  { title: "About", href: "/about" },
];

const quickLinks = [
  { name: "Apply for License", href: "/services/licenses", icon: Shield },
  { name: "Pay Taxes", href: "/services/tax", icon: Building2 },
  { name: "Find Office", href: "/contact/locations", icon: MapPin },
];

export default function StateAgencyHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full z-50 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      {/* Top Bar */}
      <div className="text-sm px-4 py-2 flex justify-between items-center border-b border-white/10">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>State Portal</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>1-800-STATE-GOV</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>info@state.gov</span>
          </div>
        </div>
        <div className="text-xs">
          {currentTime.toLocaleDateString()} | {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Main Nav */}
      <div className="px-4 py-4 max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          STATE AGENCY
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseLeave={() => setDropdownOpen(null)}
            >
              {item.dropdown ? (
                <>
                  <button
                    onMouseEnter={() => setDropdownOpen(index)}
                    className={`flex items-center space-x-1 hover:text-blue-300 ${
                      pathname.startsWith(item.href) ? "text-blue-300" : ""
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {dropdownOpen === index && (
                    <div className="absolute top-full mt-2 bg-white text-black rounded-md shadow-md w-48">
                      {item.dropdown.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.href}
                          className="block px-4 py-2 hover:bg-blue-100"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`hover:text-blue-300 ${
                    pathname === item.href ? "text-blue-300" : ""
                  }`}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Quick Links (desktop) */}
        <div className="hidden lg:flex space-x-3">
          {quickLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="flex items-center space-x-1 bg-blue-700 px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition"
            >
              <link.icon className="w-4 h-4" />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-blue-950">
          {navItems.map((item, index) => (
            <div key={index}>
              <Link href={item.href} className="block py-2">
                {item.title}
              </Link>
              {item.dropdown && (
                <div className="pl-4 space-y-1">
                  {item.dropdown.map((sub, subIndex) => (
                    <Link
                      key={subIndex}
                      href={sub.href}
                      className="block text-sm text-blue-200 hover:text-white"
                    >
                      - {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 border-t border-white/20 space-y-2">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex items-center space-x-2 text-sm hover:text-blue-300"
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
