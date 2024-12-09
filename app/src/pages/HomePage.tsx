import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/posts.service";
import { PostType } from "../types/post.type";

function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-page">
      <h1>All Posts</h1>
      <Link to="/create-post">
        <button>Create a New Post</button>
      </Link>
      {error && <p className="error">{error}</p>}
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default HomePage;
