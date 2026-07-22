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
      <div className="w-full max-w-sm">
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-lilac-light/30 mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-48 sm:h-56 object-cover rounded-xl mb-4 group-hover:scale-[1.02] transition-transform duration-300"
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
