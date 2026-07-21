import { motion } from "framer-motion";
import { timeline } from "../data/timeline";
import TimelineCard from "./TimelineCard";
import { ease, duration, fadeUp } from "../utils/motion";

function Timeline({ onComplete }) {
  return (
    <motion.div
      className="min-h-screen bg-cream py-12 px-6 sm:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto">
        <motion.h2
          className="font-serif text-2xl sm:text-3xl text-charcoal text-center mb-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Our Story
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-lilac to-transparent sm:-translate-x-1/2" />

          <div className="flex flex-col gap-14">
            {timeline.map((item, i) => (
              <TimelineCard
                key={item.id}
                date={item.date}
                title={item.title}
                caption={item.caption}
                image={item.image}
                index={i}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={onComplete}
            className="px-10 py-3 bg-purple text-white font-sans font-medium text-sm tracking-wide rounded-full hover:bg-purple-dark transition-colors flex items-center gap-2"
            whileTap={{ scale: 0.96 }}
          >
            Continue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Timeline;
