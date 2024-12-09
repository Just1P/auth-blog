import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/posts.service";
import { PostDTO } from "../types/post.type";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePath, setImagePath] = useState("");
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
      imagePath: imagePath.trim() || null,
    };

    try {
      setIsLoading(true);
      await createPost(newPost);
      setMessage("Post created successfully!");
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      console.error("Error occurred:", err);
      setIsLoading(false);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="create-post-page">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imagePath">Image Path:</label>
          <input
            id="imagePath"
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <button onClick={() => navigate("/")} className="home-button">
        Go to Home
      </button>
    </div>
  );
}

export default CreatePostPage;
