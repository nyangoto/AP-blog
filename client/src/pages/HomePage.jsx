import React from 'react';
import Navigation from '../components/Navigation';
import NewsletterSubscription from '../components/NewsletterSubscription';

function Home() {
  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <Navigation />
      <NewsletterSubscription />
      {/* Add content for the home page */}
    </div>
  );
}

export default Home;
