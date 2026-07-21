import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../data/content";
import { ease, duration } from "../utils/motion";

function TulipPetal({ index, delay }) {
  const colors = ["#B8A9C9", "#D4C8E2", "#7C5CBF", "#FDF6EC"];
  const color = colors[index % colors.length];
  const angle = (index / 8) * 360;
  const radians = (angle * Math.PI) / 180;

  return (
    <motion.div
      className="absolute"
      style={{
        width: 16,
        height: 24,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        backgroundColor: color,
        transformOrigin: "bottom center",
        left: `calc(50% + ${Math.cos(radians) * 18}px - 8px)`,
        top: `calc(50% + ${Math.sin(radians) * 18}px - 24px)`,
      }}
      initial={{ opacity: 0, scale: 0, rotate: angle - 90 }}
      animate={{ opacity: 0.7, scale: 1, rotate: angle - 90 }}
      transition={{ 
        duration: 0.6, 
        delay: delay + index * 0.05,
        ease: ease.smooth 
      }}
    />
  );
}

function CelebrationParticle({ index }) {
  const colors = ["#B8A9C9", "#7C5CBF", "#D4C8E2", "#FDF6EC", "#A8B5A0"];
  const color = colors[index % colors.length];
  const angle = (index / 30) * 360;
  const radians = (angle * Math.PI) / 180;
  const distance = 80 + Math.random() * 120;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: 6 + Math.random() * 6,
        height: 6 + Math.random() * 6,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        backgroundColor: color,
        left: "50%",
        top: "40%",
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
      animate={{
        x: Math.cos(radians) * distance,
        y: Math.sin(radians) * distance,
        opacity: [1, 1, 0],
        scale: [0, 1.2, 0.6],
      }}
      transition={{ 
        duration: 1.2, 
        delay: 1.2 + index * 0.03, 
        ease: ease.smooth 
      }}
    />
  );
}

function FinaleScreen({ onComplete }) {
  const [phase, setPhase] = useState("tulip"); // "tulip" → "message"

  const finaleParagraphs = useMemo(
    () => content.finaleMessage.split("\n\n"),
    []
  );

  const isText = content.finaleMediaType === "text";

  return (
    <motion.div
      className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Celebration particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <CelebrationParticle key={i} index={i} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === "tulip" ? (
          <motion.div
            key="tulip"
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tulip motif */}
            <div className="relative w-24 h-24">
              {/* Petals */}
              {Array.from({ length: 8 }).map((_, i) => (
                <TulipPetal key={i} index={i} delay={0.2} />
              ))}
              {/* Center */}
              <motion.div
                className="absolute w-4 h-4 rounded-full bg-gold"
                style={{ left: "calc(50% - 8px)", top: "calc(50% - 8px)" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
            </div>

            <motion.p
              className="font-serif text-lg text-warm-gray italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              A moment for us...
            </motion.p>

            {/* Auto-transition to message after delay */}
            <motion.div
              onAnimationComplete={() => setPhase("message")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2.2, duration: 0 }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="message"
            className="w-full max-w-lg flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.entrance, ease: ease.smooth }}
          >
            {/* Decorative top line */}
            <motion.div
              className="w-12 h-px bg-lilac"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />

            {/* Letter header */}
            <motion.p
              className="font-serif text-lg sm:text-xl text-lilac-dark italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              For you, Erica Joy
            </motion.p>

            {/* Letter body */}
            {isText ? (
              <div className="flex flex-col gap-5">
                {finaleParagraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    className="font-serif text-base sm:text-lg text-charcoal leading-relaxed text-center"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.7 + i * 0.3, 
                      duration: duration.slow,
                      ease: ease.smooth 
                    }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            ) : (
              <motion.div
                className="w-full rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {content.finaleMediaType === "video" ? (
                  <video
                    src={content.finaleMediaSrc}
                    controls
                    className="w-full"
                    playsInline
                  />
                ) : (
                  <audio src={content.finaleMediaSrc} controls className="w-full" />
                )}
              </motion.div>
            )}

            {/* Decorative bottom line */}
            <motion.div
              className="w-12 h-px bg-lilac"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            />

            {/* Signature */}
            <motion.p
              className="font-serif text-base italic text-purple"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              With all my love 💜
            </motion.p>

            {/* Continue button */}
            <motion.button
              onClick={onComplete}
              className="mt-4 px-10 py-3 bg-purple text-white font-sans font-medium text-sm tracking-wide rounded-full hover:bg-purple-dark transition-colors"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.5 }}
              whileTap={{ scale: 0.96 }}
            >
              Continue to our home
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FinaleScreen;
