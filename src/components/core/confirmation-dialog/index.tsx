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
      className="w-80 lg:h-50"
      title={message}
    >
      <div className="w-full flex flex-col items-center">
        <p className="text-red-500 text-2xl">
          {"[This action is irreversible]"}
        </p>

        <div className="flex items-center space-x-4 py-5 lg:space-x-8">
          <Button className="w-30 lg:w-40" onClick={handleClose}>
            No
          </Button>
          <Button
            isLoading={isLoading}
            className="w-30 lg:w-40 lg:hover:bg-red-500"
            onClick={() => {
              handleAction();
              handleClose();
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
