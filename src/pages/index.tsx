import Image from 'next/image';
import { Inter } from 'next/font/google';
import axios from 'axios';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [message, setMessage] = useState('');

  const postQuestion = () => {
    setMessage('...czekaj');

    axios({
      method: 'post',
      url: '/api/hello',
      data: {
        question: 'Czy praca ma sens ?',
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
    <div>
      <button onClick={postQuestion}>Czy praca ma sens?</button>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}
