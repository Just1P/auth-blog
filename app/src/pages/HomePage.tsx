import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/posts.service";
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
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch posts. Please try again.");
        }
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-page">
      <h1>Posts</h1>
      <button
        onClick={() => navigate("/create-post")}
        className="create-button"
      >
        Create New Post
      </button>
      <button onClick={() => navigate("/profile")} className="profile-button">
        My Profile
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>
                <strong>Created by:</strong> {post.creator_name}
              </p>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
