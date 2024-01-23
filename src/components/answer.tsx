import React, { useState, useEffect } from 'react';
import Typewriter from './typewriter';

interface AnswerProps {
  message: string;
  onComplete?: () => void;
}

const PRINT_DELAY = 50;

const Answer: React.FC<AnswerProps> = ({ message, onComplete }) => {
  console.log('Answer', message);

  return (
    <div className={`w-full text-white p-5`}>
      <p
        className={`overflow-hidden p-5 rounded bg-black bg-opacity-75 max-h-[70vh]`}
      >
        <Typewriter
          text={message}
          delay={PRINT_DELAY}
          onComplete={onComplete}
        />
      </p>
    </div>
  );
};

export default Answer;
