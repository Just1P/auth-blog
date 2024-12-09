import { PostType } from "../types/post.type";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getPosts = async (): Promise<PostType[]> => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const createPost = async (post: { title: string; content: string }) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};
