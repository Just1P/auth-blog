import { useEffect, useState } from "react";
import { getPostsByUser } from "../services/posts.service";
import { PostType } from "../types/post.type";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPosts = await getPostsByUser();
        setPosts(userPosts);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div>
      <h1>Your Posts</h1>
      {error && <p className="error">{error}</p>}
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;
