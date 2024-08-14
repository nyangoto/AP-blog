import React, { useState } from 'react';
import axios from 'axios';

function NewsletterSubscription() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/newsletter/subscribe', { email });
      alert('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Error subscribing. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}

export default NewsletterSubscription;
