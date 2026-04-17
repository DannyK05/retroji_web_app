export type SideContainerProps = {
  title: string;
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
  handleClose: () => void;
};
