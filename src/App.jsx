// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext.jsx';
import LoginPage from './components/LoginPage.jsx';
import ProtectedAdminPanel from './components/AdminPanel.jsx';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './components/home';
import Project from './components/project';
import Gallery from './components/Gallery.jsx';
import Experience from './components/experience';

// Simple Navigation Component untuk Gallery-only mode
const SimpleNavigation = ({ currentPage, setCurrentPage, isAuthenticated, isAdmin }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentPage('gallery');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Gallery App</h1>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <button
                onClick={() => setCurrentPage('gallery')}
                className={`${
                  currentPage === 'gallery'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Gallery
              </button>
              
              {isAuthenticated && isAdmin && (
                <button
                  onClick={() => setCurrentPage('admin')}
                  className={`${
                    currentPage === 'admin'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Admin Panel
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <button
                onClick={() => setCurrentPage('login')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {isAdmin && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mr-2">
                      Admin
                    </span>
                  )}
                  Welcome back!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Gallery App Content (untuk gallery-only mode)
const GalleryAppContent = () => {
  const { currentUser, isAdmin, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('gallery');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={() => setCurrentPage('gallery')} />;
      case 'admin':
        if (!currentUser || !isAdmin) {
          setCurrentPage('gallery');
          return null;
        }
        return <ProtectedAdminPanel />;
      case 'gallery':
      default:
        return <Gallery />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SimpleNavigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isAuthenticated={!!currentUser}
        isAdmin={isAdmin}
      />
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
};

// Full Website Content (dengan semua halaman)
const FullWebsiteContent = () => {
  const { currentUser, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin" 
          element={
            currentUser && isAdmin ? (
              <ProtectedAdminPanel />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
      
      <Footer />
    </div>
  );
};

// Main App Component
const App = () => {
  // Choose your mode:
  // Set to true for gallery-only mode (simple)
  // Set to false for full website mode (with all pages)
  const galleryOnlyMode = false;

  return (
    <AuthProvider>
      <BrowserRouter>
        {galleryOnlyMode ? (
          <GalleryAppContent />
        ) : (
          <FullWebsiteContent />
        )}
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;