import { motion } from "framer-motion";
import { ease, duration } from "../utils/motion";

function TimelineCard({ date, title, caption, image, index }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      className="group flex flex-col items-center text-center px-4 sm:px-0"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: duration.entrance, ease: ease.smooth }}
    >
      <div className="w-full max-w-sm relative">
        {/* Timeline marker */}
        <div className="absolute left-6 sm:left-1/2 w-3 h-3 bg-purple rounded-full border-2 border-cream -translate-x-1/2 top-6 z-10" />
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-lilac-light/30 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          <img
            src={image}
            alt={title}
            className="w-full h-52 sm:h-60 object-cover rounded-xl mb-4 group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
          <p className="font-sans text-xs text-gold uppercase tracking-widest mb-1">
            {formattedDate}
          </p>

          <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-2">
            {title}
          </h3>

          <p className="font-sans text-sm text-warm-gray leading-relaxed max-w-xs mx-auto">
            {caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default TimelineCard;
