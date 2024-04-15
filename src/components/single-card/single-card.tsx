const SingleCard = ({
  style,
  onClick,
  className,
}: {
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      style={style ?? {}}
      className={`w-[125px] h-[219px] xl:w-[250px] xl:h-[438px] bg-white rounded-lg shadow-lg p-6 text-center absolute ${className}`}
      onClick={onClick}
    >
      <h1>Single Card</h1>
    </div>
  );
};

export default SingleCard;
