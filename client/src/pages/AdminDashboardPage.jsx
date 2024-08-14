import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Loading from '../components/Loading';
import '../styles/AdminDashboard.css';

function AdminDashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts. Please try again.');
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${id}`);
        fetchPosts(); // Refresh the post list
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('Failed to delete post. Please try again.');
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <Link to="/admin/new-post" className="btn btn-primary">Create New Post</Link>
      <h2>Manage Posts</h2>
      <table className="post-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/edit-post/${post._id}`} className="btn btn-secondary">Edit</Link>
                <button onClick={() => handleDeletePost(post._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboardPage;