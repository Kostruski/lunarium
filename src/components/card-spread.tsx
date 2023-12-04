import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  NUMBER_OF_CARDS,
  flipCard,
  show3cards,
} from '../utils/card-utils';
type CardSpreadProps = {
  setCardsClickable: (v: boolean) => void;
  drawnCards: string[];
  cardsClickable: boolean;
};

const getAngle = () => Math.floor(Math.random() * 5);
const getRotation = () => {
  const angle = getAngle();
  return Math.random() > 0.5 ? angle : -1 * angle;
};
const rotations = Array.from({ length: NUMBER_OF_CARDS }, (_, index) =>
  getRotation(),
);

const CardSpread = forwardRef<HTMLDivElement, CardSpreadProps>(
  ({ setCardsClickable, drawnCards, cardsClickable }, ref) => {
    const [flippedCards, setFlippedCards] = useState<string[]>([]);

    const clickHandler = useCallback(
      (id: string) => {
        setFlippedCards((cardCount) => [...cardCount, id]);

        flipCard(id, flippedCards.length + 1, drawnCards[flippedCards.length]);
      },
      [flippedCards],
    );

    useEffect(() => {
      if (ref && flippedCards.length === 3) {
        show3cards(flippedCards, ref, () => setCardsClickable(false));
      }
    }, [flippedCards, ref]);

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
                backgroundColor: '#3498db',
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
