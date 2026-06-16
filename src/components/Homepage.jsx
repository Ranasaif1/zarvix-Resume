import React from 'react';

const HomePage = ({ setView, atsScore, designCount }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute w-150 h-150 bg-indigo-600/20 blur-3xl rounded-full -top-40 -left-40 animate-pulse"></div>
      <div className="absolute w-150 h-150 bg-cyan-500/10 blur-3xl rounded-full bottom-0 right-0 animate-pulse"></div>

      {/* HERO SECTION */}
      <main className="relative z-10 flex flex-col items-center text-center px-4 pt-44 pb-20">

        {/* Badge */}
        <div className="mb-6 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold animate-bounce">
          ⚡ AI Powered Resume Builder
        </div>

        {/* Animated Heading */}
        <h1 className="text-4xl md:text-7xl font-black leading-tight">

          <span className="bg-linear-to-r from-pink-500 via-indigo-400 to-green-400 bg-size-[300%_300%] animate-[gradient_6s_ease_infinite] bg-clip-text text-transparent">
            Build Professional
          </span>

          <br />

          <span className="bg-linear-to-r from-indigo-500 via-cyan-400 to-purple-500 bg-size-[300%_300%] animate-[gradient_6s_ease_infinite] bg-clip-text text-transparent">
            ATS Resume in Minutes
          </span>

        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-slate-400 max-w-2xl text-sm md:text-base">
          Create recruiter-friendly resumes with AI suggestions, live preview,
          modern templates, and export-ready designs.
        </p>

        {/* CTA */}
        <div className="flex flex-col md:flex-row gap-4 mt-10">

          <button
            onClick={() => setView('builder')}
            className="px-10 py-4 rounded-xl font-black bg-linear-to-r from-indigo-600 to-cyan-500 hover:scale-105 transition shadow-xl shadow-indigo-500/30"
          >
            Start Building
          </button>

          <button
            onClick={() => setView('about')}
            className="px-10 py-4 rounded-xl border border-slate-700 hover:bg-slate-900 transition"
          >
            Learn More
          </button>

        </div>

        {/* STATS */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">

          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:scale-105 transition">
            <h2 className="text-3xl font-black text-indigo-400">{atsScore}%</h2>
            <p className="text-xs text-slate-500 mt-1">ATS Optimization</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:scale-105 transition">
            <h2 className="text-3xl font-black text-cyan-400">{designCount}</h2>
            <p className="text-xs text-slate-500 mt-1">Premium Templates</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:scale-105 transition col-span-2 md:col-span-1">
            <h2 className="text-3xl font-black text-green-400">AI</h2>
            <p className="text-xs text-slate-500 mt-1">Smart Suggestions</p>
          </div>

        </div>

        {/* FEATURES */}
        <div className="mt-28 w-full max-w-6xl">

          <h2 className="text-3xl font-black mb-10">
            Why Professionals Love Zarvix 
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "AI Resume Suggestions",
              "ATS Optimized Templates",
              "Live Preview System",
              "One Click Export",
              "Modern UI Designs",
              "Fast Resume Builder"
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl hover:border-indigo-500 hover:scale-105 transition"
              >
                <p className="text-sm font-bold"> {item}</p>
              </div>
            ))}

          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-28 w-full max-w-5xl">

          <h2 className="text-3xl font-black mb-10">
            How It Works 
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-left">

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl">
              <h3 className="font-bold text-indigo-400">1. Fill Details</h3>
              <p className="text-xs text-slate-400 mt-2">
                Add your personal, education & experience info.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl">
              <h3 className="font-bold text-cyan-400">2. Live Preview</h3>
              <p className="text-xs text-slate-400 mt-2">
                See real-time resume changes instantly.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl">
              <h3 className="font-bold text-green-400">3. Download</h3>
              <p className="text-xs text-slate-400 mt-2">
                Export professional resume in one click.
              </p>
            </div>

          </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-32 w-full max-w-4xl bg-linear-to-r from-indigo-600/20 to-cyan-500/20 border border-slate-800 rounded-3xl p-12 backdrop-blur-xl">

          <h2 className="text-4xl font-black">
            Ready to Build Your Dream Resume?
          </h2>

          <p className="text-slate-400 mt-3">
            Join thousands of professionals upgrading their careers.
          </p>

          <button
            onClick={() => setView('builder')}
            className="mt-6 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-black transition"
          >
            Get Started Now
          </button>

        </div>

      </main>

      {/* ANIMATION CSS */}
      <style>
        {`
        @keyframes gradient {
          0% {background-position:0% 50%}
          50% {background-position:100% 50%}
          100% {background-position:0% 50%}
        }
        `}
      </style>

    </div>
  );
};

export default HomePage;