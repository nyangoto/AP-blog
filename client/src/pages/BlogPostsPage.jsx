import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Loading from '../components/Loading';
import '../styles/BlogPosts.css';

function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loading />;

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="blog-posts">
      <h1>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No blog posts available at the moment.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="blog-post-preview">
            <h2>
              <Link to={`/blog/${post._id}`}>{post.title}</Link>
            </h2>
            <p>{post.content.substring(0, 150)}...</p>
            <small>Posted on: {new Date(post.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogPostsPage;