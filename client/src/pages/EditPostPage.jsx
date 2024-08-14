import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import PostForm from '../components/PostForm';
import Loading from '../components/Loading';

function EditPostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to fetch post. Please try again.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      {post && <PostForm post={post} />}
    </div>
  );
}

export default EditPostPage;
