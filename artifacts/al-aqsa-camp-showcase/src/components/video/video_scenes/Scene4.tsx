import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden bg-brand-white"
      initial={{ opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
      animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Shapes */}
      <motion.div
        className="absolute w-[120vw] h-[120vw] rounded-full bg-brand-third opacity-50 -bottom-[60vw]"
        initial={{ scale: 0, y: 200 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      <div className="relative z-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -10 }}
          transition={{ duration: 1, type: "spring", stiffness: 100, damping: 15 }}
          className="mb-12"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            className="w-80 h-auto"
            alt="Al Aqsa Logo"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-bold text-brand-primary mb-4"
        >
          مخيم الأقصى للإغاثة والتنمية
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl text-brand-dark/70"
        >
          معاً، نصنع الأمل ونبني المستقبل
        </motion.p>
      </div>
    </motion.div>
  );
}