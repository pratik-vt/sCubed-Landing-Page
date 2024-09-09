import React, { FC, MouseEventHandler } from 'react';

import { arrow, btnScrollToTop } from './styles.css';

const GoTop: FC<{ showGoTop: boolean; scrollUp: MouseEventHandler }> = ({
  showGoTop,
  scrollUp,
}) => {
  return (
    <>
      {showGoTop ? (
        <div className={showGoTop ? '' : ''} onClick={scrollUp}>
          <button className={btnScrollToTop}>
            <i className={arrow}></i>
          </button>
        </div>
      ) : null}
    </>
  );
};
export default GoTop;
