// API_URL comes from the .env.development file
import React, { useState, useEffect } from "react";
import { deletePost as deletePostService, fetchAllPosts } from "../../services/postService";
import { Link } from "react-router-dom";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  // Fetch posts from the API
  console.log("Fetching data from:");
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await deletePostService(id);
      setPosts(posts.filter((p) => p.id!== id));
    } catch (err){
      console.error("An error occurred:", err);
    }
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`/posts/${post.id}`} className="posr-title">
              {post.title}
            </Link>
          </h2>
          <div className="post-links">
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;