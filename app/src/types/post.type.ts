export type PostDTO = {
  title: string;
  content: string;
  imagePath?: string | null;
  created_at?: string;
  creator_name?: string;
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  imagePath?: string | null;
  created_at?: string;
  creator_name?: string;
};
