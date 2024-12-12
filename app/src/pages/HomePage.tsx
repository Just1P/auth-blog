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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Posts</h1>
        <button
          onClick={() => navigate('/create-post')}
          className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black mb-4"
        >
          Create New Post
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="w-full py-3 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        >
          My Profile
        </button>
        {error && <p className="text-center mt-6 text-sm text-red-500">{error}</p>}
        {posts.length === 0 ? (
          <p className="text-center mt-6 text-sm">No posts available.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <p className="text-sm text-gray-500">Created by: {post.creator_name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomePage;
