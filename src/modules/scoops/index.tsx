import { scoops } from "./data";

export default function Scoop() {
  return (
    <div className="w-full">
      <h1 className="text-4xl">Scoops</h1>
      <div className="w-full flex flex-col h-[calc(100vh-80px)] pb-2 items-center space-y-4 overflow-y-auto">
        {scoops.map(({ id, name, text, time, image }) => (
          <div
            className="flex items-center space-x-4 w-1/2 p-1 text-3xl"
            key={id}
          >
            <img
              className="rounded-full border border-dashed"
              src={image}
              height={80}
              width={50}
              alt={`${name} profile picture`}
            />
            <hr className="border w-10 border-dashed" />
            <div className="flex w-full flex-col items-start border space-y-1 p-1">
              <div className="flex w-full items-center justify-between">
                <p>{name}</p>
                <span>{time}</span>
              </div>
              <div>{text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
