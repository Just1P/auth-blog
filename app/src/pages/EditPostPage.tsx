import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../services/posts.service";
import { PostDTO } from "../types/post.type";
import LogoutButton from "../components/LogoutButton";

function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(Number(id));
        setTitle(fetchedPost.title);
        setContent(fetchedPost.content);
        setImagePath(fetchedPost.imagePath || "");
      } catch {
        setError("Failed to load post. Please try again.");
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const updatedPost: PostDTO = {
      title: title.trim(),
      content: content.trim(),
      imagePath: imagePath.trim() || null,
    };

    try {
      setIsLoading(true);
      await updatePost(Number(id), updatedPost);
      setMessage("Post updated successfully!");
      setIsLoading(false);
      navigate("/");
    } catch {
      setIsLoading(false);
      setError("Failed to update post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative">
      <LogoutButton />
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Edit Post</h1>
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
              htmlFor="imagePath"
              className="block text-sm font-medium mb-2"
            >
              Image Path
            </label>
            <input
              id="imagePath"
              type="text"
              value={imagePath}
              onChange={(e) => setImagePath(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter the image path"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Post"}
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

export default EditPostPage;
