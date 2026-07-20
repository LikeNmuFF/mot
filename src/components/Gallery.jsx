import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gallery } from "../data/gallery";

function Gallery({ onBack }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setSelectedPhoto(gallery[index]);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigateLightbox = (direction) => {
    const newIndex = lightboxIndex + direction;
    if (newIndex >= 0 && newIndex < gallery.length) {
      setLightboxIndex(newIndex);
      setSelectedPhoto(gallery[newIndex]);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-cream/90 backdrop-blur-sm border-b border-lilac-light/30">
        <div className="flex items-center px-4 py-4 max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-warm-gray hover:text-charcoal transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-sans text-sm">Back</span>
          </button>
          <h1 className="flex-1 text-center font-serif text-xl text-charcoal pr-7">
            Our Gallery
          </h1>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {gallery.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-24 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <svg
              className="w-16 h-16 text-lilac"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
            </svg>
            <p className="font-serif text-lg text-warm-gray italic text-center">
              Your photos will appear here
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {gallery.map((photo, index) => (
              <motion.button
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut",
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
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation - Previous */}
            {lightboxIndex > 0 && (
              <button
                onClick={() => navigateLightbox(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Navigation - Next */}
            {lightboxIndex < gallery.length - 1 && (
              <button
                onClick={() => navigateLightbox(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Photo container */}
            <div className="relative max-w-4xl w-full mx-4 sm:mx-8">
              {/* Tulip-accented frame */}
              <div className="relative bg-cream rounded-2xl p-3 sm:p-4 shadow-2xl">
                {/* Tulip corners */}
                <div className="absolute -top-2 -left-2 w-8 h-8 text-lilac">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8 2 5 5 5 9c0 2 1 4 3 5v6c0 1 1 2 2 2h4c1 0 2-1 2-2v-6c2-1 3-3 3-5 0-4-3-7-7-7z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 text-lilac rotate-90">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8 2 5 5 5 9c0 2 1 4 3 5v6c0 1 1 2 2 2h4c1 0 2-1 2-2v-6c2-1 3-3 3-5 0-4-3-7-7-7z" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 text-lilac -rotate-90">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8 2 5 5 5 9c0 2 1 4 3 5v6c0 1 1 2 2 2h4c1 0 2-1 2-2v-6c2-1 3-3 3-5 0-4-3-7-7-7z" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 text-lilac rotate-180">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8 2 5 5 5 9c0 2 1 4 3 5v6c0 1 1 2 2 2h4c1 0 2-1 2-2v-6c2-1 3-3 3-5 0-4-3-7-7-7z" />
                  </svg>
                </div>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedPhoto.id}
                    src={selectedPhoto.src}
                    alt={selectedPhoto.caption}
                    className="w-full rounded-lg object-contain max-h-[70vh]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>

                <p className="text-center font-serif text-charcoal mt-3 text-sm sm:text-base italic">
                  {selectedPhoto.caption}
                </p>
              </div>

              {/* Photo counter */}
              <p className="text-center text-white/60 text-sm mt-4 font-sans">
                {lightboxIndex + 1} / {gallery.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Gallery;
