import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../services/posts.service";
import { PostType } from "../types/post.type";

const SinglePostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const fetchedPost = await getPostById(Number(id));
          console.log(fetchedPost);
          setPost(fetchedPost);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-center">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">{post.title}</h1>
        {post.image_path ? (
          <img
            src={post.image_path}
            alt={post.title}
            className="w-full h-auto rounded-lg mb-6"
          />
        ) : (
          <p className="text-gray-500 text-center mb-6">No image available.</p>
        )}
        <p className="text-gray-700 mb-6">{post.content}</p>
        <p className="text-sm text-gray-500 mb-6">
          Created at: {new Date(post.created_at).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Created by: {post.creator_name}
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SinglePostPage;
