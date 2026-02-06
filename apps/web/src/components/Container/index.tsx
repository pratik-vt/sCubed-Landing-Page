'use client';

import React, { useEffect, useState } from 'react';

import GoTop from '../ScrollUp';

import { ContainerStyle } from './style.css';
import './fonts.css';

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    // Define scroll handler inside useEffect to ensure it only runs on client
    const handleScrollUp = () => {
      if (typeof window === 'undefined') return;
      
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight &&
        screen?.width < 768;
      setShowGoTop(window.scrollY > 400 && !isBottom);
    };

    // Initial check
    handleScrollUp();

    window.addEventListener('scroll', handleScrollUp);
    return () => window.removeEventListener('scroll', handleScrollUp);
  }, []);

  const handleVisibleButton = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className={ContainerStyle}>{children}</div>
      <GoTop showGoTop={showGoTop} scrollUp={handleVisibleButton} />
    </>
  );
};

export default Container;
