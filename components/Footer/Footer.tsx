import { footerSocialLinks } from "@/data";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-navy text-on-dark-soft border-t border-white/10 py-16">
      <div className="w-[80%] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Wordmark */}
          <div className="flex items-center gap-3 text-on-dark">
            <Image
              src="/images/personal-logo.png"
              alt="Austin Hinson logo"
              width={160}
              height={107}
              className="h-12 w-auto object-contain"
            />
            <span className="text-lg font-medium">Austin Hinson</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {footerSocialLinks.map((link) => (
              <a
                href={link.href}
                key={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-navy-elevated border border-white/10 flex items-center justify-center text-on-dark-soft transition-colors hover:text-coral"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Credit */}
          <p className="text-sm text-on-dark-soft flex items-center gap-1">
            Built by Austin
          </p>

        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-on-dark-soft">
            © {new Date().getFullYear()} Austin Hinson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
