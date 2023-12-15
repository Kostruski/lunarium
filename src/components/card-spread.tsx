import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import {
  CARD_BACKGROUND_COLOR,
  CARD_HEIGHT,
  CARD_WIDTH,
  NUMBER_OF_CARDS,
  flipCard,
  rotations,
  show3cards,
} from '../utils/card-utils';
import { Steps } from '../utils/types';
type CardSpreadProps = {
  drawnCards: string[];
  setStep: (step: Steps) => void;
  step: Steps;
  flippedCards: string[];
  setFlippedCards: React.Dispatch<React.SetStateAction<string[]>>;
};

const CardSpread = forwardRef<HTMLDivElement, CardSpreadProps>(
  ({ setStep, drawnCards, step, flippedCards, setFlippedCards }, ref) => {
    const clickHandler = useCallback(
      (id: string) => {
        setFlippedCards((cardCount) => [...cardCount, id]);

        flipCard(id, flippedCards.length + 1, drawnCards[flippedCards.length]);
      },
      [flippedCards],
    );

    useEffect(() => {
      if (ref && flippedCards.length === 3) {
        console.log(flippedCards);
        show3cards(flippedCards, ref, () => setStep('CARDS_CHOSEN'));
      }
    }, [flippedCards, ref]);

    const cardsClickable = step === 'CARDS_DEALT';

    return (
      <>
        {Array.from({ length: NUMBER_OF_CARDS }, (_, index) => {
          const id = `card-${index}`;

          return (
            <div
              key={index}
              id={id}
              role={cardsClickable ? 'button' : 'presentation'}
              onClick={cardsClickable ? () => clickHandler(id) : undefined}
              className="card"
              style={{
                width: CARD_WIDTH,
                position: 'absolute',
                height: CARD_HEIGHT,
                backgroundColor: CARD_BACKGROUND_COLOR,
                borderRadius: '8px',
                border: '1px solid black',
                left: '50%',
                top: '50%',
                transformOrigin: 'center center',
                transform: `translate(-50%, -50%) rotate(${rotations[index]}deg)`,
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
              }}
            />
          );
        })}
      </>
    );
  },
);

CardSpread.displayName = 'CardSpread';
export default CardSpread;
