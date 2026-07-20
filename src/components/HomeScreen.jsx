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
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function HomeScreen({ onNavigate }) {
  return (
    <motion.div
      className="min-h-screen bg-cream flex flex-col items-center px-6 py-12 sm:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-md flex flex-col items-center gap-10">
        {/* Title */}
        <motion.h1
          className="font-serif text-4xl sm:text-5xl text-charcoal tracking-tight"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Xeia
        </motion.h1>

        {/* Live counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Counter />
        </motion.div>

        {/* Navigation grid */}
        <motion.div
          className="w-full grid grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              variants={card}
              className="group flex flex-col items-center gap-3 p-6 sm:p-8 bg-white/60 rounded-2xl border border-lilac-light/50 hover:bg-white/90 hover:border-lilac transition-all duration-200"
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-3xl sm:text-4xl" role="img" aria-label={item.label}>
                {item.icon}
              </span>
              <span className="font-sans text-sm sm:text-base text-charcoal font-medium text-center leading-snug">
                {item.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Footer tagline */}
        <motion.p
          className="font-serif text-sm text-warm-gray italic text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Our little corner of the world
        </motion.p>
      </div>
    </motion.div>
  );
}

export default HomeScreen;
