import { Inter } from 'next/font/google';
import Link from 'next/link';
import StarIcon from '../../public/star.svg';
import SingleCard from '../components/single-card/single-card';

const inter = Inter({ subsets: ['latin'] });

const card = <div className="w-1/4 h-1/2 bg-white rounded-lg shadow-lg" />;

const cards: React.CSSProperties[] = [
  { top: '5px', left: '5px', transform: 'rotate(30)' },
];

export default function Home() {
  return (
    <div>
      <div className="relative">
        {cards.map((style, index) => (
          <SingleCard style={style} key={index} />
        ))}
        <div className="w-screen flex justify-center pt-8 relative">
          <StarIcon className="w-[520px] xl:w-[630px]" />
          <div className="flex justify-center items-center absolute h-full">
            <Link href={'./tarot'}>
              <div className="text-white">Tarot</div>
            </Link>
          </div>
        </div>
        <h1 className="pt-96">Dupa</h1>
      </div>
    </div>
  );
}
