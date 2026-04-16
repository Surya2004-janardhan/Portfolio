import React from "react";
import { motion } from "framer-motion";
import "../styles/Testimonials.css";

const testimonials = [
  { id: 1, image: "https://via.placeholder.com/300x300?text=Testimonial+1" },
  { id: 2, image: "https://via.placeholder.com/300x300?text=Testimonial+2" },
  { id: 3, image: "https://via.placeholder.com/300x300?text=Testimonial+3" },
  { id: 4, image: "https://via.placeholder.com/300x300?text=Testimonial+4" },
  { id: 5, image: "https://via.placeholder.com/300x300?text=Testimonial+5" },
];

const containerVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.6 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <motion.div
        className="testimonials-container"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="testimonials-title">
          CLIENT <span>TESTIMONIALS</span>
        </h2>

        <div className="testimonials-grid">
          {testimonials.map(({ id, image }) => (
            <motion.div
              key={id}
              className="testimonial-card"
              variants={itemVariant}
            >
              <img src={image} alt={`Testimonial ${id}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
