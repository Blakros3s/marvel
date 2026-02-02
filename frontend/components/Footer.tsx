"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Youtube, Heart, ExternalLink } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  explore: [
    { name: "Characters", href: "#characters" },
    { name: "Timeline", href: "#timeline" },
    { name: "Movies", href: "#" },
    { name: "Comics", href: "#" },
  ],
  community: [
    { name: "Fan Theories", href: "#" },
    { name: "Easter Eggs", href: "#" },
    { name: "Trivia", href: "#" },
    { name: "News", href: "#" },
  ],
  connect: [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "YouTube", href: "#", icon: Youtube },
    { name: "GitHub", href: "#", icon: Github },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-black text-white">
              MARVEL<span className="text-red-600">FAN</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-400">
              The ultimate destination for Marvel fans worldwide. Created with ❤️ for the Marvel community.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {footerLinks.connect.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="p-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-white hover:bg-red-600 transition-all duration-300"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            © 2024 Marvel Fanboy. Not affiliated with Marvel Entertainment.
          </p>
          <p className="text-sm text-neutral-500 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for true believers
          </p>
        </div>
      </div>
    </footer>
  );
}