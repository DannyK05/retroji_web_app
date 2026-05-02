export type DialogProps = {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  handleClose: () => void;
};
