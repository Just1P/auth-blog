import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/posts.service";
import { PostDTO } from "../types/post.type";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook pour naviguer

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const newPost: PostDTO = { title, content };

    try {
      await createPost(newPost);
      setMessage("Post created successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="create-post-page">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CreatePostPage;
