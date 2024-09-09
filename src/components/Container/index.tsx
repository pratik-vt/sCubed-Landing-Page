import React, { useEffect, useRef, useState } from 'react';

import GoTop from '../ScrollUp';

import { ContainerStyle } from './style.css';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Container: React.FC<Props> = ({ children }) => {
  const refScrollUp = useRef<HTMLInputElement>(null);
  const [showGoTop, setShowGoTop] = useState(false);

  const handleScrollUp = () => {
    const isBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight &&
      screen?.width < 768;
    setShowGoTop(window.scrollY > 400 && !isBottom);
    console.log(screen.width, 'window.screenY');
  };

  const handleVisibleButton = () => {
    refScrollUp?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollUp);

    return () => window.removeEventListener('scroll', handleScrollUp);
  }, []);
  return (
    <>
      <div className={ContainerStyle} ref={refScrollUp}>
        {children}
      </div>
      <GoTop showGoTop={showGoTop} scrollUp={handleVisibleButton} />
    </>
  );
};

export default Container;
