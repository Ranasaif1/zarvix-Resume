import React from "react";
import { motion } from "framer-motion";

const TermsPage = ({ setView }) => {

  const sections = [
    {
      title: "1. Acceptance of Terms",
      text: "By using Zarvix Resume, you agree to follow all terms and conditions of the platform."
    },
    {
      title: "2. Services",
      text: "We provide resume building tools, ATS optimization, and modern templates for job seekers."
    },
    {
      title: "3. User Responsibilities",
      list: [
        "Provide accurate information",
        "Do not misuse platform",
        "Do not copy or resell content",
        "Keep account secure"
      ]
    },
    {
      title: "4. Intellectual Property",
      text: "All designs, templates, and branding belong to Zarvix Resume and are legally protected."
    },
    {
      title: "5. Limitation of Liability",
      text: "We do not guarantee job placement or ATS score success. Use at your own responsibility."
    },
    {
      title: "6. Governing Law",
      text: "These terms are governed under the laws of Pakistan."
    }
  ];

  return (
    <main className="w-full max-w-4xl mx-auto px-6 pt-36 pb-32 text-slate-300">

      {/* HEADER */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-white">
          Terms & Conditions
        </h1>
        <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mt-2">
          Last Updated: June 2026
        </p>
      </div>

      {/* CARDS */}
      <div className="space-y-6">

        {sections.map((sec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 0px 25px rgba(99,102,241,0.25)"
            }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl transition-all cursor-pointer hover:border-indigo-500/40"
          >

            <h2 className="text-white font-bold text-lg mb-2">
              {sec.title}
            </h2>

            {sec.text && (
              <p className="text-slate-400 text-sm leading-relaxed">
                {sec.text}
              </p>
            )}

            {sec.list && (
              <ul className="list-disc list-inside text-slate-400 text-sm space-y-2">
                {sec.list.map((item, idx) => (
                  <li key={idx} className="hover:text-white transition">
                    {item}
                  </li>
                ))}
              </ul>
            )}

          </motion.div>
        ))}

      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setView("contact")}
          className="px-6 py-3 rounded-xl text-sm font-bold text-white
          bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500
          hover:scale-105 transition shadow-lg"
        >
          Need Help? Contact Us
        </button>
      </div>

    </main>
  );
};

export default TermsPage;