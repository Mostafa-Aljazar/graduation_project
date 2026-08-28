import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Tent, Smile, Users, Hospital } from 'lucide-react';

const stats = [
  { icon: Tent, value: '5200', label: 'خيمة إيواء' },
  { icon: Smile, value: '5200', label: 'طفل مستفيد' },
  { icon: Users, value: '42300', label: 'عائلة مدعومة' },
  { icon: Hospital, value: '1200', label: 'مصاب تم علاجه' },
];

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden bg-brand-third"
      initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ opacity: 1, clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Graphic */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-full h-full bg-brand-second opacity-10 rounded-full blur-3xl"
        initial={{ scale: 0.8, x: 100 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-brand-primary opacity-5 rounded-full blur-3xl"
        initial={{ scale: 0.8, x: -100 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 5, ease: 'easeOut' }}
      />

      <div className="relative z-20 w-full max-w-6xl px-12 flex flex-col h-full justify-center">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-1 bg-brand-primary" />
            <h2 className="text-2xl font-bold text-brand-primary tracking-widest uppercase">التأثير والأرقام</h2>
          </div>
          <h1 className="text-6xl font-black text-brand-dark leading-tight max-w-3xl">
            رغم التحديات إلا أننا مستمرون لنصنع فارقاً حقيقياً
          </h1>
        </motion.div>

        <div className="grid grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={phase >= 2 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="bg-brand-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-brand-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                <div className="w-20 h-20 rounded-full bg-brand-third flex items-center justify-center mb-6 text-brand-primary">
                  <Icon size={40} strokeWidth={1.5} />
                </div>
                <div className="text-5xl font-black text-brand-dark mb-2" dir="ltr">
                  +{stat.value}
                </div>
                <div className="text-xl font-medium text-brand-second">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}