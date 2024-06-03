import React from 'react';

const Button = ({ backgroundColor, size, onClick, margin, children }) => {
  const styles = {
    backgroundColor: backgroundColor || 'black', 
    padding: size === 'large' ? '8px 32px' : size === 'small' ? '8px 16px' : '12px 24px',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
    fontSize: size === 'large' ? '16px' : size === 'small' ? '12px' : '14px',
    margin: margin || '0',
  };

  return (
    <button style={styles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;