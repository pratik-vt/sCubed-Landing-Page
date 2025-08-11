import { useState, useEffect } from 'react';

interface WindowDimensions {
  width: number;
}

function getWindowDimensions(): WindowDimensions {
  let width = 0;
  if (typeof window !== 'undefined') {
    width = window.innerWidth;
  }
  return {
    width,
  };
}

const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0 });

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
