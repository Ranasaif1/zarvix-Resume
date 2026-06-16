import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/zarvix-logo.png';

const Header = ({ view, setView }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full fixed top-0 left-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <motion.div
          onClick={() => setView('home')}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="cursor-pointer flex items-center gap-3"
        >
          <motion.img
            src={logo}
            alt="zarvix-logo"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-white font-extrabold text-lg tracking-wide">
              Zarvix Resume
            </span>
            <span className="text-slate-400 text-[10px] tracking-widest uppercase">
              Build. Design. Get Hired.
            </span>
          </div>
        </motion.div>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => setView(item.id)}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-200 ${view === item.id
                ? 'text-white bg-white/10'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {item.label}

              {view === item.id && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-indigo-500 rounded-full"
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <motion.button
          onClick={() => setView('builder')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-2 rounded-xl text-sm font-black text-white
                    bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500
                    shadow-lg hover:shadow-indigo-500/40 transition-all"
        >
          Get Resume
        </motion.button>

      </div>
    </motion.header>
  );
};

export default Header;