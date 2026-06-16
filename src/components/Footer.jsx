import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/zarvix-logo.png";

const Footer = ({ setView }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-white/10 py-12 px-6 mt-auto">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* BRAND SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} className="h-10 drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
            <h1 className="text-xl font-black text-white">Zarvix Resume</h1>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            Create professional and ATS-friendly resumes with modern templates
            designed to help you stand out and land more interviews.
          </p>
        </motion.div>

        {/* NAV LINKS */}
        <div>
          <h3 className="text-white font-bold mb-4 tracking-wider">Quick Links</h3>

          <ul className="space-y-3 text-sm">

            {[
              { label: "Home", view: "home" },
              { label: "About", view: "about" },
              { label: "Contact", view: "contact" }
            ].map((item) => (
              <li
                key={item.view}
                onClick={() => setView(item.view)}
                className="text-slate-400 hover:text-white cursor-pointer transition-all hover:translate-x-1"
              >
                {item.label}
              </li>
            ))}

          </ul>
        </div>

        {/* LEGAL + CTA */}
        <div>
          <h3 className="text-white font-bold mb-4 tracking-wider">Legal</h3>

          <ul className="space-y-3 text-sm mb-6">

            <li onClick={() => setView('privacy')} className="text-slate-400 hover:text-white cursor-pointer transition hover:translate-x-1">
              Privacy Policy
            </li>

            <li onClick={() => setView('terms')} className="text-slate-400 hover:text-white cursor-pointer transition hover:translate-x-1">
              Terms & Conditions
            </li>

          </ul>

          {/* CTA BUTTON */}
          <motion.button
            onClick={() => setView('builder')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-2 rounded-xl text-sm font-black text-white
            bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500
            shadow-lg hover:shadow-indigo-500/40 transition-all"
          >
            Get Resume
          </motion.button>

        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} © 2026 Zarvix. All Rights Reserved
      </div>

    </footer>
  );
};

export default Footer;