import Image from 'next/image';
import { Inter } from 'next/font/google';
import axios from 'axios';
import { useRef, useState } from 'react';
import CardSpread from '../components/card-spread';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="flex w-screen  justify-center h-screen items-center">
      <Link href={'./tarot'} className={'w-[200px] h-[100px]'}>
        <div className="text-white">Tarot</div>
      </Link>
    </div>
  );
}
