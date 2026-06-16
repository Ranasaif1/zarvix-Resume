import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './components/Homepage';
import AboutPage from './components/About';
import ContactPage from './components/Contact';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';

import Builder from './components/Builder';

function App() {
  const [view, setView] = useState('home');

  const [atsScore, setAtsScore] = useState(0);
  const [designCount, setDesignCount] = useState(0);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      aboutMe: ''
    },
    skills: [],
    languagesData: [],
    experience: [],
    education: [],
    projects: [],
    certificates: []
  });

  const [template, setTemplate] = useState('modern');

  // FETCH DATA
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch(
          'https://backendresume-three.vercel.app/api/resume/get'
        );
        const result = await response.json();

        if (result.success && result.data) {
          setResumeData(result.data);
          if (result.data.template) setTemplate(result.data.template);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchResumeData();
  }, []);

  // AUTO SAVE
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (resumeData.personalInfo.fullName) {
        try {
          await fetch(
            'https://backendresume-three.vercel.app/api/resume/save',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...resumeData, template })
            }
          );
        } catch (error) {
          console.error('Save error:', error);
        }
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [resumeData, template]);

  // COUNTERS
  useEffect(() => {
    if (view === 'home') {
      setAtsScore(0);
      setDesignCount(0);

      const ats = setInterval(() => {
        setAtsScore(prev => (prev >= 100 ? 100 : prev + 2));
      }, 15);

      const design = setInterval(() => {
        setDesignCount(prev => (prev >= 10 ? 10 : prev + 1));
      }, 80);

      return () => {
        clearInterval(ats);
        clearInterval(design);
      };
    }
  }, [view]);

  // ✅ NAYA RETURN BLOCK (Yahan masla hal kiya gaya hai)
  return (
    <>
      {view !== 'builder' ? (
        /* YEH HISSA SIRF TAB DIKHEGA JAB BUILDER OPEN NAHI HOGA */
        <div className="min-h-screen flex flex-col bg-slate-950 text-white">
          <Header view={view} setView={setView} />

          <main className="grow">
            {view === 'home' && (
              <HomePage
                setView={setView}
                atsScore={atsScore}
                designCount={designCount}
              />
            )}
            {view === 'about' && <AboutPage setView={setView} />}
            {view === 'contact' && <ContactPage setView={setView} />}
            {view === 'privacy' && <PrivacyPage setView={setView} />}
            {view === 'terms' && <TermsPage setView={setView} />}
          </main>

          <Footer setView={setView} />
        </div>
      ) : (
        /* JAB BUILDER OPEN HOGA TOH SIRF YEH DIKHEGA (Top se start hoga) */
        <div className="bg-slate-950 min-h-screen text-white">
          <Builder
            setView={setView}
            resumeData={resumeData}
            setResumeData={setResumeData}
            template={template}
            setTemplate={setTemplate}
          />
        </div>
      )}
    </>
  );
}

export default App;