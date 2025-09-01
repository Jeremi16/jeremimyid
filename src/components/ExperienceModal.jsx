import { useState } from 'react';

const ExperienceModal = ({ experience, onClose }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % (experience.photo_urls?.length || 1));
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + (experience.photo_urls?.length || 1)) % (experience.photo_urls?.length || 1));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className="bg-gray-800 p-6 rounded-lg max-w-3xl w-full relative">
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-2 shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Carousel */}
        <div className="relative">
          {experience.photo_urls && experience.photo_urls.length > 0 ? (
            <>
              <img
                src={experience.photo_urls[currentPhotoIndex]}
                alt={`${experience.title} photo ${currentPhotoIndex + 1}`}
                className="w-full h-64 object-cover rounded-md"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
                onClick={prevPhoto}
                disabled={experience.photo_urls.length <= 1}
              >
                &lt;
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
                onClick={nextPhoto}
                disabled={experience.photo_urls.length <= 1}
              >
                &gt;
              </button>
              <p className="text-center text-gray-400 mt-2">
                {currentPhotoIndex + 1} / {experience.photo_urls.length}
              </p>
            </>
          ) : (
            <div className="w-full h-64 bg-gray-700 flex items-center justify-center rounded-md text-gray-400">
              No photos available
            </div>
          )}
        </div>

        {/* Details */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-white">{experience.title}</h2>
          <p className="text-gray-300 mt-2">{experience.description || 'No description available'}</p>
          <p className="text-gray-400 mt-1"><strong>Jabatan:</strong> {experience.position}</p>
          <p className="text-gray-400 mt-1"><strong>Waktu:</strong> {experience.duration}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;