import { Inter } from 'next/font/google';
import Link from 'next/link';
import StarIcon from '../../public/star.svg';
import SingleCard from '../components/single-card/single-card';
import SquaresIcon from '../../public/squares.svg';
import { useRouter } from 'next/router';
import getBreakPoint from '../utils/get-break-point';

const getCardsStyles = (isBiggerScreen: boolean): React.CSSProperties[] => {
  return [
    {
      top: isBiggerScreen ? '-1px' : '-1px',
      left: '-1%',
      transform: 'rotate(5deg)',
    },
    {
      top: isBiggerScreen ? '660px' : '280px',
      left: '8%',
      transform: 'rotate(12deg)',
    },
    {
      top: isBiggerScreen ? '180px' : '90px',
      left: '3%',
      transform: 'rotate(-10deg)',
    },
    {
      top: isBiggerScreen ? '860px' : '430px',
      left: '2%',
      transform: 'rotate(15deg)',
    },
  ];
};

export default function Home() {
  const router = useRouter();
  const isBiggerScreen = ['xl', '2xl'].includes(getBreakPoint());

  return (
    <div>
      <div className={`relative`}>
        {getCardsStyles(isBiggerScreen).map((style, index) => (
          <span key={index} className="hidden sm:block">
            <SingleCard style={style} />
          </span>
        ))}
        <div
          className={`w-screen flex justify-center items-center mt-20 xl:mt-40 relative`}
        >
          <StarIcon className="w-[330px] xl:w-[660px]" />
          <SingleCard onClick={() => router.push('./tarot')} />
        </div>
      </div>
      <div className="w-screen flex justify-center">
        <SquaresIcon className="w-[120px] xl:w-[240px] py-40 xl:py-80" />
      </div>
      <div
        className={`w-screen flex justify-center items-center mt-20 xl:mt-40 relative`}
        onClick={() => router.push('./tarot')}
      >
        <StarIcon className="w-[330px] xl:w-[660px]" />
        <SingleCard
          style={{ transform: 'rotate(-15deg)' }}
          className="origin-bottom"
        />
        <SingleCard
          style={{ transform: 'rotate(15deg)' }}
          className="origin-bottom"
        />
        <SingleCard />
      </div>
      <div className="w-screen flex justify-center">
        <SquaresIcon className="w-[120px] xl:w-[240px] py-40 xl:py-80" />
      </div>
    </div>
  );
}
