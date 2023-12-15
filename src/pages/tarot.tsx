import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import CardSpread from '../components/card-spread';
import { drawRandomCards, spreadCards, stackCards } from '../utils/card-utils';
import AskQuestion from '../components/ask-question';
import Answer from '../components/answer';
import useSendPrompt from '../utils/use-send-prompt';
import Banner from '../components/banner';
import { Steps } from '../utils/types';

const Tarot = () => {
  const [message, setMessage] = useState('');
  const [step, setStep] = useState<Steps>('START');

  const cardsRef = useRef<HTMLDivElement | null>(null);
  const drawnCards = useRef<string[]>(drawRandomCards());
  const [flippedCards, setFlippedCards] = useState<string[]>([]);

  const postQuestion = useSendPrompt({
    onSuccess: (msg) => {
      setMessage(msg);
    },
    onError: (msg) => {
      setMessage(msg);
      setStep('START');
    },
    drawnCards: drawnCards?.current?.join(','),
  });

  const handleSubmitQuestion = (question: string) => {
    if (step === 'START') {
      spreadCards(cardsRef, () => setStep('CARDS_DEALT'));
      postQuestion(question);
      setStep('QUESTION_ASKED');
    }
  };

  const hideRight = step === 'CARDS_DEALT' || step === 'CARDS_CHOSEN';

  useEffect(() => {
    if (hideRight) {
      gsap.to('#right', { duration: 1, x: '100%', ease: 'power2.inOut' });
    } else {
      gsap.to('#right', { duration: 1, x: '0%', ease: 'power2.inOut' });
    }
  }, [hideRight]);

  useEffect(() => {
    if (step === 'CARDS_CHOSEN' && message) {
      setStep('ANSWER_GIVING');
    }
  }, [message, step]);

  console.log('step', step);

  return (
    <div
      className="inline-flex w-screen h-screen overflow-hidden"
      ref={cardsRef}
    >
      <div className={`w-1/2 h-full relative`}>
        <CardSpread
          ref={cardsRef}
          setStep={setStep}
          step={step}
          drawnCards={drawnCards.current}
          flippedCards={flippedCards}
          setFlippedCards={setFlippedCards}
        />
        <Banner show={step === 'QUESTION_ASKED'} message="Wybierz 3 karty" />
      </div>

      <div
        className={`p-20 w-1/2 h-full flex flex-col justify-center items-center`}
        id={`right`}
      >
        {step === 'START' && <AskQuestion onSubmit={handleSubmitQuestion} />}
        {(step === 'ANSWER_GIVING' || step === 'ANSWER_GIVEN') && (
          <Answer
            message={message}
            onComplete={() => setStep('ANSWER_GIVEN')}
          />
        )}
        {step === 'ANSWER_GIVEN' && (
          <button
            type="submit"
            className="bg-white text-black p-2 rounded mt-5"
            onClick={() => {
              setStep('START');
              stackCards(flippedCards);
            }}
          >
            Zadaj kolejne pytanie
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarot;
