import { Loader } from "lucide-react";
import Button from "../../common/button";
import Dialog from "../../common/dialog";

type ConfirmationDialogProps = {
  message?: string;
  isOpen: boolean;
  isLoading: boolean;
  handleClose: () => void;
  handleAction: () => void;
};

export default function ConfirmationDialog({
  message = "Please confirm this Action",
  isOpen,
  isLoading,
  handleClose,
  handleAction,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      handleClose={handleClose}
      className="max-h-40 w-80"
      title={message + "\n (This action is irreversible)"}
    >
      <div className="flex items-center space-x-8 py-5">
        <Button className="w-40" onClick={handleClose}>
          No
        </Button>
        <Button
          className="w-40 lg:hover:bg-red-500"
          onClick={() => {
            handleAction();
            handleClose();
          }}
        >
          {isLoading ? <Loader /> : "Yes"}
        </Button>
      </div>
    </Dialog>
  );
}
