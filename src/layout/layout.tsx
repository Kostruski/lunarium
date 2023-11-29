import React, { useEffect } from 'react';
import { createStars, updateStarAppearance } from '../utils/render-stars';

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    createStars(); // Create stars on the client side
    document.addEventListener('mousemove', updateStarAppearance); // Add event listener on the client side

    return () => {
      // Clean up the event listener when the component is unmounted
      document.removeEventListener('mousemove', updateStarAppearance);
    };
  }, []);
  return (
    <>
      <div className="background absolute">
        <div
          id="container"
          className="h-[200vh] w-screen top-0 left-0 absolute"
        ></div>
      </div>
      {children}
    </>
  );
};

export default Layout;
