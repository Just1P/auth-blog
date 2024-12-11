import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../services/posts.service";
import { PostDTO, PostType } from "../types/post.type";

function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType | null>(null);
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
        setPost(fetchedPost);
        setTitle(fetchedPost.title);
        setContent(fetchedPost.content);
        setImagePath(fetchedPost.imagePath || "");
      } catch (err) {
        console.error("Error occurred:", err);
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
    } catch (err) {
      console.error("Error occurred:", err);
      setIsLoading(false);
      setError("Failed to update post. Please try again.");
    }
  };

  if (!post) {
    return <p>Loading post...</p>;
  }

  return (
    <div className="edit-post-page">
      <h1>Edit Post</h1>
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
          {isLoading ? "Updating..." : "Update Post"}
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

export default EditPostPage;
