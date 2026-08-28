import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Apple, Hospital, HeartPlus, BookOpenText, Rss, ShieldPlus, Tent, Brain } from 'lucide-react';

const services = [
  { icon: Tent, title: 'المأوى والحماية' },
  { icon: Apple, title: 'الغذاء والمياه' },
  { icon: Hospital, title: 'الرعاية الصحية' },
  { icon: HeartPlus, title: 'الدعم النفسي' },
  { icon: BookOpenText, title: 'التعليم الأساسي' },
  { icon: Rss, title: 'خدمات الإنترنت' },
];

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex overflow-hidden bg-brand-dark"
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Split layout: Right side image, Left side content (RTL so Right is Right conceptually) */}
      <div className="w-1/2 h-full relative overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.2, x: 50 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 6, ease: "easeOut" }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/hero-slider-2.jpg`}
            className="w-full h-full object-cover object-center"
            alt="Services"
          />
          <div className="absolute inset-0 bg-brand-primary mix-blend-multiply opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-l from-brand-dark via-transparent to-transparent opacity-80" />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-16 z-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl font-bold text-brand-white leading-tight"
          >
            الإغاثة <br /> والخدمات <br />الأساسية
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={phase >= 1 ? { width: '100px' } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
            className="h-2 bg-brand-second mt-8"
          />
        </div>
      </div>

      <div className="w-1/2 h-full bg-brand-third p-16 flex flex-col justify-center relative">
        <motion.div
          className="absolute top-0 right-0 w-full h-full bg-brand-second opacity-5"
          initial={{ scale: 0.9, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        />
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 relative z-10 mt-12">
          {services.map((srv, i) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-6"
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-brand-white shadow-lg flex items-center justify-center text-brand-primary">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col justify-center pt-2">
                  <h3 className="text-2xl font-bold text-brand-dark">{srv.title}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}