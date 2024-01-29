import { useEffect, useRef, useState } from "react";
import "./useFade.css";

/**
 * Use to Fade-In or Fade-Out on Mount or Un-mount
 * @param {Any} initialValue Initial value of the toggle state
 * @param {*} duration Fade Out / Fade In Duration
 * @returns [state, setState, fadeOutProps]
 */
const useFade = (initialValue, duration = 500) => {
  const [show, setShow] = useState(initialValue);

  // isVisible is exposed to the component (toggled after animation)
  const [isVisible, setVisible] = useState(show);
  const ref = useRef(null);
  // Update visibility when show changes
  useEffect(() => {
    if (show) setVisible(true);
    else
      ref.current = setTimeout(() => {
        setVisible(false);
      }, duration - 25);
    return () => clearTimeout(ref.current);
  }, [show]);

  // These props go on the fading DOM element
  let fromProps = {
    style: { animation: `${show ? "fadeIn" : "fadeOut"} ${duration}ms` }
    // onAnimationEnd: () => !show && setVisible(false)
  };
  
  return [isVisible, setShow, fromProps];
};

export default useFade;
