// Description: Used to test window size for responsive design

import React, { useState, useEffect } from "react";
export default function Responsive() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {  
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
    
  function isMobile() {
    return width <= 768;
  }

  function isTablet() {
    return width > 768 && width <= 1024;

  }

  function isDesktop() {
    return width > 1024;
  }

  return { isMobile, isTablet, isDesktop };
}