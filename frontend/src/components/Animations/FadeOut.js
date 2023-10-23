import React from 'react';
import { motion } from 'framer-motion'

function FadeOut({ children, delay = 0, duration = 0.5, expand = false }) {
  return (
    <motion.div
      style={expand ? { width: '100%' } : {}}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: delay, duration: duration }}
    >
      {children}
    </motion.div>
  );
};

export default FadeOut;