import { scoops } from "./data";

export default function Snapz() {
  return (
    <div>
      <h1 className="text-4xl">Snapz</h1>
      <div className="w-full flex flex-col h-[calc(100vh-80px)] pb-2 items-center space-y-4 overflow-y-auto">
        {scoops.map(({ name, date, image, caption }) => (
          <div className="flex w-auto flex-col items-start border ">
            <div className="w-full flex items-center text-2xl bg-[var(--retro-blue)] text-white justify-between p-2">
              <p>{name}</p>
              <span>{date}</span>
            </div>
            <div className="px-2">
              <img src={image} width={340} alt="Scoop pic" />
            </div>
            <p className="p-1 text-2xl">{caption}</p>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
