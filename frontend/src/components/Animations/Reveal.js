import React from 'react';
import { motion } from 'framer-motion'

function Reveal({ children, delay = 0, length = 10, duration = 0.3, direction = 'up', expand = false }) {
  return (
    <motion.div
      style={expand ? { width: '100%' } : {}}
      initial={{ 
        opacity: 0, 
        x: direction === 'left' 
            ? length 
            : direction === 'right' 
              ? -length 
              : 0,
        y: direction === 'up' 
            ? length 
            : direction === 'down' 
              ? -length 
              : 0
      }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: delay, duration: duration }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;