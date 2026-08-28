import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene0() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden bg-brand-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-brand-primary mix-blend-multiply opacity-40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent z-10" />
        <img
          src={`${import.meta.env.BASE_URL}images/cover-camp.jpg`}
          className="w-full h-full object-cover object-center"
          alt="Camp Cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 p-4 bg-brand-third rounded-3xl shadow-2xl"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            className="w-48 h-auto mix-blend-multiply"
            alt="Al Aqsa Logo"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold text-brand-white mb-6 tracking-tight leading-tight"
        >
          مخيم الأقصى للإغاثة والتنمية
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-3xl font-medium text-brand-second-light/90 max-w-3xl leading-relaxed text-balance"
          style={{ color: 'var(--color-brand-third)' }}
        >
          نسعى لخلق الحياة لأناسٍ سُلبت منهم الحياة، طفولة بريئة وعيون تبحث عن الأمل
        </motion.p>
      </div>

      {/* Decorative lines */}
      <motion.div
        className="absolute top-0 right-1/4 w-px h-full bg-brand-second opacity-30"
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-full h-px bg-brand-second opacity-30"
        initial={{ scaleX: 0, transformOrigin: 'right' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}