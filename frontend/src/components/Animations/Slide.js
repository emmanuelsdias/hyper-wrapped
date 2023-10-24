import React from 'react';
import { motion } from 'framer-motion'

function Slide({children, delay = 0, length = 10, duration = 0.3, direction = 'up', expand = false }) {
  return (
    <motion.div
      style={expand ? { width: '100%' } : {}}
      initial={{ 
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
      animate={{ x: 0, y: 0 }}
      transition={{ delay: delay, duration: duration, ease: [0.68, 0, 0.27, 1.3] }}
      overflow='hidden'
    >
      {children}
    </motion.div>
  );
};

export default Slide;