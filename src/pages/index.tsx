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
    <div className="question bg-white">
      <button onClick={postQuestion}>Napisz 'działa'</button>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}
