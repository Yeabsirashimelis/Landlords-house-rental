"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";
import logo from "../images/logo.jpg";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com",
    color: "hover:text-blue-600",
  },
  { icon: Twitter, href: "https://twitter.com", color: "hover:text-blue-400" },
  {
    icon: Instagram,
    href: "https://instagram.com",
    color: "hover:text-pink-500",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    color: "hover:text-blue-700",
  },
];

const footerLinks = [
  {
    title: "For Renters",
    links: [
      "Search Properties",
      "Rental Calculator",
      "Renter Resources",
      "Application Tips",
    ],
  },
  {
    title: "For Landlords",
    links: [
      "List Property",
      "Property Management",
      "Tenant Screening",
      "Marketing Tools",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Contact"],
  },
  {
    title: "Support",
    links: ["Help Center", "Safety", "Terms of Service", "Privacy Policy"],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Newsletter Section */}
      <div className="border-b border-slate-700">
        <div className="px-4 py-16 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="mb-4 text-3xl font-bold">Stay Updated</h3>
            <p className="max-w-2xl mx-auto mb-8 text-slate-300">
              Get the latest property listings and rental market insights
              delivered to your inbox
            </p>
            <div className="flex flex-col max-w-md gap-4 mx-auto sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="text-white bg-white/10 border-white/20 placeholder:text-slate-400 focus:border-emerald-500"
              />
              <Button className="px-8 font-semibold bg-emerald-600 hover:bg-emerald-700">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-4 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-6 space-x-2">
              <img src={logo} className="rounded-md h-14" />
              <div>
                <h3 className="text-2xl font-bold">Landlords</h3>
                <p className="text-sm text-slate-400">Rental Platform</p>
              </div>
            </div>
            <p className="mb-6 leading-relaxed text-slate-300">
              Your go-to place for finding rental homes. Connecting renters with
              their perfect properties since 2024.
            </p>

            {/* Contact Info */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center text-slate-300">
                <Mail className="w-4 h-4 mr-3 text-emerald-400" />
                <span className="text-sm">contact@landlords.com</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="w-4 h-4 mr-3 text-emerald-400" />
                <span className="text-sm">+251942110161</span>
              </div>
              <div className="flex items-center text-slate-300">
                <MapPin className="w-4 h-4 mr-3 text-emerald-400" />
                <span className="text-sm">Addis Ababa, Ethiopia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 bg-white/10 rounded-xl text-slate-400 ${social.color} transition-all duration-300 hover:bg-white/20`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-6 text-lg font-semibold">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-300 text-slate-300 hover:text-emerald-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="px-4 py-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-slate-400 md:mb-0">
              © {currentYear} Landlords. All rights reserved.
            </p>

            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-sm transition-colors duration-300 text-slate-400 hover:text-emerald-400"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm transition-colors duration-300 text-slate-400 hover:text-emerald-400"
              >
                Terms of Service
              </a>
              <Button
                onClick={scrollToTop}
                size="sm"
                variant="outline"
                className="transition-all duration-300 border-slate-600 text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Footer Art */}
      <div className="relative overflow-hidden">
        <svg
          className="w-full h-16 text-slate-800"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </footer>
  );
}
