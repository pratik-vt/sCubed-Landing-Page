'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  dropdownContainer,
  dropdownMenu,
  dropdownMenuItem,
  dropdownTrigger,
  dropdownTriggerActive,
  chevronIcon,
  activeLinkUnderline,
} from './styles.css';

export interface DropdownItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  menuItemColor?: string;
  activeMenuItemColor?: string;
  activeLinkAccentColor?: string;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  label,
  items,
  menuItemColor = '#474747',
  activeMenuItemColor = '#000',
  activeLinkAccentColor = '#7a7eed',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = items.some((item) => {
    const itemPath = item.href.split('#')[0];
    const currentPath = pathname.split('#')[0];
    return currentPath === itemPath || currentPath === `${itemPath}/`;
  });

  return (
    <div
      className={dropdownContainer}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={`${dropdownTrigger} ${isActive ? dropdownTriggerActive : ''}`}
        style={{
          color: isActive ? activeMenuItemColor : menuItemColor,
        }}
      >
        {label}
        <motion.div
          className={chevronIcon}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
        {isActive && (
          <span
            className={activeLinkUnderline}
            style={{ backgroundColor: activeLinkAccentColor }}
          />
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={dropdownMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item) => (
              <Link key={item.href} href={item.href} className={dropdownMenuItem}>
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;