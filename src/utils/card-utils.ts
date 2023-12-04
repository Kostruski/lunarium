import gsap from 'gsap';
import { Ref } from 'react';
import tarotCards from './all-cards';

export const NUMBER_OF_CARDS = 20; // You can adjust the number of cards
export const CARD_WIDTH = 100;
export const CARD_HEIGHT = 160;
export const getRandomRotation = () => Math.random() * 360;

export const flipCard = (
  cardId: string,
  index: number,
  backgroundUrl = '/fool.jpg',
) => {
  if (!cardId) return;

  const card = document.getElementById(cardId);

  const dist = 30;

  console.log(backgroundUrl);

  gsap.to(card, {
    rotationY: '+=90',
    x: `+=${dist}`,
    y: `+=${dist}`,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.set(card, {
        zIndex: index,
        backgroundColor: '#fff',
        // background: `url(${backgroundUrl}) no-repeat center center / cover`,
      });

      if (card) card.textContent = backgroundUrl;
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

const slideCards = (
  cardsId: string[],
  callback: () => void,
  offset: number,
) => {
  let firstCard: HTMLElement | null = null;
  let secondCard: HTMLElement | null = null;
  let thirdCard: HTMLElement | null = null;

  cardsId.forEach((id, index) => {
    if (index === 0) firstCard = document.getElementById(id);
    if (index === 1) secondCard = document.getElementById(id);
    if (index === 2) thirdCard = document.getElementById(id);
  });

  const distanceX = CARD_HEIGHT * 0.9;
  const distanceY = CARD_WIDTH * 0.9;

  gsap
    .timeline({
      delay: 0.5,
      onComplete: () => {
        gsap.set([firstCard, secondCard, thirdCard], {
          boxShadow: '0px 0px 30px 5px rgba(231,232,240,1)',
        });
        callback();
      },
    })
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
  callback: () => void,
) => {
  const container = typeof ref === 'function' ? null : ref?.current;
  if (!container) return;

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  console.log(containerHeight, containerWidth);

  gsap.to('.card', {
    x: (i, el) => {
      return selectedCards.includes(el.id) ? 0 : containerWidth * 1.5;
    }, // Move to the middle or slide out
    y: (i, el) => {
      return selectedCards.includes(el.id) ? 0 : containerWidth * 1.5;
    },
    rotation: (i, el) => {
      return selectedCards.includes(el.id) ? 0 : 720;
    }, // Rotate if not selected
    opacity: (i, el) => {
      return selectedCards.includes(el.id) ? 1 : 0;
    }, // Fade out if not selected
    duration: 2,
    ease: 'power2.inOut',
    onComplete: () => slideCards(selectedCards, callback, containerWidth / 2),
  });
};

const getRandomPositionY = (containerSize: number, cardSize: number) => {
  const modifier = Math.random() > 0.5 ? -1 : 1;
  const offset = Math.random() * (containerSize / 2 - cardSize);
  return modifier > 0 ? `+=${offset}` : `-=${offset}`;
};

const getRandomPositionX = (containerSize: number, cardSize: number) => {
  const modifier = Math.random() > 0.5 ? -1 : 1;
  const offset = Math.random() * (containerSize / 2 - cardSize);
  return modifier > 0
    ? `+=${Math.random() * (containerSize * 0.75 - cardSize)}`
    : `-=${Math.random() * (containerSize * 0.25 - cardSize)}`;
};

export const spreadCards = (ref: Ref<HTMLDivElement>, callback: () => void) => {
  const container = typeof ref === 'function' ? null : ref?.current;
	if ( !container ) return;


  gsap.to('.card', {
    x: () => getRandomPositionX(container.offsetWidth, CARD_WIDTH),
    y: () => getRandomPositionY(container.offsetHeight, CARD_HEIGHT),
    rotation: () => getRandomRotation(),
    transformOrigin: '50% 50%',
    duration: 1,
    stagger: 0.4,
    onComplete: callback,
  });
};

export const drawRandomCards = (numberOfCards = 3) => {
  const randomCards: string[] = [];

  while (randomCards.length < numberOfCards) {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const randomCard = `${Math.random() > 0.5 ? 'odwrócona ' : ''}${
      tarotCards[randomIndex]
    }`;

    if (!randomCards.includes(randomCard)) {
      randomCards.push(randomCard);
    }
  }

  return randomCards;
};
