export type PostDTO = {
  title: string;
  content: string;
  imagePath?: string | null;
  createdAt: string;
  creator_name: string;
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  imagePath?: string | null;
  createdAt: string;
  creator_name: string;
};
