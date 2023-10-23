import React from 'react';

import FadeIn from './FadeIn'
import FadeOut from './FadeOut'

function FadeInAndOut({ children, delay = 0, waitBetween = 1, duration = 0.5, expand = false }) {
  // delay: delay before the animation starts
  // waitBetween: time of wait between FadeIn and FadeOut
  // duration: duration of the animations of fadeIn and fadeOut
  // expand: whether the animation should expand to the parent's width
  return (
    <FadeOut 
      delay={delay + duration + waitBetween} 
      duration={duration} 
      expand={expand} 
      children={
      <FadeIn 
        delay={delay} 
        duration={duration} 
        expand={expand} 
        children={
        children
      } />
    } />
  );
};

export default FadeInAndOut;