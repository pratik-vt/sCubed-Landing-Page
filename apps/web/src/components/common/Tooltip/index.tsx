'use client';

import { Info } from 'lucide-react';
import { ReactNode, useState } from 'react';

import * as styles from './styles.css';

interface TooltipProps {
  content: string | ReactNode;
  children?: ReactNode;
}

/**
 * Tooltip Component
 * Simple, accessible tooltip with hover behavior
 */
export default function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={styles.tooltipWrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children || <Info size={16} className={styles.tooltipIcon} />}
      {isVisible && (
        <div className={styles.tooltipContent} role="tooltip">
          <div className={styles.tooltipArrow} />
          {content}
        </div>
      )}
    </div>
  );
}

