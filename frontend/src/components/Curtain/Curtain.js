import React, { useState, useEffect } from 'react';

const Curtain = ({ isOpen }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 2000);
    }
  }, [isOpen]);

  return (
    <div className={`curtain ${isActive ? 'active' : ''}`}></div>
  );
};

export default Curtain;
