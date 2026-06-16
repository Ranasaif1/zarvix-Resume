import React from 'react';
import PropTypes from 'prop-types';

const AboutPage = ({ setView = () => {} }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">

      <main className="flex-1 flex flex-col justify-center items-center px-4 pt-40 pb-16">

        <div className="w-full max-w-5xl bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-xl">

          {/* HEADER */}
          <div className="text-center mb-10">

            <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-[3px]">
              About Zarvix Resume
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
              Build Professional
              <span className="block bg-linear-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ATS-Friendly Resumes
              </span>
            </h1>

            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Create modern, recruiter-approved resumes with powerful templates
              designed to help you land more interviews and career opportunities.
            </p>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 text-center hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-4xl font-black text-indigo-400">10+</h3>
              <p className="text-slate-400 text-sm mt-2">Premium Templates</p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 text-center hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-4xl font-black text-cyan-400">100%</h3>
              <p className="text-slate-400 text-sm mt-2">ATS Optimized</p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-4xl font-black text-emerald-400">24/7</h3>
              <p className="text-slate-400 text-sm mt-2">Support Available</p>
            </div>

          </div>

          {/* ABOUT CONTENT */}
          <div className="bg-slate-950/40 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-5">

            <h2 className="text-2xl font-black text-white">
              Who We Are
            </h2>

            <p className="text-slate-300 leading-relaxed text-justify">
              Welcome to{" "}
              <span className="text-indigo-400 font-bold">
                Zarvix Resume
              </span>
              , a modern resume-building platform designed to help job seekers
              create professional and ATS-friendly resumes within minutes.
            </p>

            <p className="text-slate-300 leading-relaxed text-justify">
              Whether you are a student, fresh graduate, experienced
              professional, freelancer, or career changer, our platform makes
              resume creation simple, fast, and effective.
            </p>

            <p className="text-slate-300 leading-relaxed text-justify">
              We provide professionally crafted resume templates optimized for
              Applicant Tracking Systems (ATS), ensuring your resume is easily
              readable by recruiters and hiring software.
            </p>

            <p className="text-slate-300 leading-relaxed text-justify">
              Our goal is to combine modern design, simplicity, and ATS
              optimization so users can focus on getting interviews instead of
              struggling with resume formatting.
            </p>

          </div>

          {/* FEATURES */}
          <div className="mt-10">

            <h2 className="text-2xl font-black text-center mb-6">
              Why Choose Zarvix Resume?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {[
                "10+ Professional Resume Designs",
                "100% ATS-Friendly Templates",
                "Modern & Clean Layouts",
                "Real-Time Resume Preview",
                "Easy Customization",
                "Fast Resume Generation",
                "Mobile Responsive Design",
                "Career-Focused Experience"
              ].map((item) => (
                <div
                  key={item}
                  className="group bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-emerald-400 font-bold mr-2">✓</span>
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}

            </div>

          </div>

          {/* CTA */}
          <div className="mt-12 bg-linear-to-r from-indigo-500/10 via-cyan-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-8 text-center">

            <h3 className="text-3xl font-black mb-3">
              Ready To Build Your Resume?
            </h3>

            <p className="text-slate-400 mb-6">
              Create a professional ATS-friendly resume and increase your
              chances of getting hired.
            </p>

            <button
              onClick={() => setView('builder')}
              className="px-8 py-4 rounded-2xl font-black bg-linear-to-r from-indigo-500 via-cyan-500 to-purple-500 hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.4)]"
            >
              Build Resume Now 
            </button>

          </div>

          {/* CONTACT */}
          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">

            <div>
              <h4 className="font-black text-white">
                Need Help?
              </h4>

              <p className="text-slate-500 text-sm">
                If you have any questions, feel free to contact us anytime.
              </p>
            </div>

            <button
              onClick={() => setView('contact')}
              className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-indigo-400 hover:text-white font-bold transition-all duration-300"
            >
              Contact Us 📩
            </button>

          </div>

        </div>

      </main>

    </div>
  );
};

AboutPage.propTypes = {
  setView: PropTypes.func
};

export default AboutPage;