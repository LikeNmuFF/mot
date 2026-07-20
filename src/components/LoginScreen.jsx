import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../data/content";

function LoginScreen({ onUnlock }) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [shaking, setShaking] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("dev") === "true") {
      setUnlocking(true);
      setTimeout(() => onUnlock(), 800);
    }
  }, [onUnlock]);

  const [unlockMonth, unlockDay, unlockYear] = content.unlockDate
    .split("-")
    .map(Number);

  const handleInput = (value, setter, nextRef, maxLength) => {
    const cleaned = value.replace(/\D/g, "").slice(0, maxLength);
    setter(cleaned);
    if (cleaned.length === maxLength && nextRef?.current) {
      nextRef.current.focus();
    }
  };

  const handleKeyDown = (e, prevRef) => {
    if (e.key === "Backspace" && !e.target.value && prevRef?.current) {
      prevRef.current.focus();
    }
  };

  const handleSubmit = () => {
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const y = parseInt(year, 10);

    if (m === unlockMonth && d === unlockDay && y === unlockYear) {
      setUnlocking(true);
      setTimeout(() => onUnlock(), 800);
    } else {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setMonth("");
        setDay("");
        setYear("");
        monthRef.current?.focus();
      }, 500);
    }
  };

  const inputClass =
    "w-20 sm:w-24 h-16 sm:h-20 text-center text-2xl sm:text-3xl font-serif bg-white/60 border-2 border-lilac-light rounded-xl focus:border-purple focus:outline-none transition-colors placeholder:text-warm-gray/50 placeholder:text-xl";

  return (
    <motion.div
      className="min-h-screen bg-cream flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {!unlocking ? (
          <motion.div
            key="form"
            className={`flex flex-col items-center gap-8 ${
              shaking ? "animate-shake" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="font-serif text-xl sm:text-2xl text-charcoal text-center leading-relaxed">
              When did it all start?
            </p>

            <div className="flex gap-3 sm:gap-4">
              <input
                ref={monthRef}
                type="text"
                inputMode="numeric"
                placeholder="MM"
                value={month}
                onChange={(e) => handleInput(e.target.value, setMonth, dayRef, 2)}
                onKeyDown={(e) => handleKeyDown(e, null)}
                className={inputClass}
                autoFocus
              />
              <span className="self-center text-2xl text-warm-gray font-light">
                /
              </span>
              <input
                ref={dayRef}
                type="text"
                inputMode="numeric"
                placeholder="DD"
                value={day}
                onChange={(e) => handleInput(e.target.value, setDay, yearRef, 2)}
                onKeyDown={(e) => handleKeyDown(e, monthRef)}
                className={inputClass}
              />
              <span className="self-center text-2xl text-warm-gray font-light">
                /
              </span>
              <input
                ref={yearRef}
                type="text"
                inputMode="numeric"
                placeholder="YYYY"
                value={year}
                onChange={(e) =>
                  handleInput(e.target.value, setYear, null, 4)
                }
                onKeyDown={(e) => {
                  handleKeyDown(e, dayRef);
                  if (e.key === "Enter") handleSubmit();
                }}
                className={`${inputClass} w-28 sm:w-32`}
              />
            </div>

            <motion.button
              onClick={handleSubmit}
              className="mt-4 px-10 py-3 bg-purple text-white font-sans font-medium text-sm tracking-wide rounded-full hover:bg-purple-dark transition-colors"
              whileTap={{ scale: 0.96 }}
            >
              Unlock
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="unlocking"
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="w-12 h-12 rounded-full border-4 border-lilac-light border-t-purple animate-spin" />
            <p className="font-serif text-lg text-warm-gray italic">
              Opening our story...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LoginScreen;
