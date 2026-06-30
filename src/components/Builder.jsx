import React, { useState } from 'react';
import FormPanel from './FormPanel';
import PreviewPanel from './PreviewPanel';

const Builder = ({
  setView,
  resumeData,
  setResumeData,
  template,
  setTemplate
}) => {
  // Mobile ke liye Tab State
  const [activeTab, setActiveTab] = useState('form');

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white overflow-hidden print:h-auto print:bg-white print:text-black print:overflow-visible print:block">

      {/* TOP DASHBOARD BAR */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex justify-between items-center shrink-0 print:hidden">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-black tracking-tight">
            Zarvix <span className="text-indigo-400">Builder</span>
          </h1>
          <span className="hidden md:block bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
            ● Auto Saved
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:block bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl">
            <span className="text-indigo-400 text-xs font-bold">ATS Optimized</span>
          </div>
          <button
            onClick={() => setView('home')}
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/20 transition text-sm"
          >
            Exit
          </button>
        </div>
      </div>

      {/* MOBILE TOGGLE BAR (Sirf mobile par dikhayen) */}
      <div className="md:hidden flex p-2 bg-slate-900 border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('form')} 
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'form' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
          Editor
        </button>
        <button 
          onClick={() => setActiveTab('preview')} 
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'preview' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
          Preview
        </button>
      </div>

      {/* BUILDER BODY */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden print:overflow-visible print:block">

        {/* LEFT PANEL (FORM) */}
        <div className={`${activeTab === 'form' ? 'block' : 'hidden'} md:block w-full md:w-1/2 bg-slate-950 border-r border-slate-800 overflow-y-auto print:hidden`}>
          <div className="sticky top-0 bg-slate-950 border-b border-slate-800 p-4 z-10">
            <h2 className="text-lg font-black">Resume Editor</h2>
            <p className="text-slate-400 text-xs">Fill your details and build ATS resume</p>
          </div>
          <div className="p-4 md:p-8">
            <FormPanel
              resumeData={resumeData}
              setResumeData={setResumeData}
              template={template}
              setTemplate={setTemplate}
            />
          </div>
        </div>

        {/* RIGHT PANEL (PREVIEW) */}
        <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} md:block w-full md:w-1/2 bg-slate-900 overflow-y-auto print:w-full print:bg-white print:overflow-visible print:block`}>
          <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center print:hidden">
            <h2 className="text-lg font-black text-white">Live Preview</h2>
          </div>
          <div id="print-area" className="p-4 md:p-8 flex justify-center">
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