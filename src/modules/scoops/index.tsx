import { Edit } from "lucide-react";
import Button from "../../components/common/button";
import ScoopCard from "./components/ScoopCard";
import { scoops } from "./data";
import { useState } from "react";
import Dialog from "../../components/common/dialog";
import CreateScoopsForm from "./components/CreateScoopsForm";

export default function Scoop() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleisDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl">Scoops</h1>
      <div className="w-full grid grid-cols-2 gap-x-4 py-2">
        <div className="w-full h-[calc(100vh-100px)] flex flex-col items-start space-y-4 pb-2 overflow-y-auto">
          {scoops.map(({ id, name, text, time, image }) => (
            <ScoopCard
              key={id}
              name={name}
              content={text}
              time={time}
              image={image}
            />
          ))}
        </div>
      </div>

      {isDialogOpen && (
        <Dialog handleClose={handleisDialogOpen} title="Post Scoops">
          <CreateScoopsForm />
        </Dialog>
      )}
      <Button
        onClick={handleisDialogOpen}
        className="w-auto absolute right-10 bottom-10"
      >
        <div className="flex items-center space-x-2 text-3xl">
          <Edit /> <p>Post Scoops</p>
        </div>
      </Button>
    </div>
  );
}
