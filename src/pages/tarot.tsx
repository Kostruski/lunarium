import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import CardSpread from '../components/card-spread';
import { drawRandomCards, spreadCards } from '../utils/card-utils';
import AskQuestion from '../components/ask-question';
import Answer from '../components/answer';
import useSendPrompt from '../utils/use-send-prompt';

const Tarot = () => {
  const [message, setMessage] = useState('');
  const [cardsClickable, setCardsClickable] = useState(false);
  const [questionPosted, setQuestionPosted] = useState(false);

  const cardsRef = useRef<HTMLDivElement | null>(null);
  const drawnCards = useRef<string[]>(drawRandomCards());

  const postQuestion = useSendPrompt({
    onSuccess: (msg) => {
      setMessage(msg);
    },
    onError: (msg) => setMessage(msg),
    drawnCards: drawnCards?.current?.join(','),
  });

  const handleSubmitQuestion = (question: string) => {
    if (!cardsClickable) {
      spreadCards(cardsRef, () => setCardsClickable(true));
      postQuestion(question);
      setQuestionPosted(true);
    }
  };

  const hideRight = (questionPosted && !message) || cardsClickable;

  useEffect(() => {
    if (hideRight) {
      gsap.to('#right', { duration: 1, x: '100%', ease: 'power2.inOut' });
    } else {
      gsap.to('#right', { duration: 1, x: '0%', ease: 'power2.inOut' });
    }
  }, [hideRight]);

  return (
    <div
      className="inline-flex w-screen h-screen overflow-hidden"
      ref={cardsRef}
    >
      <div className={`w-1/2 h-full relative`}>
        <CardSpread
          ref={cardsRef}
          setCardsClickable={setCardsClickable}
          drawnCards={drawnCards.current}
          cardsClickable={cardsClickable}
        />
      </div>

      <div
        className={`p-20 w-1/2 h-full flex flex-col justify-center items-center`}
        id={`right`}
      >
        {!message && <AskQuestion onSubmit={handleSubmitQuestion} />}
        {message && !cardsClickable && <Answer message={message} />}
      </div>
    </div>
  );
};

export default Tarot;
