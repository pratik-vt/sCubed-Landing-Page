// Button.tsx
import React from 'react';

interface ButtonProps {
  color?: string;
  backgroundColor?: string;
  height?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
  cursor?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  color = '#fff',
  backgroundColor = '#7a7eed',
  height = '50px',
  width = '180px',
  border = 'none',
  borderRadius = '10px',
  cursor = 'pointer',
  onClick,
  children,
  className = '',
  style = {},
}) => {
  const combinedStyles: React.CSSProperties = {
    color,
    backgroundColor,
    height,
    width,
    border,
    borderRadius,
    cursor,
    ...style,
  };

  return (
    <button
      onClick={onClick}
      style={combinedStyles}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
