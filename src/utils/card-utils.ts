import gsap from 'gsap';
import { Ref } from 'react';

export const NUMBER_OF_CARDS = 10; // You can adjust the number of cards
export const CARD_WIDTH = 100;
export const CARD_HEIGHT = 160;
export const getRandomRotation = () => Math.random() * 360;

export const flipCard = (cardId: string, index: number) => {
  if (!cardId) return;

	const card = document.getElementById( cardId );

	const dist = 30;

  gsap.to(`#${cardId}`, {
    rotationY: '+=90',
    x: `+=${dist}`,
    y: `+=${dist}`,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.set(card, {
        zIndex: index,
        backgroundColor: '#fff',
        background: 'url(/fool.jpg) no-repeat center center / cover',
      });
    },
  });

  gsap.to(`#${cardId}`, {
    delay: 0.5,
    rotationY: '+=90',
    x: `-=${dist}`,
    y: `-=${dist}`,
    duration: 0.5,
    ease: 'power2.inOut',
  });
};

const slideCards = (cardsId: string[]) => {
  let firstCard: HTMLElement | null = null;
	let secondCard: HTMLElement | null = null;
	let thirdCard: HTMLElement | null = null;

  cardsId.forEach((id, index) => {
    if (index === 0) firstCard = document.getElementById(id);
		if ( index === 1 ) secondCard = document.getElementById( id );
		if (index === 2) thirdCard = document.getElementById(id);
  });

  const distanceX = CARD_HEIGHT * 0.9;
  const distanceY = CARD_WIDTH * 0.9;

  gsap
		.timeline( {
			delay: 0.5, onComplete: () => {
				console.log(firstCard, '....')
				gsap.set([firstCard, secondCard, thirdCard], {
          boxShadow: '0px 0px 30px 5px rgba(231,232,240,1)',
        });
		}})
    .to(firstCard, {
      x: `-=${distanceX}`,
      y: `+=${distanceY}`,
      duration: 1,
      ease: 'power2.inOut',
    })
    .to(
      secondCard,
      {
        x: `+=${distanceX}`,
        y: `+=${distanceY}`,
        duration: 1,
        ease: 'power2.inOut',
      },
      '-=1',
    ); // '-=1' makes the second animation start 1 second after the first
};

export const show3cards = (
  selectedCards: string[],
  ref: Ref<HTMLDivElement>,
) => {
  const container = typeof ref === 'function' ? null : ref?.current;
  if (!container) return;

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  gsap.to('.card', {
    x: (i, el) => {
      const middleX = containerWidth / 2 - el.offsetWidth / 2;

      return selectedCards.includes(el.id) ? middleX : containerWidth * 1.5;
    }, // Move to the middle or slide out
    y: (i, el) => {
      const middleY = containerHeight / 2 - el.offsetHeight / 2;
      return selectedCards.includes(el.id) ? middleY : containerWidth * 1.5;
    },
    rotation: (i, el) => {
      return selectedCards.includes(el.id) ? 0 : 720;
    }, // Rotate if not selected
    opacity: (i, el) => {
      return selectedCards.includes(el.id) ? 1 : 0;
    }, // Fade out if not selected
    duration: 2,
    ease: 'power2.inOut',
    onComplete: () => slideCards(selectedCards),
  });
};
