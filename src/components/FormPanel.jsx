import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai'; // 🪄 Direct Browser AI Client

function FormPanel({ resumeData, template, setTemplate, setResumeData }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [loadingId, setLoadingId] = useState(null);
  const [skillInput, setSkillInput] = useState('');

  // Greeting Modal State Configuration
  const [showThankYou, setShowThankYou] = useState(false);

  // Structural tag variables
  const [langInput, setLangInput] = useState('');
  const [langLevel, setLangLevel] = useState('Native / Fluent');
  const [showReference, setShowReference] = useState(false);

  const info = resumeData?.personalInfo || {};

  // 🔑 Google AI Key
  const GEMINI_API_KEY = "AQ.Ab8RN6Kqhgb6dIVx-0XyinhSnIdOQI4oNgAoxVcF2cZhTPX0Ig";

  // 📌 Ensure Pinned Arrays Exist on Mount
  useEffect(() => {
    if (!resumeData?.experience || resumeData.experience.length === 0) {
      setResumeData(prev => ({
        ...prev,
        experience: [{ id: 'pinned-exp', company: '', role: '', duration: 'Jan 2023 - Present', description: '', isCurrent: true }]
      }));
    }
    if (!resumeData?.education || resumeData.education.length === 0) {
      setResumeData(prev => ({
        ...prev,
        education: [{ id: 'pinned-edu', institute: '', degree: 'BS Computer Science', duration: 'Jan 2022 - Present', isCurrent: true }]
      }));
    }
    if (!resumeData?.certificates) {
      setResumeData(prev => ({ ...prev, certificates: [] }));
    }
    if (!resumeData?.languagesData) {
      setResumeData(prev => ({ ...prev, languagesData: [] }));
    }
  }, []);

  // 📝 Core Setters & Handlers
  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateArrayField = (section, index, field, value) => {
    setResumeData(prev => {
      const updated = [...(prev[section] || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [section]: updated };
    });
  };

  const addArrayItem = (section, defaultObj) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), { id: Date.now().toString(), ...defaultObj }]
    }));
  };

  const removeArrayItem = (section, index) => {
    if ((section === 'experience' || section === 'education') && (resumeData?.[section] || []).length <= 1) {
      alert(`At least one ${section} block is required to maintain your resume structure!`);
      return;
    }
    setResumeData(prev => ({
      ...prev,
      [section]: (prev[section] || []).filter((_, i) => i !== index)
    }));
  };

  // 🏷️ Tag Skills Adder Engine
  const handleAddSkill = (e) => {
    if (e) e.preventDefault();
    const cleanSkill = skillInput.trim();
    if (cleanSkill && !resumeData.skills?.includes(cleanSkill)) {
      setResumeData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), cleanSkill]
      }));
      setSkillInput('');
    }
  };

  const removeSkillTag = (indexToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: (prev.skills || []).filter((_, i) => i !== indexToRemove)
    }));
  };

  // 🌐 Language Adder
  const handleAddLanguage = (e) => {
    if (e) e.preventDefault();
    const cleanLang = langInput.trim();
    if (cleanLang) {
      setResumeData(prev => ({
        ...prev,
        languagesData: [...(prev.languagesData || []), { name: cleanLang, level: langLevel }]
      }));
      setLangInput('');
    }
  };

  const handleCommaSeparated = (section, value) => {
    const list = value.split(',').map(item => item.trim());
    setResumeData(prev => ({ ...prev, [section]: list }));
  };

  // 🖨️ SMART PRINT ENGINE TRIGGER WITH UX GREETING REDIRECT
  const executePrintWithGreeting = () => {
    window.print();
    // Browser print engine blocking execution ke baad yeh automatic trigger hoga
    setTimeout(() => {
      setShowThankYou(true);
    }, 300);
  };

  // 🤖 AI BULLET POINTS ENGINE
  const generateAiBullets = async (id, index, role, company) => {
    if (!role) {
      alert("Please fill in the Position (Job Title) first to generate AI bullet points!");
      return;
    }

    setLoadingId(id);
    try {
      const prompt = `Write 3 professional resume action-oriented bullet points for the role of "${role}" at "${company || 'a company'}". Keep it concise, use strong action verbs, and make it ATS-friendly. Do not include introductory text, just provide the bullet points.`;

      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response && response.text) {
        updateArrayField('experience', index, 'description', response.text.trim());
      } else {
        throw new Error("Empty client generation text response block.");
      }
    } catch (error) {
      console.error("Direct Frontend AI Error Details:", error);
      const fallbackBullets = `• Supervised and optimized daily operations as ${role} inside ${company || 'the enterprise scope'}.\n• Maintained structural workflows, tracked performance logs, and refactored core execution data tools.\n• Delivered high-impact results to meet strict organizational policy compliance and project velocity targets.`;
      updateArrayField('experience', index, 'description', fallbackBullets);
    } finally {
      setLoadingId(null);
    }
  };

  const isPersonalValid = info.fullName && info.jobTitle && info.email && info.phone && info.aboutMe;

  return (
    <div className="space-y-6 font-sans pb-12 select-none text-slate-800 relative">

      {/* ==========================================
          🎉 DYNAMIC PREMIUM GREETING THANK YOU MODAL PAGE
          ========================================== */}
      {showThankYou && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-2xl border border-slate-100 space-y-4 transform scale-100 transition-transform">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner shadow-emerald-500/10">✓</div>
            <div className="space-y-1">
              <h2 className="text-xl font-black tracking-tight text-slate-950">Thank You for Using Us! 🎉</h2>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Zarvix AI Resume Studio</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto font-medium">
              Your high-quality ATS-friendly resume documentation has been processed successfully. We wish you the absolute best with your upcoming professional job recruitment screenings!
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowThankYou(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs p-3 rounded-xl border border-slate-200 transition"
              >
                Modify Document
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs p-3 rounded-xl shadow-lg shadow-indigo-600/20 transition"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🎛️ CANVAS OPTIONS CONTROL */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2">Select Architecture Canvas</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition"
          >
            <option value="modern">1. Executive Minimalist 📄</option>
            <option value="navy">2. Executive Corporate Navy 👔</option>
            <option value="tech">3. Tech & Developer Sidebar 💻</option>
            <option value="creative">4. Creative High-Contrast 🎨</option>
            <option value="slate">5. Classic Elegant Corporate 🏢</option>
            <option value="emerald">6. Emerald Luxury Accents 💚</option>
            <option value="compact">7. Two-Column Compact Minimal 📊</option>
            <option value="dot">8. Startup Timeline Grid ⚡</option>
            <option value="academic">9. Academic Research Heavy 📚</option>
            <option value="bold">10. Editorial Bold Typography ✒️</option>
          </select>
        </div>

        {/* NAVIGATION TABS BAR */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`flex-1 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider py-2 rounded-md transition ${activeTab === 'personal' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <span>👤</span> <span className="hidden md:inline">Profile</span>
          </button>

          <button
            type="button"
            onClick={() => isPersonalValid ? setActiveTab('experience') : alert("Please complete all required profile fields first!")}
            className={`flex-1 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider py-2 rounded-md transition ${activeTab === 'experience' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <span>💼</span> <span className="hidden md:inline">Experience</span>
          </button>

          <button
            type="button"
            onClick={() => isPersonalValid ? setActiveTab('education') : alert("Please complete all required profile fields first!")}
            className={`flex-1 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider py-2 rounded-md transition ${activeTab === 'education' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <span>🎓</span> <span className="hidden md:inline">Studies</span>
          </button>

          <button
            type="button"
            onClick={() => isPersonalValid ? setActiveTab('extras') : alert("Please complete all required profile fields first!")}
            className={`flex-1 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider py-2 rounded-md transition ${activeTab === 'extras' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <span>📂</span> <span className="hidden md:inline">Extras</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PERSONAL DETAILS */}
      {activeTab === 'personal' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 pb-2">👤 Personal Profiles</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Full Name *</label>
              <input type="text" value={info.fullName || ''} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} placeholder="e.g. Your Name" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Position Title *</label>
              <input type="text" value={info.jobTitle || ''} onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)} placeholder="e.g. Professional Title" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email Address *</label>
              <input type="email" value={info.email || ''} onChange={(e) => updatePersonalInfo('email', e.target.value)} placeholder="name@domain.com" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phone Number *</label>
              <input type="text" value={info.phone || ''} onChange={(e) => updatePersonalInfo('phone', e.target.value)} placeholder="+92 300 0000000" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Short Profile Bio Summary *</label>
            <textarea rows="4" value={info.aboutMe || ''} onChange={(e) => updatePersonalInfo('aboutMe', e.target.value)} placeholder="Write your professional overview or execution metrics here..." className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none resize-none" />
          </div>
          <div className="flex justify-end pt-2">
            <button type="button" onClick={() => isPersonalValid ? setActiveTab('experience') : alert("Please complete all mandatory profile fields first!")} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition shadow-sm">Continue →</button>
          </div>
        </div>
      )}

      {/* TAB 2: WORK EXPERIENCE */}
      {activeTab === 'experience' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center justify-between border-b border-slate-100 pb-2">
            <span>💼 Professional Tracks</span>
            <button type="button" onClick={() => addArrayItem('experience', { company: '', role: '', duration: 'Jan 2023 - Present', description: '', isCurrent: true })} className="text-[10px] bg-indigo-50 font-bold text-indigo-600 border border-indigo-200 px-2.5 py-1 rounded hover:bg-indigo-100">+ Add Experience</button>
          </h3>

          {(resumeData?.experience || []).map((exp, idx) => {
            const currentDuration = exp.duration || "Jan 2023 - Present";
            const parts = currentDuration.split(' - ');
            const startPart = parts[0] || "Jan 2023";
            const endPart = parts[1] || "Present";

            const startMonth = startPart.split(' ')[0] || "Jan";
            const startYear = startPart.split(' ')[1] || "2023";
            const endMonth = endPart === "Present" ? "Jan" : (endPart.split(' ')[0] || "Dec");
            const endYear = endPart === "Present" ? "2026" : (endPart.split(' ')[1] || "2026");

            const handleExpTimelineChange = (type, value) => {
              let sm = startMonth, sy = startYear, em = endMonth, ey = endYear;
              if (type === 'sm') sm = value;
              if (type === 'sy') sy = value;
              if (type === 'em') em = value;
              if (type === 'ey') ey = value;
              updateArrayField('experience', idx, 'duration', exp.isCurrent ? `${sm} ${sy} - Present` : `${sm} ${sy} - ${em} ${ey}`);
            };

            const toggleCurrentJob = (checked) => {
              updateArrayField('experience', idx, 'isCurrent', checked);
              updateArrayField('experience', idx, 'duration', checked ? `${startMonth} ${startYear} - Present` : `${startMonth} ${startYear} - ${endMonth} ${endYear}`);
            };

            return (
              <div key={exp.id || idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 relative">
                <button type="button" onClick={() => removeArrayItem('experience', idx)} className="absolute top-2 right-2 text-xs text-rose-500 hover:bg-rose-50 px-1.5 py-0.5 rounded font-bold">✕</button>
                <div className="grid grid-cols-2 gap-3 pr-4">
                  <input type="text" value={exp.company || ''} onChange={(e) => updateArrayField('experience', idx, 'company', e.target.value)} placeholder="Company Name" className="bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none" />
                  <input type="text" value={exp.role || ''} onChange={(e) => updateArrayField('experience', idx, 'role', e.target.value)} placeholder="Job Position / Role" className="bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none" />
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Timeline Duration</span>
                    <label className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold cursor-pointer select-none">
                      <input type="checkbox" checked={exp.isCurrent ?? false} onChange={(e) => toggleCurrentJob(e.target.checked)} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer" />
                      Currently Working Here 📌
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="space-y-1">
                      <span className="text-[10px] font-medium text-slate-500">Start:</span>
                      <div className="flex gap-1">
                        <select value={startMonth} onChange={(e) => handleExpTimelineChange('sm', e.target.value)} className="bg-slate-50 border border-slate-300 p-1 rounded grow text-xs text-slate-700">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <option key={m} value={m}>{m}</option>)}</select>
                        <select value={startYear} onChange={(e) => handleExpTimelineChange('sy', e.target.value)} className="bg-slate-50 border border-slate-300 p-1 rounded text-xs text-slate-700">{Array.from({ length: 30 }, (_, i) => 2010 + i).map(y => <option key={y} value={y}>{y}</option>)}</select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-medium text-slate-500">End:</span>
                      <div className="flex gap-1">
                        <select disabled={exp.isCurrent} value={endMonth} onChange={(e) => handleExpTimelineChange('em', e.target.value)} className="bg-slate-50 border border-slate-300 p-1 rounded grow text-xs text-slate-700 disabled:opacity-40">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <option key={m} value={m}>{m}</option>)}</select>
                        <select disabled={exp.isCurrent} value={endYear} onChange={(e) => handleExpTimelineChange('ey', e.target.value)} className="bg-slate-50 border border-slate-300 p-1 rounded text-xs text-slate-700 disabled:opacity-40">{Array.from({ length: 30 }, (_, i) => 2010 + i).map(y => <option key={y} value={y}>{y}</option>)}</select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Task Bullet Logs</label>
                    <button type="button" onClick={() => generateAiBullets(exp.id, idx, exp.role, exp.company)} disabled={loadingId === exp.id} className="text-[10px] bg-linear-to-r from-violet-600 to-indigo-600 text-white font-black px-2.5 py-1 rounded shadow-sm hover:from-violet-700 transition disabled:opacity-50">
                      {loadingId === exp.id ? "🪄 Generating... ⏳" : "🪄 Generate ATS Bullets"}
                    </button>
                  </div>
                  <textarea rows="3" value={exp.description || ''} onChange={(e) => updateArrayField('experience', idx, 'description', e.target.value)} placeholder="Click AI button to generate professional points..." className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 resize-none" />
                </div>
              </div>
            );
          })}

          {/* CHIP SKILLS INPUT */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Core Matrix Skills</label>
            <div className="flex gap-2">
              <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }} placeholder="e.g. Skill Tag (Press Enter)" className="grow bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none" />
              <button type="button" onClick={handleAddSkill} className="bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-600 px-3 text-xs font-bold rounded-lg">+</button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(resumeData?.skills || []).map((skill, index) => (
                <span key={index} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-indigo-100">
                  {skill}
                  <button type="button" onClick={() => removeSkillTag(index)} className="text-indigo-400 font-bold ml-0.5">✕</button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-2 border-t border-slate-100">
            <button type="button" onClick={() => setActiveTab('personal')} className="bg-slate-100 text-slate-600 font-bold text-xs px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-200">← Back</button>
            <button type="button" onClick={() => setActiveTab('education')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition shadow-sm">Continue →</button>
          </div>
        </div>
      )}

      {/* TAB 3: EDUCATION */}
      {activeTab === 'education' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center justify-between border-b border-slate-100 pb-2">
            <span>🎓 Academic Foundations</span>
            <button type="button" onClick={() => addArrayItem('education', { institute: '', degree: 'BS Computer Science', duration: 'Jan 2022 - Present', isCurrent: true })} className="text-[10px] bg-indigo-50 font-bold text-indigo-600 border border-indigo-200 px-2.5 py-1 rounded hover:bg-indigo-100">+ Add Studies</button>
          </h3>

          {(resumeData?.education || []).map((edu, idx) => {
            const currentDuration = edu.duration || "Jan 2022 - Present";
            const parts = currentDuration.split(' - ');
            const startPart = parts[0] || "Jan 2022";
            const endPart = parts[1] || "Present";

            const startMonth = startPart.split(' ')[0] || "Jan";
            const startYear = startPart.split(' ')[1] || "2022";
            const endMonth = endPart === "Present" ? "Jan" : (endPart.split(' ')[0] || "Dec");
            const endYear = endPart === "Present" ? "2026" : (endPart.split(' ')[1] || "2026");

            const handleTimelineChange = (type, value) => {
              let sm = startMonth, sy = startYear, em = endMonth, ey = endYear;
              if (type === 'sm') sm = value;
              if (type === 'sy') sy = value;
              if (type === 'em') em = value;
              if (type === 'ey') ey = value;
              updateArrayField('education', idx, 'duration', edu.isCurrent ? `${sm} ${sy} - Present` : `${sm} ${sy} - ${em} ${ey}`);
            };

            const toggleCurrentEdu = (checked) => {
              updateArrayField('education', idx, 'isCurrent', checked);
              updateArrayField('education', idx, 'duration', checked ? `${startMonth} ${startYear} - Present` : `${startMonth} ${startYear} - ${endMonth} ${endYear}`);
            };

            return (
              <div key={edu.id || idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative pr-8">
                <button type="button" onClick={() => removeArrayItem('education', idx)} className="absolute top-2 right-2 text-xs text-rose-500 font-bold hover:bg-rose-50 px-1.5 rounded">✕</button>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Institute / University</label>
                    <input type="text" value={edu.institute || ''} onChange={(e) => updateArrayField('education', idx, 'institute', e.target.value)} placeholder="University / College" className="bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Degree / Qualification</label>
                    <select value={edu.degree || 'BS Computer Science'} onChange={(e) => updateArrayField('education', idx, 'degree', e.target.value)} className="bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer">
                      <option value="Matriculation / O-Levels">Matriculation / O-Levels</option>
                      <option value="Intermediate (Pre-Medical)">Intermediate (Pre-Medical)</option>
                      <option value="Intermediate (Pre-Engineering)">Intermediate (Pre-Engineering)</option>
                      <option value="Intermediate (ICS)">Intermediate (ICS)</option>
                      <option value="BS Computer Science">BS Computer Science</option>
                      <option value="BS Software Engineering">BS Software Engineering</option>
                      <option value="BS Information Technology">BS Information Technology</option>
                      <option value="BS Zoology">BS Zoology</option>
                      <option value="BS Chemistry">BS Chemistry</option>
                      <option value="Bachelor of Business Administration (BBA)">Bachelor of Business Administration (BBA)</option>
                      <option value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Academic Timeline</span>
                    <label className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold cursor-pointer select-none">
                      <input type="checkbox" checked={edu.isCurrent ?? false} onChange={(e) => toggleCurrentEdu(e.target.checked)} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer" />
                      Currently Enrolled Here 🎓
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="space-y-1">
                      <span className="text-[10px] font-medium text-slate-500">Start:</span>
                      <div className="flex gap-1">
                        <select value={startMonth} onChange={(e) => handleTimelineChange('sm', e.target.value)} className="bg-slate-50 border border-slate-300 p-1 rounded grow text-xs text-slate-700">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <option key={m} value={m}>{m}</option>)}</select>
                        <select value={startYear} onChange={(e) => handleTimelineChange('sy', e.target.value)} className="bg-slate-50 border border-slate-300 p-1 rounded text-xs text-slate-700">{Array.from({ length: 30 }, (_, i) => 2010 + i).map(y => <option key={y} value={y}>{y}</option>)}</select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-medium text-slate-500">End / Expected:</span>
                      <div className="flex gap-1">
                        <select disabled={edu.isCurrent} value={endMonth} onChange={(e) => handleTimelineChange('em', e.target.value)} className="bg-slate-50 border border-slate-300 p-1 rounded grow text-xs text-slate-700 disabled:opacity-40">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <option key={m} value={m}>{m}</option>)}</select>
                        <select disabled={edu.isCurrent} value={endYear} onChange={(e) => handleTimelineChange('ey', e.target.value)} className="bg-slate-50 border border-slate-300 p-1 rounded text-xs text-slate-700 disabled:opacity-40">{Array.from({ length: 30 }, (_, i) => 2010 + i).map(y => <option key={y} value={y}>{y}</option>)}</select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => setActiveTab('experience')} className="bg-slate-100 text-slate-600 font-bold text-xs px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-200">← Back</button>
            <button type="button" onClick={() => setActiveTab('extras')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition shadow-sm">Continue →</button>
          </div>
        </div>
      )}

      {/* TAB 4: CERTIFICATIONS, LANGUAGES & REFERENCES */}
      {activeTab === 'extras' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-5">
          {/* CERTIFICATIONS ARRAY */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span>📜 Certifications & Licenses</span>
              <button type="button" onClick={() => addArrayItem('certificates', { title: '', org: '', duration: '', month: 'Jan', year: '2026' })} className="text-[10px] bg-indigo-50 font-bold text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded hover:bg-indigo-100">+ Add Certificate</button>
            </h3>
            {(resumeData?.certificates || []).map((cert, idx) => (
              <div key={cert.id || idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg relative space-y-2 pr-8">
                <button type="button" onClick={() => removeArrayItem('certificates', idx)} className="absolute top-2 right-2 text-xs text-rose-500 font-bold">✕</button>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={cert.title || ''} onChange={(e) => updateArrayField('certificates', idx, 'title', e.target.value)} placeholder="Certificate Name" className="bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold text-slate-800" />
                  <input type="text" value={cert.org || ''} onChange={(e) => updateArrayField('certificates', idx, 'org', e.target.value)} placeholder="Issuing Institute" className="bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold text-slate-800" />
                </div>
                <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-md border border-slate-200 items-center">
                  <input type="text" value={cert.duration || ''} onChange={(e) => updateArrayField('certificates', idx, 'duration', e.target.value)} placeholder="Duration" className="bg-slate-50 border border-slate-300 rounded-lg p-1 text-xs font-semibold text-slate-800" />
                  <select value={cert.month || 'Jan'} onChange={(e) => updateArrayField('certificates', idx, 'month', e.target.value)} className="bg-slate-50 border border-slate-300 p-1 rounded text-xs text-slate-700">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select value={cert.year || '2026'} onChange={(e) => updateArrayField('certificates', idx, 'year', e.target.value)} className="bg-slate-50 border border-slate-300 p-1 rounded text-xs text-slate-700">
                    {Array.from({ length: 20 }, (_, i) => 2015 + i).map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* LANGUAGES WITH 4 COMPETENCY STAGES */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 pb-1.5">🌐 Languages & Competency</h3>
            <div className="flex gap-2">
              <input type="text" value={langInput} onChange={(e) => setLangInput(e.target.value)} placeholder="Language Name" className="grow bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none" />
              <select value={langLevel} onChange={(e) => setLangLevel(e.target.value)} className="bg-white border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-700 cursor-pointer">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native / Fluent">Native / Fluent</option>
              </select>
              <button type="button" onClick={handleAddLanguage} className="bg-indigo-50 border border-indigo-200 text-indigo-600 px-3 font-bold rounded-lg text-xs">+</button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(resumeData?.languagesData || []).map((l, index) => (
                <span key={index} className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                  {l.name} <span className="text-[10px] text-indigo-500 font-bold">({l.level})</span>
                  <button type="button" onClick={() => removeArrayItem('languagesData', index)} className="text-rose-500 font-bold ml-1">✕</button>
                </span>
              ))}
            </div>
          </div>

          {/* PROJECTS PIPELINE */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span>📂 Project Venture Pipelines</span>
              <button type="button" onClick={() => addArrayItem('projects', { title: '', tech: '', desc: '' })} className="text-[10px] bg-indigo-50 font-bold text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded hover:bg-indigo-100">+ Add Project</button>
            </h3>
            {(resumeData?.projects || []).map((proj, idx) => (
              <div key={proj.id || idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 relative">
                <button type="button" onClick={() => removeArrayItem('projects', idx)} className="absolute top-2 right-2 text-xs text-rose-500 font-bold">✕</button>
                <div className="grid grid-cols-2 gap-2 pr-4">
                  <input type="text" value={proj.title || ''} onChange={(e) => updateArrayField('projects', idx, 'title', e.target.value)} placeholder="Project Name" className="bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold text-slate-800" />
                  <input type="text" value={proj.tech || ''} onChange={(e) => updateArrayField('projects', idx, 'tech', e.target.value)} placeholder="Tech Scope" className="bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold text-slate-800" />
                </div>
                <input type="text" value={proj.desc || ''} onChange={(e) => updateArrayField('projects', idx, 'desc', e.target.value)} placeholder="Summary blueprint..." className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold text-slate-800" />
              </div>
            ))}
          </div>

          {/* TOGGLE REFERENCES ON TICK CHECKBOX */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <label className="flex items-center gap-2 text-xs text-slate-700 font-black cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showReference}
                onChange={(e) => {
                  setShowReference(e.target.checked);
                  setResumeData(prev => ({ ...prev, referenceMode: e.target.checked ? "Available upon request" : "" }));
                }}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
              />
              Include Reference Section in Resume Layout? 📋
            </label>
            {showReference && (
              <div className="space-y-1">
                <input type="text" value={resumeData?.referenceMode || ''} onChange={(e) => setResumeData(prev => ({ ...prev, referenceMode: e.target.value }))} placeholder="e.g. Available upon request" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none" />
              </div>
            )}
          </div>

          <div className="flex justify-between pt-2 border-t border-slate-100">
            <button type="button" onClick={() => setActiveTab('education')} className="bg-slate-100 text-slate-600 font-bold text-xs px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-200">← Back</button>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-2 rounded-lg border border-emerald-200 shadow-2xs">● Production Complete</span>
          </div>
        </div>
      )}

      {/* 💾 EMERALD DOWNLOAD PRINT WITH GREETING POP-UP ACTION */}
      <div className="pt-2">
        <button
          type="button"
          onClick={executePrintWithGreeting}
          className="w-full bg-linear-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-black text-xs uppercase tracking-wider p-4 rounded-xl shadow-lg transition duration-100 transform active:scale-[0.99] flex items-center justify-center gap-2"
        >
          Download Resume PDF
        </button>
      </div>

    </div>
  );
}

export default FormPanel;