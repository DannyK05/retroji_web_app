import React from "react";
import type { TSnapzImage } from "../../store/types/snapz";

export type SnapzProps = {
  id: string;
  name: string;
  userId: number;
  date: Date;
  images: TSnapzImage[];
  caption: string;
  like_count: number;
  comment_count: number;
  isLiked: boolean;
  handleComments: (snapz_id: string) => void;
  handleLike: (snapz_id: string, e: React.FormEvent) => void;
};

export type CreateSnapzFormProps = {
  handleClose: () => void;
};
