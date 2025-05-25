import { scoops } from "./data";

export default function Scoop() {
  return (
    <div className="w-full">
      <h1 className="text-4xl">Scoops</h1>
      <div className="w-full flex flex-col h-[calc(100vh-80px)] pb-2 items-center space-y-4 overflow-y-scroll">
        {scoops.map(({ id, name, text, time }) => (
          <div
            className="flex w-full flex-col items-start space-y-1 text-3xl"
            key={id}
          >
            <div className="flex w-full items-center justify-between">
              <p>{name}</p>
              <span>{time}</span>
            </div>
            <div>{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
