import React from 'react';
import { motion } from 'framer-motion'

function SwipeUp({children, delay = 0, duration = 0.3, expand = false }) {
  return (
    <motion.div
      style={expand ? { width: '100%' } : {}}
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ delay: delay, duration: duration }}
    >
      {children}
    </motion.div>
  );
};

export default SwipeUp;