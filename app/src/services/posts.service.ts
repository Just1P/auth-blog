import { PostType, PostDTO } from "../types/post.type";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getPosts = async (): Promise<PostType[]> => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const getPostById = async (id: number): Promise<PostType> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
};

export const createPost = async (post: PostDTO) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("User is not authenticated. Token missing.");
  }

  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData?.message || "Failed to create post. Please try again."
    );
  }

  return response.json();
};

export const updatePost = async (
  id: number,
  post: PostDTO
): Promise<PostDTO> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("User is not authenticated. Token missing.");
  }

  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData?.error || "Failed to update post. Please try again."
    );
  }

  return response.json();
};

export const deletePost = async (id: number): Promise<{ message: string }> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("User is not authenticated. Token missing.");
  }

  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData?.error || "Failed to delete post. Please try again."
    );
  }

  return response.json();
};

export const getPostsByUser = async (): Promise<PostType[]> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("User is not authenticated. Token missing.");
  }

  const response = await fetch(`${API_BASE_URL}/posts/user-posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData?.error || "Failed to fetch user's posts. Please try again."
    );
  }

  return response.json();
};
