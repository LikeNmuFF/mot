import { motion } from "framer-motion";
import { content } from "../data/content";
import Counter from "./Counter";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function IntroScreen({ onComplete }) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-cream via-cream to-lilac-light/15 flex flex-col items-center justify-center px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-lilac/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="flex flex-col items-center gap-8 sm:gap-10 text-center relative z-10"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} className="mb-2">
          <motion.img
            src="/logo.png"
            alt="Xeia"
            className="w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-lg"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* App title */}
        <motion.h1
          className="font-serif text-4xl sm:text-5xl text-purple tracking-wide"
          variants={fadeUp}
        >
          {content.appTitle}
        </motion.h1>

        {/* Intro line */}
        <motion.p
          className="font-serif text-lg sm:text-xl text-charcoal/80 italic max-w-[300px] leading-relaxed"
          variants={fadeUp}
        >
          {content.introLine}
        </motion.p>

        {/* Counter */}
        <motion.div variants={fadeUp} className="mt-2">
          <Counter />
        </motion.div>

        {/* Counting label */}
        <motion.p
          className="text-xs sm:text-sm text-warm-gray/70 font-sans tracking-[0.2em] uppercase"
          variants={fadeUp}
        >
          and counting
        </motion.p>

        {/* CTA button */}
        <motion.button
          onClick={onComplete}
          className="mt-4 px-12 py-4 bg-purple text-white font-sans font-medium text-sm tracking-wider rounded-full hover:bg-purple-dark active:bg-purple-dark transition-colors duration-200 shadow-md shadow-purple/25 hover:shadow-lg hover:shadow-purple/30"
          variants={fadeUp}
          whileTap={{ scale: 0.96 }}
          animate={{ 
            boxShadow: [
              "0 4px 14px 0 rgba(124, 92, 191, 0.25)",
              "0 4px 20px 0 rgba(124, 92, 191, 0.4)",
              "0 4px 14px 0 rgba(124, 92, 191, 0.25)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Tap to begin
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default IntroScreen;
