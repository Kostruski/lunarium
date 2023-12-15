import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type BannerProps = {
  show: boolean;
  onHide?: () => void;
  message: string;
};

const Banner = ({ show, onHide, message }: BannerProps) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    if (show) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
      );
    } else {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.5,
          onCompleted: () => {
            onHide && onHide();
          },
        },
      );
    }
  }, [show]);

  return show ? (
    <div
      ref={bannerRef}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-5"
    >
      {message}
    </div>
  ) : null;
};

export default Banner;
