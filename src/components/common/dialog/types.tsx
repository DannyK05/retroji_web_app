export type DialogProps = {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  handleClose: () => void;
};
