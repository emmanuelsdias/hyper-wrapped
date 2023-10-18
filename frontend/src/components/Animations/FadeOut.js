import React from 'react';
import { motion } from 'framer-motion'

function FadeOut({children, delay, duration = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay, duration: duration }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;