import React from 'react';
import { motion } from 'framer-motion'

function Reveal({children, delay = 0, duration = 0.3, expand = false }) {
  return (
    <motion.div
      style={expand ? { width: '100%' } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: duration }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;