// ProtectedAdminPanel.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';
import { useAuth } from './AuthContext.jsx';

const ProtectedAdminPanel = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    src: '',
    hd: '',
    raw: '',
    description: '',
    camera: '',
    lens: '',
    focal: '',
    exposure: '',
    iso: '',
    shutter: '',
    dpi: '',
    bit: ''
  });

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch images from Supabase
  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      setMessage({ type: 'error', text: 'Error loading images: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Clean empty fields
      const cleanData = Object.fromEntries(
        Object.entries(formData).filter(([, value]) => value.trim() !== '')
      );

      const { data, error } = await supabase
        .from('gallery_images')
        .insert([cleanData])
        .select();

      if (error) {
        throw error;
      }

      // Add new image to local state
      setImages([data[0], ...images]);
      
      // Reset form
      setFormData({
        src: '', hd: '', raw: '', description: '', 
        camera: '', lens: '', focal: '', exposure: '', 
        iso: '', shutter: '', dpi: '', bit: ''
      });
      
      setMessage({ type: 'success', text: 'Image added successfully!' });
    } catch (error) {
      console.error('Error adding image:', error);
      setMessage({ type: 'error', text: 'Error adding image: ' + error.message });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const { error } = await supabase
          .from('gallery_images')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }

        setImages(images.filter(img => img.id !== id));
        setMessage({ type: 'success', text: 'Image deleted successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } catch (error) {
        console.error('Error deleting image:', error);
        setMessage({ type: 'error', text: 'Error deleting image: ' + error.message });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Check if user has admin access
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin panel.
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow mb-8 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gallery Admin Panel</h1>
              <p className="text-gray-600">Welcome back, {currentUser?.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Admin
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Image Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Image</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL (Required) *
                </label>
                <input
                  type="url"
                  name="src"
                  placeholder="https://example.com/image.jpg"
                  value={formData.src}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HD Image URL
                </label>
                <input
                  type="url"
                  name="hd"
                  placeholder="https://example.com/image_hd.jpg"
                  value={formData.hd}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Beautiful sunset at the beach..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Camera
                  </label>
                  <input
                    type="text"
                    name="camera"
                    placeholder="Canon EOS R"
                    value={formData.camera}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lens
                  </label>
                  <input
                    type="text"
                    name="lens"
                    placeholder="24-70mm f/2.8"
                    value={formData.lens}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ISO
                  </label>
                  <input
                    type="text"
                    name="iso"
                    placeholder="100"
                    value={formData.iso}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shutter
                  </label>
                  <input
                    type="text"
                    name="shutter"
                    placeholder="1/200s"
                    value={formData.shutter}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Focal
                  </label>
                  <input
                    type="text"
                    name="focal"
                    placeholder="50mm"
                    value={formData.focal}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } transition-colors`}
              >
                {isSubmitting ? 'Adding Image...' : 'Add Image'}
              </button>
            </form>
          </div>

          {/* Image List */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Manage Images ({images.length})
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading images...</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {images.map((image) => (
                  <div key={image.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img 
                      src={image.src} 
                      alt={image.description || 'Gallery image'}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {image.description || 'No description'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {image.camera || 'Unknown camera'}
                      </p>
                      <p className="text-xs text-gray-400">
                        Added: {new Date(image.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                
                {images.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No images yet. Add your first image above!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">📝 How to Use</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Fill in the image URL (required) and other optional metadata</li>
            <li>• Click "Add Image" to save to your Supabase database</li>
            <li>• Use the right panel to manage existing images</li>
            <li>• All changes are automatically synced with your database</li>
            <li>• Images will appear in your public gallery immediately</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProtectedAdminPanel;