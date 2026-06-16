import React, { useState } from 'react';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/PreviewPanel';
import html2pdf from 'html2pdf.js';

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    personalInfo: { fullName: '', email: '', phone: '', location: '', jobTitle: '' },
    experience: [{ id: 1, company: '', role: '', duration: '', description: '' }],
    skills: [],
    education: [{ id: 1, institute: '', degree: '', duration: '' }],
    languages: []
  });

  // Template select karne ki state (Default: executive)
  const [selectedTemplate, setSelectedTemplate] = useState('executive');

  const downloadPDF = () => {
    const element = document.getElementById('resume-pdf');
    const opt = {
      margin:       0,
      filename:     `${resumeData.personalInfo.fullName || 'Resume'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 md:flex-row w-screen overflow-hidden">
      {/* Left Panel */}
      <div className="w-full h-full p-6 overflow-y-auto md:w-1/2 border-r border-slate-200 flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Build Your Resume</h1>
              
              {/* Template Buttons */}
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => setSelectedTemplate('executive')}
                  className={`text-xs px-3 py-1.5 rounded-md font-semibold transition ${selectedTemplate === 'executive' ? 'bg-blue-600 text-white shadow' : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'}`}
                >
                  Executive Layout
                </button>
                <button 
                  onClick={() => setSelectedTemplate('minimalist')}
                  className={`text-xs px-3 py-1.5 rounded-md font-semibold transition ${selectedTemplate === 'minimalist' ? 'bg-blue-600 text-white shadow' : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'}`}
                >
                  Minimalist Layout
                </button>
              </div>
            </div>

            <button 
              onClick={downloadPDF}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition shadow-md whitespace-nowrap"
            >
              Download PDF ⬇️
            </button>
          </div>
          <FormPanel resumeData={resumeData} setResumeData={setResumeData} />
        </div>
      </div>

      {/* Right Panel (Selected Template pass kar diya) */}
      <div className="w-full h-full p-6 overflow-y-auto bg-slate-300 md:w-1/2 flex justify-center items-start">
        <PreviewPanel resumeData={resumeData} template={selectedTemplate} />
      </div>
    </div>
  );
}