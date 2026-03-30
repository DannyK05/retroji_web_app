export type SnapzProps = {
  id: string;
  name: string;
  date: Date;
  image: string;
  caption: string;
  like_count: number;
  comment_count: number;
  handleComments: (snapz_id: string) => void;
};
