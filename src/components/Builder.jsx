import React from 'react';
import FormPanel from './FormPanel';
import PreviewPanel from './PreviewPanel';

const Builder = ({
  setView,
  resumeData,
  setResumeData,
  template,
  setTemplate
}) => {
  return (
    // Parent mein print:h-auto aur print:bg-white lagaya hai taake paper print theek ho
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden print:h-auto print:bg-white print:text-black print:overflow-visible print:block">

      {/* TOP DASHBOARD BAR - Print mein gayab (print:hidden) */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex justify-between items-center shrink-0 print:hidden">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-black tracking-tight">
            Zarvix <span className="text-indigo-400">Builder</span>
          </h1>

          <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
            ● Auto Saved
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <div className="hidden md:block bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl">
            <span className="text-indigo-400 text-xs font-bold">
              ATS Optimized
            </span>
          </div>

          <button
            onClick={() => setView('home')}
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/20 transition text-sm"
          >
            Exit Builder
          </button>

        </div>
      </div>

      {/* BUILDER BODY */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden print:overflow-visible print:block">

        {/* LEFT PANEL (FORM) - Ise 40% se 50% width kar diya hai taake khula ho jaye */}
        <div className="w-full md:w-1/2 bg-slate-950 border-r border-slate-800 overflow-y-auto print:hidden">

          <div className="sticky top-0 bg-slate-950 border-b border-slate-800 p-4 z-10">
            <h2 className="text-lg font-black">Resume Editor</h2>
            <p className="text-slate-400 text-xs">
              Fill your details and build ATS resume
            </p>
          </div>

          {/* Padding p-4 se badha kar p-6/p-8 kar di hai taake form khubsurat lage */}
          <div className="p-4 md:p-6 lg:p-8">
            <FormPanel
              resumeData={resumeData}
              setResumeData={setResumeData}
              template={template}
              setTemplate={setTemplate}
            />
          </div>

        </div>

        {/* RIGHT PANEL (PREVIEW) - Ise 60% se 50% width kar diya hai */}
        <div className="w-full md:w-1/2 bg-slate-900 overflow-y-auto print:w-full print:bg-white print:overflow-visible print:block">

          {/* Preview Header - Print mein gayab (print:hidden) */}
          <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center print:hidden">
            <h2 className="text-lg font-black text-white">
              Live Preview
            </h2>
            <span className="text-xs text-slate-400">
              Real-time update
            </span>
          </div>

          {/* PREVIEW CONTAINER */}
          <div id="print-area" className="p-4 md:p-8 flex justify-center">
            {/* Background white sirf resume document ke liye */}
            <div className="w-full max-w-[210mm] bg-white text-black min-h-[297mm] shadow-2xl">
              <PreviewPanel
                resumeData={resumeData}
                template={template}
              />
            </div>
          </div>

        </div>

      </div>

      </div>
  );
};

export default Builder;