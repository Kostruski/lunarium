import axios from 'axios';
import React, { useRef, useState } from 'react';
import CardSpread from '../components/card-spread';

const Tarot = () => {
  const [message, setMessage] = useState('');
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const postQuestion = () => {
    setMessage('...czekaj');

    axios({
      method: 'post',
      url: '/api/hello',
      data: {
        question: 'Napisz "działa"',
      },
    })
      .then((res) => {
        const msg = res?.data.answer;

        setMessage(msg);
      })
      .catch((e) => {
        console.warn(e);
        setMessage('Bład');
      });
  };

  return (
    <div className="inline-flex w-screen ">
      <div className="w-1/2 h-screen" ref={cardsRef}>
        <CardSpread ref={cardsRef} />
      </div>
      <div className="question text-white relative w-1/2 h-screen flex justify-center items-center">
        <button onClick={postQuestion}>Napisz działa</button>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Tarot;
