import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden bg-brand-dark"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/story-1.jpg`}
          className="w-full h-full object-cover opacity-30"
          alt="Story"
        />
        <div className="absolute inset-0 bg-brand-primary mix-blend-multiply opacity-80" />
      </motion.div>

      <div className="relative z-20 w-full max-w-7xl px-12 flex items-center justify-between h-full">
        
        {/* Text Content */}
        <div className="w-5/12 text-brand-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-16 h-1 bg-brand-second" />
            <h3 className="text-3xl font-bold tracking-wider">قصص نجاحنا</h3>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl font-black leading-tight mb-8"
          >
            بتكاتف تطوعي، <br /> تحول اليأس إلى أمل
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl text-brand-third opacity-90 leading-relaxed max-w-lg"
          >
            نبني مجتمعًا مستدامًا نابضًا بالحياة. في كل خيمة يسكن الألم، لكن العزيمة لا تعرف الاستسلام.
          </motion.p>
        </div>

        {/* 3D Stacked Images */}
        <div className="w-6/12 relative h-[600px] perspective-1000 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -30, z: -200 }}
            animate={phase >= 2 ? { opacity: 1, x: 0, rotateY: -15, z: 0 } : { opacity: 0, x: -100, rotateY: -30, z: -200 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 w-[450px] h-[300px] rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-third/20 transform-style-3d"
            style={{ top: '10%' }}
          >
            <img src={`${import.meta.env.BASE_URL}images/hero-slider-3.jpg`} className="w-full h-full object-cover" alt="Pic 1" />
            <div className="absolute inset-0 bg-brand-primary opacity-20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -10, z: 100 }}
            animate={phase >= 3 ? { opacity: 1, x: -60, rotateY: -5, z: 50, y: 40 } : { opacity: 0, x: 100, rotateY: -10, z: 100 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-10 w-[500px] h-[350px] rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-white z-20 transform-style-3d"
            style={{ bottom: '15%' }}
          >
            <img src={`${import.meta.env.BASE_URL}images/story-2.jpg`} className="w-full h-full object-cover" alt="Pic 2" />
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}