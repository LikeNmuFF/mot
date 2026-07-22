# Xeia UI/UX Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a comprehensive motion design system and polish animations across all screens for a cohesive, modern UI/UX.

**Architecture:** Create a shared motion config file (`src/utils/motion.js`) with standardized easing curves, durations, and entrance variants. Update all screen components to use this shared system and add micro-interaction polish.

**Tech Stack:** React, Framer Motion, Tailwind CSS

## Global Constraints
- Maintain `prefers-reduced-motion` support
- Keep existing color palette (cream, lilac, purple, rose, sage, gold)
- Use Playfair Display for serif, Inter for sans-serif
- Mobile-first responsive design
- No new dependencies required

---

### Task 1: Create Shared Motion Config

**Files:**
- Create: `src/utils/motion.js`

**Interfaces:**
- Consumes: None (new file)
- Produces: `ease`, `duration`, `stagger`, `fadeIn`, `fadeUp`, `scaleIn`, `container`, `item` exports

- [ ] **Step 1: Create motion.js with easing curves**

```js
// src/utils/motion.js

// Easing curves
export const ease = {
  smooth: [0.22, 1, 0.36, 1],    // Gentle deceleration
  bounce: [0.34, 1.56, 0.64, 1], // Subtle spring
  quick: [0.4, 0, 0.2, 1],       // Fast, responsive
};
```

- [ ] **Step 2: Add duration presets**

```js
// Duration presets
export const duration = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.4,
  slow: 0.6,
  entrance: 0.8,
};
```

- [ ] **Step 3: Add stagger timing**

```js
// Stagger timing for lists/grids
export const stagger = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
};
```

- [ ] **Step 4: Add standard entrance variants**

```js
// Standard entrance variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.normal } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.entrance, ease: ease.smooth } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: duration.normal, ease: ease.smooth } },
};

// Container variants (for staggering children)
export const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger.normal, delayChildren: 0.3 },
  },
};

// Item variants (for staggered children)
export const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: duration.entrance, ease: ease.smooth },
  },
};
```

- [ ] **Step 5: Verify file is syntactically correct**

Run: `node -c src/utils/motion.js`
Expected: No syntax errors

- [ ] **Step 6: Commit**

```bash
git add src/utils/motion.js
git commit -m "feat: add shared motion design system config"
```

---

### Task 2: Polish LoginScreen Animations

**Files:**
- Modify: `src/components/LoginScreen.jsx`

**Interfaces:**
- Consumes: `ease`, `duration`, `fadeUp`, `fadeIn` from `src/utils/motion.js`
- Produces: Updated LoginScreen with polished animations

- [ ] **Step 1: Import motion utilities**

Replace the existing import section with:

```jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../data/content";
import { ease, duration, fadeUp, fadeIn } from "../utils/motion";
```

- [ ] **Step 2: Replace fadeUp variant with imported version**

Remove the local `fadeUp` definition (lines 5-12) and update usages to use the imported `fadeUp` variant.

- [ ] **Step 3: Refine shake animation timing**

Update the shake keyframes in `index.css` to be tighter:

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  15%, 35%, 55%, 75%, 95% { transform: translateX(-3px); }
  25%, 45%, 65%, 85% { transform: translateX(3px); }
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}
```

- [ ] **Step 4: Add focus state polish to inputs**

Update the input class to include smoother focus transitions:

```jsx
const inputClass = `w-[4.5rem] sm:w-24 h-14 sm:h-16 text-center text-xl sm:text-2xl font-serif
  bg-white/50 backdrop-blur-sm border-[1.5px] rounded-2xl
  focus:border-purple focus:bg-white/70 focus:ring-2 focus:ring-purple/10
  focus:outline-none transition-all duration-300 ease-out
  placeholder:text-lilac/60 placeholder:text-lg
  ${error ? "border-rose animate-shake" : "border-lilac-light/60"}`;
```

- [ ] **Step 5: Refine unlock sequence timing**

Update the unlock timeout from 1000ms to 800ms for faster feel:

```jsx
const handleSubmit = () => {
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  const y = parseInt(year, 10);

  if (m === unlockMonth && d === unlockDay && y === unlockYear) {
    setUnlocking(true);
    setTimeout(() => onUnlock(), 800); // Faster unlock
  } else {
    // ... rest unchanged
  }
};
```

- [ ] **Step 6: Test LoginScreen in browser**

Run: `npm run dev` and test the login flow
Expected: Smoother animations, tighter shake, faster unlock

- [ ] **Step 7: Commit**

```bash
git add src/components/LoginScreen.jsx src/index.css
git commit -m "feat: polish LoginScreen animations and micro-interactions"
```

---

### Task 3: Polish HomeScreen Animations

**Files:**
- Modify: `src/components/HomeScreen.jsx`

**Interfaces:**
- Consumes: `ease`, `duration`, `stagger`, `container`, `item` from `src/utils/motion.js`
- Produces: Updated HomeScreen with polished animations

- [ ] **Step 1: Import motion utilities**

```jsx
import { motion } from "framer-motion";
import Counter from "./Counter";
import { ease, duration, stagger, container, item } from "../utils/motion";
```

- [ ] **Step 2: Replace local container/card variants**

Remove the local `container` and `card` variants (lines 27-43) and use imported versions.

- [ ] **Step 3: Add hover state polish to nav cards**

Update the nav button class to include better hover states:

```jsx
className="group flex flex-col items-center gap-2.5 p-5 sm:p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-lilac-light/40 hover:bg-white/70 hover:border-lilac/60 hover:shadow-lg hover:shadow-lilac/10 hover:-translate-y-0.5 transition-all duration-300 ease-out cursor-pointer"
```

- [ ] **Step 4: Add tap feedback to nav cards**

Ensure `whileTap={{ scale: 0.97 }}` is present on all nav buttons.

- [ ] **Step 5: Add subtle background glow animation**

Update the background glow div to have a subtle breathing effect:

```jsx
<motion.div
  className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-lilac/8 rounded-full blur-[120px] pointer-events-none"
  animate={{
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```

- [ ] **Step 6: Test HomeScreen in browser**

Run: `npm run dev` and navigate to HomeScreen
Expected: Smoother card animations, subtle background breathing effect

- [ ] **Step 7: Commit**

```bash
git add src/components/HomeScreen.jsx
git commit -m "feat: polish HomeScreen animations and card interactions"
```

---

### Task 4: Polish Timeline Animations

**Files:**
- Modify: `src/components/Timeline.jsx`
- Modify: `src/components/TimelineCard.jsx`

**Interfaces:**
- Consumes: `ease`, `duration`, `fadeUp` from `src/utils/motion.js`
- Produces: Updated Timeline with polished animations

- [ ] **Step 1: Update Timeline.jsx imports**

```jsx
import { motion } from "framer-motion";
import { timeline } from "../data/timeline";
import TimelineCard from "./TimelineCard";
import { ease, duration, fadeUp } from "../utils/motion";
```

- [ ] **Step 2: Refine Timeline heading animation**

Update the heading to use imported `fadeUp` variant:

```jsx
<motion.h2
  className="font-serif text-2xl sm:text-3xl text-charcoal text-center mb-10"
  variants={fadeUp}
  initial="hidden"
  animate="visible"
>
  Our Story
</motion.h2>
```

- [ ] **Step 3: Update TimelineCard.jsx imports**

```jsx
import { motion } from "framer-motion";
import { ease, duration } from "../utils/motion";
```

- [ ] **Step 4: Refine TimelineCard entrance animation**

Update the card entrance to use consistent easing:

```jsx
<motion.div
  className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-lilac-light/30"
  initial={{ opacity: 0, y: 30, scale: 0.95 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: duration.entrance, ease: ease.smooth }}
>
```

- [ ] **Step 5: Add subtle image hover effect**

```jsx
<img
  src={image}
  alt={title}
  className="w-full h-48 sm:h-56 object-cover rounded-xl mb-4 group-hover:scale-[1.02] transition-transform duration-300"
/>
```

- [ ] **Step 6: Test Timeline in browser**

Run: `npm run dev` and scroll through Timeline
Expected: Smoother card entrances, consistent timing

- [ ] **Step 7: Commit**

```bash
git add src/components/Timeline.jsx src/components/TimelineCard.jsx
git commit -m "feat: polish Timeline animations and card transitions"
```

---

### Task 5: Polish FinaleScreen Animations

**Files:**
- Modify: `src/components/FinaleScreen.jsx`

**Interfaces:**
- Consumes: `ease`, `duration`, `fadeIn` from `src/utils/motion.js`
- Produces: Updated FinaleScreen with polished animations

- [ ] **Step 1: Import motion utilities**

```jsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../data/content";
import { ease, duration, fadeIn } from "../utils/motion";
```

- [ ] **Step 2: Refine tulip motif timing**

Update the TulipPetal component to use consistent easing:

```jsx
function TulipPetal({ index, delay }) {
  // ... existing code ...
  return (
    <motion.div
      // ... existing styles ...
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
```

- [ ] **Step 3: Refine celebration particle physics**

Update the CelebrationParticle to use smoother easing:

```jsx
function CelebrationParticle({ index }) {
  // ... existing code ...
  return (
    <motion.div
      // ... existing styles ...
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
```

- [ ] **Step 4: Refine letter body entrance**

Update the paragraph animations to use consistent timing:

```jsx
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
```

- [ ] **Step 5: Test FinaleScreen in browser**

Run: `npm run dev` and navigate to FinaleScreen
Expected: Smoother tulip animation, better particle physics, refined letter reveal

- [ ] **Step 6: Commit**

```bash
git add src/components/FinaleScreen.jsx
git commit -m "feat: polish FinaleScreen animations and particle effects"
```

---

### Task 6: Polish InteractiveMoment Animations

**Files:**
- Modify: `src/components/InteractiveMoment.jsx`

**Interfaces:**
- Consumes: `ease`, `duration` from `src/utils/motion.js`
- Produces: Updated InteractiveMoment with polished animations

- [ ] **Step 1: Import motion utilities**

```jsx
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease, duration } from "../utils/motion";
```

- [ ] **Step 2: Refine confetti particle physics**

Update the ConfettiParticle to use smoother easing:

```jsx
function ConfettiParticle({ index }) {
  // ... existing code ...
  return (
    <motion.div
      // ... existing styles ...
      initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
      animate={{
        x: randomX,
        y: randomY,
        opacity: [1, 1, 0],
        scale: randomScale,
        rotate: randomRotate,
      }}
      transition={{
        duration: 1.5,
        delay: randomDelay,
        ease: ease.smooth,
      }}
      style={{
        // ... existing styles ...
      }}
    />
  );
}
```

- [ ] **Step 3: Refine slider thumb animation**

Update the slider thumb to have smoother transitions:

```jsx
className="absolute w-full h-12 appearance-none bg-transparent cursor-pointer z-10
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:w-8
  [&::-webkit-slider-thumb]:h-8
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-purple
  [&::-webkit-slider-thumb]:border-4
  [&::-webkit-slider-thumb]:border-white
  [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(124,92,191,0.5)]
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:duration-200
  [&::-webkit-slider-thumb]:hover:shadow-[0_0_20px_rgba(124,92,191,0.7)]
  [&::-webkit-slider-thumb]:active:scale-110
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:w-8
  [&::-moz-range-thumb]:h-8
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:bg-purple
  [&::-moz-range-thumb]:border-4
  [&::-moz-range-thumb]:border-white
  [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(124,92,191,0.5)]
  [&::-moz-range-track]:appearance-none
  [&::-moz-range-track]:bg-transparent
  [&::-moz-range-track]:h-3"
```

- [ ] **Step 4: Refine value display transition**

Update the value display to use smoother scaling:

```jsx
<motion.span
  className="font-serif text-5xl sm:text-6xl text-purple font-bold tabular-nums"
  key={value}
  initial={{ scale: 0.9, opacity: 0.7 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: duration.fast, ease: ease.smooth }}
>
  {value}
</motion.span>
```

- [ ] **Step 5: Test InteractiveMoment in browser**

Run: `npm run dev` and test the love slider
Expected: Smoother confetti, better slider feedback, refined value display

- [ ] **Step 6: Commit**

```bash
git add src/components/InteractiveMoment.jsx
git commit -m "feat: polish InteractiveMoment animations and slider feedback"
```

---

### Task 7: Polish Gallery Animations

**Files:**
- Modify: `src/components/Gallery.jsx`

**Interfaces:**
- Consumes: `ease`, `duration`, `stagger` from `src/utils/motion.js`
- Produces: Updated Gallery with polished animations

- [ ] **Step 1: Import motion utilities**

```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gallery } from "../data/gallery";
import { ease, duration, stagger } from "../utils/motion";
```

- [ ] **Step 2: Refine grid card animations**

Update the gallery grid cards to use consistent timing:

```jsx
{gallery.map((photo, index) => (
  <motion.button
    key={photo.id}
    onClick={() => openLightbox(index)}
    className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out cursor-pointer group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: duration.entrance,
      delay: index * stagger.fast,
      ease: ease.smooth,
    }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <img
      src={photo.src}
      alt={photo.caption}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
    />
  </motion.button>
))}
```

- [ ] **Step 3: Refine lightbox transitions**

Update the lightbox photo transitions to use consistent timing:

```jsx
<AnimatePresence mode="wait">
  <motion.img
    key={selectedPhoto.id}
    src={selectedPhoto.src}
    alt={selectedPhoto.caption}
    className="w-full rounded-lg object-contain max-h-[70vh]"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: duration.fast, ease: ease.smooth }}
  />
</AnimatePresence>
```

- [ ] **Step 4: Test Gallery in browser**

Run: `npm run dev` and test the Gallery
Expected: Smoother grid animations, better hover states, refined lightbox transitions

- [ ] **Step 5: Commit**

```bash
git add src/components/Gallery.jsx
git commit -m "feat: polish Gallery animations and lightbox transitions"
```

---

### Task 8: Polish Photobooth Animations

**Files:**
- Modify: `src/components/Photobooth.jsx`

**Interfaces:**
- Consumes: `ease`, `duration` from `src/utils/motion.js`
- Produces: Updated Photobooth with polished animations

- [ ] **Step 1: Import motion utilities**

```jsx
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoStripTemplate from "./PhotoStripTemplate";
import { ease, duration } from "../utils/motion";
```

- [ ] **Step 2: Refine countdown animation**

Update the countdown to use smoother scaling:

```jsx
{countdown !== null && (
  <motion.div
    className="absolute inset-0 flex items-center justify-center z-10"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.5 }}
    transition={{ duration: duration.fast, ease: ease.smooth }}
  >
    <span className="font-serif text-[120px] sm:text-[160px] text-white drop-shadow-2xl font-bold">
      {countdown}
    </span>
  </motion.div>
)}
```

- [ ] **Step 3: Refine capture button animation**

Update the capture button to have smoother tap feedback:

```jsx
<motion.button
  onClick={startCaptureSequence}
  disabled={isCapturing || !cameraReady}
  className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-200 ease-out ${
    isCapturing || !cameraReady
      ? "border-white/30 bg-white/10 cursor-not-allowed"
      : "border-white bg-white/20 hover:bg-white/30 active:scale-95"
  }`}
  whileTap={!isCapturing && cameraReady ? { scale: 0.9 } : {}}
>
  <div
    className={`w-16 h-16 rounded-full transition-colors duration-200 ${
      isCapturing ? "bg-purple" : "bg-white"
    }`}
  />
</motion.button>
```

- [ ] **Step 4: Test Photobooth in browser**

Run: `npm run dev` and test the Photobooth
Expected: Smoother countdown, better capture button feedback

- [ ] **Step 5: Commit**

```bash
git add src/components/Photobooth.jsx
git commit -m "feat: polish Photobooth animations and capture feedback"
```

---

### Task 9: Polish Counter Animations

**Files:**
- Modify: `src/components/Counter.jsx`

**Interfaces:**
- Consumes: `ease`, `duration` from `src/utils/motion.js`
- Produces: Updated Counter with polished animations

- [ ] **Step 1: Import motion utilities**

```jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ease, duration } from "../utils/motion";
```

- [ ] **Step 2: Refine digit transition**

Update the digit animation to use smoother scaling:

```jsx
{digits.map((digit, index) => (
  <motion.span
    key={`${label}-${index}`}
    className="inline-block tabular-nums"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      delay: index * 0.05, 
      duration: duration.fast,
      ease: ease.smooth 
    }}
  >
    {digit}
  </motion.span>
))}
```

- [ ] **Step 3: Test Counter in browser**

Run: `npm run dev` and observe the counter
Expected: Smoother digit transitions, better visual rhythm

- [ ] **Step 4: Commit**

```bash
git add src/components/Counter.jsx
git commit -m "feat: polish Counter animations and digit transitions"
```

---

### Task 10: Add Global Button Focus Styles

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: None
- Produces: Updated global button styles

- [ ] **Step 1: Add focus ring styles**

Add to `index.css` after the scrollbar styling:

```css
/* Button focus styles for accessibility */
button:focus-visible {
  outline: 2px solid var(--color-purple);
  outline-offset: 2px;
}

input:focus-visible {
  outline: 2px solid var(--color-purple);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Test focus styles in browser**

Run: `npm run dev` and test keyboard navigation
Expected: Clear focus indicators on interactive elements

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add global focus styles for accessibility"
```

---

### Task 11: Final Integration Test

**Files:**
- None (testing only)

**Interfaces:**
- Consumes: All previous tasks
- Produces: Verified polished UI/UX

- [ ] **Step 1: Start development server**

Run: `npm run dev`

- [ ] **Step 2: Test LoginScreen**

- Test shake animation on wrong entry
- Test unlock animation on correct entry
- Verify input focus states

- [ ] **Step 3: Test HomeScreen**

- Verify card hover/tap states
- Check background glow animation
- Test staggered entrance

- [ ] **Step 4: Test Timeline**

- Scroll through timeline cards
- Verify entrance animations
- Check mobile responsiveness

- [ ] **Step 5: Test FinaleScreen**

- Watch tulip motif animation
- Verify confetti particles
- Check letter reveal timing

- [ ] **Step 6: Test InteractiveMoment**

- Test slider feedback
- Verify confetti burst
- Check value display transitions

- [ ] **Step 7: Test Gallery**

- Test grid card animations
- Verify lightbox transitions
- Check hover states

- [ ] **Step 8: Test Photobooth**

- Test countdown animation
- Verify capture button feedback
- Check camera permissions

- [ ] **Step 9: Test reduced motion**

- Enable `prefers-reduced-motion` in browser
- Verify animations are simplified

- [ ] **Step 10: Final commit**

```bash
git add -A
git commit -m "feat: complete UI/UX polish and animation refinement"
```
