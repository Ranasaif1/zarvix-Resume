import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  // 1. States for Popup and Loading
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // 2. Custom Submit Function (AJAX)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      // FormSubmit AJAX URL with your email
      const response = await fetch("https://formsubmit.co/ajax/zarvixdigital@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setShowPopup(true); // Show success popup
        e.target.reset();   // Clear form fields
        
        // Hide popup after 4 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 4000);
      }
    } catch (error) {
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden px-6 pt-36 pb-24">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-bold mb-6">
            Average Reply Time: 24 Hours
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            Let's Build Your
            <span className="block bg-linear-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Dream Resume
            </span>
          </h1>

          <p className="mt-5 text-slate-400 max-w-2xl mx-auto text-lg">
            Have questions, suggestions, or need support? Our team is ready to
            help you create professional ATS-friendly resumes.
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-indigo-500/40 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">📧 Email Support</h3>
              <p className="text-slate-400">zarvixdigital@gmail.com</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-cyan-500/40 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">⚡ Fast Response</h3>
              <p className="text-slate-400">Most messages are answered within 24 hours.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-purple-500/40 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">🌎 Global Support</h3>
              <p className="text-slate-400">Helping professionals worldwide build winning resumes.</p>
            </div>

            <div className="bg-linear-to-r from-indigo-500/10 to-cyan-500/10 border border-white/10 rounded-3xl p-6">
              <h3 className="text-white font-bold text-xl mb-2">Why Contact Zarvix?</h3>
              <ul className="space-y-2 text-slate-300">
                <li>✔ ATS Optimized Resumes</li>
                <li>✔ Professional Templates</li>
                <li>✔ Career Support</li>
                <li>✔ Fast Customer Service</li>
              </ul>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl"
          >
            <h2 className="text-2xl font-black text-white mb-2 text-center">Send a Message</h2>
            <p className="text-slate-400 mb-8 text-center">
              Fill out the form below and we'll get back to you shortly.
            </p>

            {/* 3. Updated Form with onSubmit */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="_captcha" value="false" />

              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-indigo-500 focus:outline-none"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-indigo-500 focus:outline-none"
              />

              <textarea
                name="message"
                rows="6"
                required
                placeholder="Tell us how we can help..."
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-indigo-500 focus:outline-none resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* 4. CUSTOM POPUP UI */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-emerald-500/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center"
          >
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
              ✓
            </div>
            <h3 className="text-white font-black text-2xl mb-3">Thank You!</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Thank you for submitting, we will get back to you soon in a few working days.
            </p>
            <button 
              onClick={() => setShowPopup(false)}
              className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;