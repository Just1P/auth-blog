import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost } from "../services/posts.service";
import { PostType } from "../types/post.type";

function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error occurred:", err);
        setError("Failed to fetch posts. Please try again.");
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        setPosts(posts.filter((post) => post.id !== id));
      } catch (err) {
        const error = err as Error;
        console.error("Error occurred:", error.message);
        setError(error.message);
      }
    }
  };

  return (
    <div className="home-page">
      <h1>Posts</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button onClick={() => navigate(`/edit-post/${post.id}`)}>
                Edit
              </button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
