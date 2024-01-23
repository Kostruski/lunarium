import React, { useEffect, useState, useRef } from 'react';

type TypewriterProps = {
  text: string;
  delay: number;
  onComplete?: () => void;
};

const Typewriter = ({ text, delay, onComplete }: TypewriterProps) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        scrollRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      onComplete && onComplete();
    }
  }, [currentIndex, delay, onComplete, text]);

  return (
    <div>
      {currentText}
      <div ref={scrollRef}>{'\n'}</div>
    </div>
  );
};

export default Typewriter;
