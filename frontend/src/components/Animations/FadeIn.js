import React from 'react';
import { motion } from 'framer-motion'

function FadeIn({ children, delay = 0, duration = 0.5, expand = false}) {
  return (
    <motion.div
      style={expand ? { width: '100%' } : {}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay, duration: duration }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;