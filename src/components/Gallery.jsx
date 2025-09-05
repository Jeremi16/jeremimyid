import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ImageModal from './ImageModal';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([[], [], [], []]); // 4 columns
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from Supabase
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) {
          throw error;
        }

        // Distribute images across 4 columns
        const columns = [[], [], [], []];
        data.forEach((image, index) => {
          const columnIndex = index % 4;
          columns[columnIndex].push(image);
        });

        setGalleryImages(columns);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠</div>
          <h2 className="text-white text-xl mb-2">Error loading gallery</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Gallery Content */}
      <main className="p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Gallery</h1>
        
        {galleryImages.every(column => column.length === 0) ? (
          <div className="text-center text-gray-400">
            <p>No images found in gallery</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((column, columnIndex) => (
              <div key={columnIndex} className="grid gap-4">
                {column.map((image, imageIndex) => (
                  <img
                    key={image.id || imageIndex}
                    className="h-auto max-w-full rounded-lg cursor-zoom-in hover:opacity-80 transition-opacity"
                    src={image.src || image.image_url}
                    alt={image.description || image.desc}
                    onClick={() => openModal(image)}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Gallery;