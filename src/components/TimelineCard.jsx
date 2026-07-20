import { motion } from "framer-motion";

function TimelineCard({ date, title, caption, image, index }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      className="flex flex-col items-center text-center px-4 sm:px-0"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      <div className="w-full max-w-sm">
        <div className="rounded-2xl overflow-hidden shadow-lg shadow-lilac/20 mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-48 sm:h-56 object-cover"
            loading="lazy"
          />
        </div>

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
    </motion.div>
  );
}

export default TimelineCard;
