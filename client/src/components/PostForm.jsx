import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../styles/PostForm.css';

function PostForm({ post }) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (post) {
        await api.put(`/posts/${post._id}`, { title, content });
      } else {
        await api.post('/posts', { title, content });
      }
      navigate('/admin');
    } catch (err) {
      console.error('Error saving post:', err);
      setError('Failed to save post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {post ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}

export default PostForm;