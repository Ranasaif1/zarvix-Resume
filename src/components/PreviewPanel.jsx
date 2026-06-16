import React from 'react';

function PreviewPanel({ resumeData, template }) {
  const info = resumeData?.personalInfo || {};
  const skills = resumeData?.skills || [];
  const projects = resumeData?.projects || [];
  const experience = resumeData?.experience || [];
  const education = resumeData?.education || [];
  
  // Structured Array Mappings
  const certificates = resumeData?.certificates || [];
  const languagesData = resumeData?.languagesData || [];
  const referenceMode = resumeData?.referenceMode || "";

  // Dynamic Fallbacks
  const namePlaceholder = info.fullName || "YOUR FULL NAME";
  const titlePlaceholder = info.jobTitle || "YOUR PROFESSIONAL POSITION";
  const emailPlaceholder = info.email || "email@example.com";
  const phonePlaceholder = info.phone || "+92 300 0000000";
  const summaryPlaceholder = info.aboutMe || "Proactive and results-driven professional with a solid background in executing complex milestones, managing high-level tracking databases, and driving core organizational velocity metrics efficiently.";

  // Inline String Renders for Single-Column Sections
  const renderCertificatesInline = () => {
    if (certificates.length === 0) return "";
    return certificates.map(c => `${c.title || 'Certificate'} (${c.org || 'Institute'} — ${c.month} ${c.year}${c.duration ? `, ${c.duration}` : ''})`).join(' | ');
  };

  const renderLanguagesInline = () => {
    if (languagesData.length === 0) return "";
    return languagesData.map(l => `${l.name} (${l.level})`).join(', ');
  };

  // ==========================================
  // 📄 DESIGN 1: EXECUTIVE MINIMALIST (Clean ATS Blueprint)
  // ==========================================
  if (template === 'modern' || !template) {
    return (
      <div className="w-full max-w-200 bg-white p-8 shadow-2xl text-slate-900 font-sans min-h-262.5 flex flex-col justify-between border border-slate-200">
        <div>
          <div className="text-center border-b-2 border-slate-950 pb-4 mb-5">
            <h1 className="text-4xl font-black uppercase tracking-tight text-slate-950 mb-1">{namePlaceholder}</h1>
            <p className="text-xs font-bold text-slate-600 tracking-wider uppercase mb-2">{titlePlaceholder}</p>
            <div className="flex flex-wrap justify-center gap-x-4 text-xs font-medium text-slate-600">
              <span>📞 {phonePlaceholder}</span><span>|</span><span>✉️ {emailPlaceholder}</span><span>|</span><span>📍 Karachi, Pakistan</span>
            </div>
          </div>
          <div className="mb-5">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-950 mb-1.5">👤 PROFILE SUMMARY</h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">{summaryPlaceholder}</p>
          </div>
          {skills.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-2">🛠️ CORE EXPERTISE & SKILLS</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-800 font-semibold pl-4 list-disc">
                {skills.map((s, i) => <div key={i}>• {s}</div>)}
              </div>
            </div>
          )}
          {experience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-2">💼 PROFESSIONAL EXPERIENCE</h2>
              {experience.map((exp, i) => (
                <div key={exp.id || i} className="mb-3">
                  <div className="flex justify-between font-bold text-xs text-slate-950">
                    <span>{exp.role || "Job Position"} &mdash; {exp.company || "Company Name"}</span>
                    <span className="text-slate-600 font-semibold">{exp.duration || "Timeline"}</span>
                  </div>
                  {exp.description && <p className="text-xs text-slate-600 whitespace-pre-line mt-1 pl-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-2">🎓 EDUCATION & QUALIFICATION</h2>
              {education.map((edu, i) => (
                <div key={edu.id || i} className="flex justify-between text-xs font-semibold text-slate-800 mb-1.5">
                  <span>{edu.institute || "University Name"} &mdash; <span className="text-slate-600 font-medium">{edu.degree || "Degree Enrolled"}</span></span>
                  <span className="text-slate-600 font-medium">{edu.duration || "Year"}</span>
                </div>
              ))}
            </div>
          )}
          {certificates.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-2">📜 CERTIFICATIONS</h2>
              <p className="text-xs text-slate-700 font-semibold pl-2">{renderCertificatesInline()}</p>
            </div>
          )}
          {projects.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-2">📂 PROJECTS</h2>
              {projects.map((p, i) => (
                <div key={p.id || i} className="text-xs mb-2 pl-2">
                  <p className="font-bold text-slate-950">{p.title || "Project Title"} <span className="text-indigo-600 font-medium text-[11px]">[{p.tech || "Stack"}]</span></p>
                  <p className="text-slate-600 mt-0.5">{p.desc || "Short summary."}</p>
                </div>
              ))}
            </div>
          )}
          {languagesData.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">🌐 LANGUAGES</h2>
              <p className="text-xs text-slate-800 font-bold pl-2">{renderLanguagesInline()}</p>
            </div>
          )}
        </div>
        {referenceMode && (
          <div className="text-[10px] text-center font-bold text-slate-400 border-t pt-2 uppercase tracking-widest">
            References: {referenceMode}
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // 👔 DESIGN 2: EXECUTIVE CORPORATE NAVY (Top Solid Header Band)
  // ==========================================
  if (template === 'navy') {
    return (
      <div className="w-full max-w-200 bg-white shadow-2xl text-slate-800 font-sans min-h-262.5 flex flex-col justify-between">
        <div>
          <div className="bg-slate-900 p-8 text-white text-center">
            <h1 className="text-3xl font-black uppercase tracking-wide">{namePlaceholder}</h1>
            <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mt-1">{titlePlaceholder}</p>
            <div className="flex justify-center gap-6 text-xs mt-4 text-slate-300 font-medium">
              <span>📱 {phonePlaceholder}</span><span>•</span><span>✉️ {emailPlaceholder}</span>
            </div>
          </div>
          <div className="p-8 space-y-5">
            <div>
              <h2 className="text-xs font-black text-slate-900 uppercase border-l-4 border-slate-900 pl-2 tracking-wider mb-2">Summary</h2>
              <p className="text-xs text-slate-600 pl-3 leading-relaxed">{summaryPlaceholder}</p>
            </div>
            {experience.length > 0 && (
              <div>
                <h2 className="text-xs font-black text-slate-900 uppercase border-l-4 border-slate-900 pl-2 tracking-wider mb-3">Work History</h2>
                {experience.map((exp, i) => (
                  <div key={exp.id || i} className="pl-3 mb-3">
                    <div className="flex justify-between font-bold text-xs text-slate-950"><span>{exp.role} @ {exp.company}</span><span className="text-slate-500 font-semibold">{exp.duration}</span></div>
                    <p className="text-xs text-slate-600 whitespace-pre-line mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-black text-slate-900 uppercase border-l-4 border-slate-900 pl-2 tracking-wider mb-2">Core Skills</h2>
                <div className="flex flex-wrap gap-1.5 pl-3">
                  {skills.map((s, i) => <span key={i} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded font-semibold">{s}</span>)}
                </div>
              </div>
            )}
            {languagesData.length > 0 && (
              <div>
                <h2 className="text-xs font-black text-slate-900 uppercase border-l-4 border-slate-900 pl-2 tracking-wider mb-1">Languages</h2>
                <p className="text-xs text-slate-600 pl-3 font-bold">{renderLanguagesInline()}</p>
              </div>
            )}
          </div>
        </div>
        {referenceMode && <div className="p-4 text-[11px] font-bold text-slate-400 border-t text-center uppercase">Ref: {referenceMode}</div>}
      </div>
    );
  }

  // ==========================================
  // 💻 DESIGN 3: TECH DEVELOPER SIDEBAR (Solid Sidebar Columns)
  // ==========================================
  if (template === 'tech') {
    return (
      <div className="w-full max-w-200 bg-white shadow-2xl font-mono min-h-262.5 flex">
        <div className="w-1/3 bg-slate-950 p-6 text-slate-300 border-r border-slate-900 flex flex-col justify-between">
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight">{namePlaceholder}</h1>
            <p className="text-xs text-indigo-400 font-bold mt-1 mb-6">// {titlePlaceholder}</p>
            <div className="text-[11px] space-y-2 text-slate-400">
              <p>📱 {phonePlaceholder}</p><p>✉️ {emailPlaceholder}</p>
            </div>
            {skills.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-1 mb-3">// CONFIG_SKILLS</h2>
                <div className="space-y-1 text-xs">{skills.map((s, i) => <p key={i}>&gt; {s}</p>)}</div>
              </div>
            )}
          </div>
          <div className="text-[10px] text-slate-600 uppercase">{referenceMode ? `// REF: ${referenceMode}` : '// CORE SECURED'}</div>
        </div>
        <div className="w-2/3 p-8 bg-slate-50 space-y-5">
          <div>
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2"># EXECUTIVE_OVERVIEW</h2>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">{summaryPlaceholder}</p>
          </div>
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3"># PRODUCTION PIPELINES</h2>
              {experience.map((exp, i) => (
                <div key={exp.id || i} className="mb-3 bg-white p-3 rounded border border-slate-200 shadow-2xs">
                  <div className="flex justify-between font-bold text-xs text-slate-950"><span>{exp.role} | {exp.company}</span><span>{exp.duration}</span></div>
                  <p className="text-xs text-slate-600 whitespace-pre-line mt-1.5">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
          {languagesData.length > 0 && (
            <div>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1"># SYSTEM_LANGUAGES</h2>
              <p className="text-xs text-slate-700 font-bold">{renderLanguagesInline()}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // 🎨 DESIGN 4: CREATIVE HIGH-CONTRAST (Top Accents & Block Grid)
  // ==========================================
  if (template === 'creative') {
    return (
      <div className="w-full max-w-200 bg-white shadow-2xl font-sans min-h-262.5 border-t-8 border-indigo-600 p-8 space-y-6 flex flex-col justify-between">
        <div className="space-y-5">
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{namePlaceholder}</h1>
              <p className="text-indigo-600 font-extrabold text-xs uppercase tracking-widest mt-0.5">{titlePlaceholder}</p>
            </div>
            <div className="text-right text-xs font-bold text-slate-500 space-y-0.5">
              <p>{phonePlaceholder}</p><p>{emailPlaceholder}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed text-justify italic">{summaryPlaceholder}</p>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded inline-block">Experience Records</h2>
              {experience.map((exp, i) => (
                <div key={exp.id || i} className="border-l-2 border-indigo-100 pl-4 space-y-1">
                  <h3 className="font-bold text-xs text-slate-900">{exp.role} @ {exp.company}</h3>
                  <span className="text-[10px] text-slate-400 block font-bold">{exp.duration}</span>
                  <p className="text-xs text-slate-600 whitespace-pre-line mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded inline-block">Skills Matrix</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((s, i) => <span key={i} className="text-[11px] font-bold text-slate-700 bg-slate-50 border px-2 py-1 rounded">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
        {referenceMode && <div className="text-[10px] font-bold text-slate-400 border-t pt-2 uppercase tracking-wide text-center">Ref: {referenceMode}</div>}
      </div>
    );
  }

  // ==========================================
  // 🏢 DESIGN 5: CLASSIC ELEGANT CORPORATE (Double Border Serif View)
  // ==========================================
  if (template === 'slate') {
    return (
      <div className="w-full max-w-200 bg-white p-10 shadow-2xl text-slate-900 font-serif min-h-262.5 border-double border-4 border-slate-300 flex flex-col justify-between">
        <div>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-medium tracking-wide uppercase border-b border-slate-900 pb-2 mb-2">{namePlaceholder}</h1>
            <p className="text-xs italic font-sans text-slate-600">Tel: {phonePlaceholder} &nbsp;|&nbsp; Email: {emailPlaceholder}</p>
          </div>
          <div className="space-y-4 text-xs font-sans text-slate-700 leading-relaxed text-justify">
            <p className="font-serif italic text-slate-800">{summaryPlaceholder}</p>
            <div>
              <h2 className="font-serif font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2 text-slate-950">Corporate History Summary</h2>
              {experience.map((exp, i) => (
                <div key={exp.id || i} className="mb-3">
                  <div className="flex justify-between font-bold text-slate-950"><span>{exp.role} &mdash; {exp.company}</span><span>{exp.duration}</span></div>
                  <p className="whitespace-pre-line mt-1 text-slate-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {referenceMode && <div className="text-[10px] font-sans font-bold text-slate-400 text-center border-t pt-2 uppercase tracking-widest">References: {referenceMode}</div>}
      </div>
    );
  }

  // ==========================================
  // 💚 DESIGN 6: EMERALD LUXURY ACCENTS (Solid Left Pillar Band)
  // ==========================================
  if (template === 'emerald') {
    return (
      <div className="w-full max-w-200 bg-white shadow-2xl font-sans min-h-262.5 border-l-12 border-emerald-800 p-8 flex flex-col justify-between">
        <div className="space-y-5">
          <div>
            <h1 className="text-3xl font-black text-emerald-950 uppercase tracking-tight">{namePlaceholder}</h1>
            <p className="text-xs text-emerald-700 font-bold tracking-wider mt-0.5 uppercase">{titlePlaceholder}</p>
            <div className="w-16 h-1 bg-emerald-600 mt-2 mb-2"></div>
            <p className="text-xs text-slate-500 font-bold tracking-wide">PH: {phonePlaceholder} / MAIL: {emailPlaceholder}</p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed text-justify">{summaryPlaceholder}</p>
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-2.5">Core Value Matrix</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => <div key={i} className="bg-emerald-50 text-emerald-950 text-xs font-bold px-3 py-1.5 border-l-2 border-emerald-700 rounded-sm">{s}</div>)}
              </div>
            </div>
          )}
        </div>
        {referenceMode && <div className="text-[10px] font-bold text-slate-400 border-t pt-2 uppercase">Ref Block: {referenceMode}</div>}
      </div>
    );
  }

  // ==========================================
  // 📊 DESIGN 7: TWO-COLUMN COMPACT MINIMAL (Maximum Visual Density)
  // ==========================================
  if (template === 'compact') {
    return (
      <div className="w-full max-w-200 bg-white p-6 shadow-2xl font-sans text-xs min-h-262.5 grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-slate-50 p-4 border border-slate-200 rounded flex flex-col justify-between">
          <div>
            <h1 className="font-black text-xl text-slate-900 tracking-tighter uppercase">{namePlaceholder}</h1>
            <p className="text-slate-500 font-bold uppercase tracking-wider text-[9px] mt-0.5">{titlePlaceholder}</p>
            <div className="space-y-1 text-[11px] border-t pt-3 mt-4 text-slate-600 font-medium">
              <p>📞 {phonePlaceholder}</p><p>✉️ {emailPlaceholder}</p>
            </div>
            {skills.length > 0 && (
              <div className="mt-5">
                <p className="font-black text-slate-800 border-b pb-0.5 mb-2 uppercase text-[10px]">Expertise:</p>
                <div className="space-y-1 font-semibold text-slate-600 text-[11px]">{skills.map((s, i) => <p key={i}>• {s}</p>)}</div>
              </div>
            )}
          </div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">{referenceMode ? `Ref: ${referenceMode}` : ''}</div>
        </div>
        <div className="col-span-2 space-y-4">
          <p className="text-slate-600 leading-relaxed text-justify">{summaryPlaceholder}</p>
          {experience.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-black text-xs uppercase tracking-widest text-indigo-600 border-b pb-0.5">Employment Summary</h2>
              {experience.map((exp, i) => (
                <div key={exp.id || i} className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-900"><span>{exp.role} | {exp.company}</span><span className="text-slate-400 font-normal">{exp.duration}</span></div>
                  <p className="text-slate-600 whitespace-pre-line text-justify leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // ⚡ DESIGN 8: STARTUP TIMELINE (Node Connections Mapping)
  // ==========================================
  if (template === 'dot') {
    return (
      <div className="w-full max-w-200 bg-white p-8 shadow-2xl font-sans min-h-262.5 space-y-6 flex flex-col justify-between">
        <div>
          <div className="border-b-4 border-amber-500 pb-2">
            <h1 className="text-3xl font-black text-slate-950 uppercase tracking-tight">{namePlaceholder}</h1>
            <p className="text-xs font-mono text-slate-500 mt-1">{emailPlaceholder} || {phonePlaceholder} || {titlePlaceholder}</p>
          </div>
          <p className="text-xs text-slate-600 mt-4 leading-relaxed">{summaryPlaceholder}</p>
          {experience.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xs font-black tracking-widest text-amber-600 uppercase mb-4">// Production Roadmap</h2>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <div key={exp.id || i} className="relative pl-6 border-l-2 border-amber-500/20">
                    <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-1.75 top-1"></div>
                    <div className="text-xs font-bold text-slate-900">{exp.role} &mdash; <span className="text-amber-600">{exp.company}</span></div>
                    <span className="text-[10px] text-slate-400 block font-bold">{exp.duration}</span>
                    <p className="text-xs text-slate-600 whitespace-pre-line mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {referenceMode && <div className="text-[10px] font-mono text-slate-400 font-bold uppercase border-t pt-2">Ref Parameters: {referenceMode}</div>}
      </div>
    );
  }

  // ==========================================
  // 📚 DESIGN 9: ACADEMIC RESEARCH HEAVY (Formal Single Column Type)
  // ==========================================
  if (template === 'academic') {
    return (
      <div className="w-full max-w-200 bg-white p-10 shadow-2xl font-serif text-slate-900 min-h-262.5 space-y-6 flex flex-col justify-between">
        <div>
          <div className="text-center border-b pb-4">
            <h1 className="text-2xl tracking-widest uppercase font-medium">{namePlaceholder}</h1>
            <p className="text-xs font-sans text-slate-500 mt-2">{emailPlaceholder} • {phonePlaceholder} • {titlePlaceholder}</p>
          </div>
          <p className="text-xs text-slate-700 font-sans text-justify leading-relaxed italic pt-2">{summaryPlaceholder}</p>
          {education.length > 0 && (
            <div className="text-xs space-y-3 font-sans text-slate-700 pt-2">
              <h2 className="font-serif font-bold italic text-sm border-b pb-0.5 text-slate-900">Academic Foundations</h2>
              {education.map((edu, i) => (
                <p key={edu.id || i} className="mb-1"><strong>{edu.institute}</strong> &mdash; {edu.degree} ({edu.duration})</p>
              ))}
            </div>
          )}
        </div>
        {referenceMode && <div className="text-[10px] font-sans font-bold text-slate-400 text-center border-t pt-2 uppercase">Ref Auth: {referenceMode}</div>}
      </div>
    );
  }

  // ==========================================
  // ✒️ DESIGN 10: EDITORIAL BOLD TYPOGRAPHY (Magazine Layout Grid)
  // ==========================================
  if (template === 'bold') {
    return (
      <div className="w-full max-w-200 bg-zinc-50 p-8 shadow-2xl font-sans text-zinc-900 min-h-262.5 flex flex-col justify-between border border-zinc-200">
        <div>
          <div className="grid grid-cols-3 gap-4 items-baseline border-b-4 border-zinc-900 pb-4 mb-6">
            <h1 className="col-span-2 text-5xl font-black tracking-tighter uppercase leading-none text-zinc-950 truncate">{namePlaceholder}</h1>
            <div className="text-right text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
              <p>{phonePlaceholder}</p><p>{emailPlaceholder}</p>
            </div>
          </div>
          <p className="text-xs text-zinc-700 text-justify leading-relaxed mb-5 font-medium">{summaryPlaceholder}</p>
          {experience.length > 0 && (
            <div className="space-y-5">
              <h2 className="text-[10px] font-black bg-zinc-950 text-white px-2 py-0.5 inline-block uppercase tracking-widest">Selected Experience Track</h2>
              {experience.map((exp, i) => (
                <div key={exp.id || i} className="mb-4">
                  <div className="flex justify-between items-baseline font-bold text-xs">
                    <span className="text-sm tracking-tight text-zinc-950 uppercase font-black">{exp.role} | {exp.company}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-zinc-600 whitespace-pre-line mt-1.5 text-justify font-medium">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {referenceMode && <div className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-widest text-center border-t pt-2">Blueprint Auth: {referenceMode}</div>}
      </div>
    );
  }
}

export default PreviewPanel;