import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/posts.service";
import { PostDTO } from "../types/post.type";
import LogoutButton from "../components/LogoutButton";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image_path, set_image_path] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const newPost: PostDTO = {
      title: title.trim(),
      content: content.trim(),
      image_path: image_path.trim(),
    };

    try {
      setIsLoading(true);
      await createPost(newPost);
      setMessage("Post created successfully!");
      setIsLoading(false);
      navigate("/");
    } catch {
      setIsLoading(false);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative">
      <LogoutButton />
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Create a New Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter the title"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter the content"
            />
          </div>
          <div>
            <label
              htmlFor="image_path"
              className="block text-sm font-medium mb-2"
            >
              Image Path
            </label>
            <input
              id="image_path"
              type="text"
              value={image_path}
              onChange={(e) => set_image_path(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter the image path"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
          >
            {isLoading ? "Creating..." : "Create Post"}
          </button>
        </form>
        {message && (
          <p className="text-center mt-6 text-sm text-green-500">{message}</p>
        )}
        {error && (
          <p className="text-center mt-6 text-sm text-red-500">{error}</p>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-black transition"
          >
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
            Go to Home
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center text-gray-600 hover:text-black transition"
          >
            Go to Profile
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;
