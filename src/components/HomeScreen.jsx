import { motion } from "framer-motion";
import Counter from "./Counter";

const navItems = [
  {
    id: "timeline",
    label: "Replay our story",
    icon: "📖",
  },
  {
    id: "finale",
    label: "Read your letter again",
    icon: "💌",
  },
  {
    id: "gallery",
    label: "Our gallery",
    icon: "🖼️",
  },
  {
    id: "photobooth",
    label: "Photobooth",
    icon: "📸",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.5 },
  },
};

const card = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function HomeScreen({ onNavigate }) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-cream via-cream to-lilac-light/15 flex flex-col items-center px-6 py-10 sm:py-14 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-lilac/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center gap-8 relative z-10">
        {/* Logo + Title */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/logo.png"
            alt="Xeia"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-sm"
          />
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-tight">
            Xeia
          </h1>
        </motion.div>

        {/* Live counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="bg-white/40 backdrop-blur-sm rounded-2xl px-6 py-4 border border-lilac-light/30"
        >
          <Counter />
        </motion.div>

        {/* Navigation grid */}
        <motion.div
          className="w-full grid grid-cols-2 gap-3 sm:gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              variants={card}
              className="group flex flex-col items-center gap-2.5 p-5 sm:p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-lilac-light/40 hover:bg-white/70 hover:border-lilac/60 hover:shadow-lg hover:shadow-lilac/10 transition-all duration-300 cursor-pointer"
              whileTap={{ scale: 0.97 }}
            >
              <span
                className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-200"
                role="img"
                aria-label={item.label}
              >
                {item.icon}
              </span>
              <span className="font-sans text-xs sm:text-sm text-charcoal/80 font-medium text-center leading-snug">
                {item.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Footer tagline */}
        <motion.p
          className="font-serif text-xs text-warm-gray/60 italic text-center mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Our little corner of the world
        </motion.p>
      </div>
    </motion.div>
  );
}

export default HomeScreen;
