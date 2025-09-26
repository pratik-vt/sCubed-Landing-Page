'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  mobileDropdownContainer,
  mobileDropdownTrigger,
  mobileDropdownContent,
  mobileDropdownItem,
  mobileChevronIcon,
  mobileActiveStyle,
} from './styles.css';

export interface DropdownItem {
  label: string;
  href: string;
}

interface MobileNavDropdownProps {
  label: string;
  items: DropdownItem[];
  menuItemColor?: string;
  activeMenuItemColor?: string;
  activeLinkAccentColor?: string;
}

const MobileNavDropdown: React.FC<MobileNavDropdownProps> = ({
  label,
  items,
  menuItemColor = '#474747',
  activeMenuItemColor = '#000',
  activeLinkAccentColor = '#7a7eed',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = items.some(
    (item) => pathname === item.href || pathname === `${item.href}/`,
  );

  return (
    <div className={mobileDropdownContainer}>
      <div
        className={`${mobileDropdownTrigger} ${isActive ? mobileActiveStyle : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          color: isActive ? activeMenuItemColor : menuItemColor,
        }}
      >
        {label}
        <motion.div
          className={mobileChevronIcon}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={mobileDropdownContent}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={mobileDropdownItem}
                style={{
                  color:
                    pathname === item.href || pathname === `${item.href}/`
                      ? activeLinkAccentColor
                      : menuItemColor,
                }}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavDropdown;