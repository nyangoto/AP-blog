import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import BlogPostsPage from './pages/BlogPostsPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NewPostPage from './pages/NewPostPage';
import EditPostPage from './pages/EditPostPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/layout.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPostsPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/new-post" 
              element={
                <ProtectedRoute>
                  <NewPostPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/edit-post/:id" 
              element={
                <ProtectedRoute>
                  <EditPostPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;