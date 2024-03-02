const SingleCard = ({ style }: { style: React.CSSProperties }) => {
  return (
    <div
      style={style}
      className="w-[200px] h-[350px] xl:w-[240px] xl:h-[420px] bg-white rounded-lg shadow-lg p-6 text-center absolute"
    >
      <h1>Single Card</h1>
    </div>
  );
};

export default SingleCard;
