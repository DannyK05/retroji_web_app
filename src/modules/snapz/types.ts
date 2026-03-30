export type SnapzProps = {
  name: string;
  date: Date;
  image: string;
  caption: string;
  like_count: number;
  comment_count: number;
  handleComments: () => void;
};
