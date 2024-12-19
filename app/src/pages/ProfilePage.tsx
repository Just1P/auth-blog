import { useEffect, useState } from "react";
import { getPostsByUser } from "../services/posts.service";
import { PostType } from "../types/post.type";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPosts = await getPostsByUser();
        console.log(userPosts);
        setPosts(userPosts);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Your Posts</h1>
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black mb-4"
        >
          Go to Home
        </button>
        {error && (
          <p className="text-center mt-6 text-sm text-red-500">{error}</p>
        )}
        {posts.length === 0 ? (
          <p className="text-center mt-6 text-sm">No posts found.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="bg-gray-100 p-6 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Created at: {new Date(post.created_at).toLocaleDateString()}
                </p>
                <div className="flex space-x-4">
                  <button className="text-gray-500 hover:text-gray-700 focus:outline-none"></button>
                  <button className="text-red-500 hover:text-red-700 focus:outline-none"></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
