"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/utils/authContext";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaHome, FaChevronDown } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const { isLoggedIn, user, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-blue-200/50 shadow-lg transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent tracking-tight">
                Eventify
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-8"
            >
              <Link
                href="/"
                className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 font-medium relative"
                aria-label="Home"
              >
                <FaHome className="text-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                <span>Home</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    href="/events"
                    className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 font-medium relative"
                    aria-label="Events"
                  >
                    <span>Events</span>
                  </Link>
                  <Link
                    href="/events/add"
                    className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 font-medium relative"
                    aria-label="Add Event"
                  >
                    <span>Add Event</span>
                  </Link>
                  <Link
                    href="/events/mine"
                    className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 font-medium relative"
                    aria-label="My Event"
                  >
                    <span>My Event</span>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Auth/Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              {isLoggedIn && user ? (
                <div className="relative flex items-center gap-2">
                  <button
                    ref={buttonRef}
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 flex items-center gap-2"
                    aria-haspopup="menu"
                    aria-expanded={dropdownOpen}
                    aria-label="User menu"
                  >
                    {loading ? (
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                    ) : (
                      <Image
                        width={40}
                        height={40}
                        src={user.photoURL || "/favicon.svg"}
                        alt={user.name ? `${user.name}'s profile` : "Profile image"}
                        className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shadow"
                      />
                    )}
                    <FaChevronDown
                      className={`ml-1 text-gray-500 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 mt-12 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 focus:outline-none"
                        tabIndex={-1}
                        role="menu"
                        aria-label="User dropdown"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="font-semibold text-gray-800">{user.name || "User"}</div>
                          <div className="text-xs text-gray-500">{user.email || "No email"}</div>
                        </div>
                        <div className="border-t border-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-xl font-medium flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-blue-400"
                          role="menuitem"
                        >
                          <FaSignOutAlt className="text-sm" /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/auth/login"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-blue-400"
                    aria-label="Login"
                  >
                    <FaUser className="text-sm" />
                    <span>Login</span>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <FaTimes className="w-5 h-5 text-gray-700" />
            ) : (
              <FaBars className="w-5 h-5 text-gray-700" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
              tabIndex={-1}
              role="menu"
              aria-label="Mobile menu"
            >
              <div className="py-6 border-t border-gray-200/50">
                <div className="flex flex-col gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href="/"
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Home"
                    >
                      <FaHome className="text-sm" />
                      <span>Home</span>
                    </Link>
                  </motion.div>
                  {isLoggedIn && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 }}
                      >
                        <Link
                          href="/events"
                          className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-blue-50"
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label="Events"
                        >
                          <span>Events</span>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.14 }}
                      >
                        <Link
                          href="/events/add"
                          className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-blue-50"
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label="Add Event"
                        >
                          <span>Add Event</span>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.16 }}
                      >
                        <Link
                          href="/events/mine"
                          className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-blue-50"
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label="My Event"
                        >
                          <span>My Event</span>
                        </Link>
                      </motion.div>
                    </>
                  )}

                  {isLoggedIn && user ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="pt-4 border-t border-gray-200/50 space-y-3"
                    >
                      <div className="flex items-center gap-3 px-3">
                        {loading ? (
                          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                        ) : (
                          <Image
                            width={40}
                            height={40}
                            src={user.photoURL || "/favicon.svg"}
                            alt={user.name ? `${user.name}'s profile` : "Profile image"}
                            className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shadow"
                          />
                        )}
                        <div>
                          <div className="font-semibold text-gray-800">{user.name || "User"}</div>
                          <div className="text-xs text-gray-500">{user.email || "No email"}</div>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-blue-400"
                        role="menuitem"
                      >
                        <FaSignOutAlt className="text-sm" /> Logout
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/auth/login"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-blue-400"
                        aria-label="Login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaUser className="text-sm" />
                        <span>Login</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
