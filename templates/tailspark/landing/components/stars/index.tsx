import StarIcon from "../../assets/imgs/star.svg";

export default function () {
  return (
    <div className="flex flex-row">
      {Array.from({ length: 5 }).map((_, i: number) => (
        <img
          key={`star-${crypto.randomUUID()}`} 
          src={StarIcon.src}
          alt="star"
          className="mr-1.5 inline-block w-4 flex-none"
        />
      ))}
    </div>
  );
}
