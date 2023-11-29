import React, {
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import gsap from 'gsap';
import { CARD_HEIGHT, CARD_WIDTH, NUMBER_OF_CARDS, flipCard, getRandomRotation, show3cards } from '../utils/card-utils';



const CardSpread = forwardRef<HTMLDivElement>((props, ref) => {
  const [visibleCards, setVisibleCards] = useState<string[]>([]);

  const spreadCards = useCallback(() => {
    const container = typeof ref === 'function' ? null : ref?.current;
    if (!container) return;

    gsap.to('.card', {
      x: (index) => Math.random() * (container.offsetWidth - CARD_WIDTH),
      y: (index) => Math.random() * (container.offsetHeight - CARD_HEIGHT),
			rotation: () => getRandomRotation(),
			opacity: 1,
      duration: 1,
      stagger: 0.1,
    });
  }, [ref]);

  const clickHandler = useCallback((id: string) => {
    setVisibleCards((cardCount) => [...cardCount, id]);
    flipCard(id, visibleCards.length + 1);
  }, []);

  useEffect(() => {
    spreadCards(); // Initial spread
    window.addEventListener('resize', spreadCards);

    return () => {
      window.removeEventListener('resize', spreadCards);
    };
  }, []);

  useEffect(() => {
    if (ref && visibleCards.length === 3) {
      show3cards(visibleCards, ref);
    }
  }, [visibleCards, ref]);

  return (
    <>
      {Array.from({ length: NUMBER_OF_CARDS }, (_, index) => {
        const id = `card-${index}`;

        return (
          <div
            key={index}
            id={id}
            role={visibleCards.length >= 3 ? 'presentation' : 'button'}
            onClick={
              visibleCards.length >= 3 ? undefined : () => clickHandler(id)
            }
            className="card"
            style={{
              width: CARD_WIDTH,
							position: 'absolute',
							opacity: 0,
              height: CARD_HEIGHT,
              backgroundColor: '#3498db',
              borderRadius: '8px',
              border: '1px solid black',
            }}
          />
        );
      })}
    </>
  );
});

CardSpread.displayName = 'CardSpread';
export default CardSpread;
