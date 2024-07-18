"use client"
import { useState, useEffect } from 'react';

const MobileUserAlert = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this value as needed
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isMobile) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '10px',
      textAlign: 'center',
      zIndex: 1000
    }}>
      This site is optimized for desktop viewing. For the best experience, please visit on a larger screen.
    </div>
  );
};

export default MobileUserAlert;