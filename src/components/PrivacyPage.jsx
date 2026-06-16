import React from "react";
import { motion } from "framer-motion";

const PrivacyPage = ({ setView }) => {

  const sections = [
    {
      title: "1. Welcome to Zarvix Resume",
      text: "Your privacy is important to us. This policy explains how we collect and protect your information."
    },
    {
      title: "2. Information We Collect",
      list: [
        "Name, Email, Contact details",
        "Resume data and uploaded content",
        "Payment and transaction details",
        "Device, browser, and usage data"
      ]
    },
    {
      title: "3. How We Use Your Information",
      list: [
        "Provide resume building services",
        "Improve user experience",
        "Process payments securely",
        "Customer support assistance"
      ]
    },
    {
      title: "4. Data Protection",
      text: "We use industry-standard security measures, but no system is 100% secure online."
    },
    {
      title: "5. Third-Party Services",
      text: "We may use trusted services for hosting, analytics, and payment processing."
    },
    {
      title: "6. Your Rights",
      text: "You can request access, correction, or deletion of your data anytime."
    }
  ];

  return (
    <main className="w-full max-w-4xl mx-auto px-6 pt-36 pb-32 text-slate-300">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white">
          Privacy Policy
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
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl transition-all cursor-pointer hover:border-indigo-400/40"
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
          Contact Support
        </button>
      </div>

    </main>
  );
};

export default PrivacyPage;