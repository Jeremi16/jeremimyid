import { useEffect } from 'react';

const ImageModal = ({ image, onClose }) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-2 shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Image with padding */}
        <div className="relative p-4">
          <img
            src={image.src || image.image_url}
            alt={image.desc || image.description}
            className="w-full h-auto max-h-[70vh] object-contain"
            onError={(e) => {
              e.target.src = image.src || image.image_url;
            }}
          />
        </div>

        {/* Image info */}
        <div className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {image.description || image.desc || 'Untitled'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            {image.camera && (
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                  <circle cx="12" cy="13" r="3"/>
                </svg>
                <span>{image.camera}</span>
              </div>
            )}
            
            {image.iso && (
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <text x="12" y="16" font-size="10" text-anchor="middle" dominant-baseline="middle" stroke="currentColor" fill="none">ISO</text>
                </svg>
                <span>ISO {image.iso}</span>
              </div>
            )}
            
            {image.shutter && (
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                <span>{image.shutter}</span>
              </div>
            )}
            
            {image.focal && (
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                <span>{image.focal}</span>
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            {image.lens && (
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="16" height="12" rx="2"/>
                  <circle cx="12" cy="12" r="3"/>
                  <line x1="4" y1="12" x2="8" y2="12"/>
                  <line x1="16" y1="12" x2="20" y2="12"/>
                </svg>
                <span>{image.lens}</span>
              </div>
            )}

            {image.aperture && (
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2l-3 5.2M12 22l3-5.2M2 12l5.2-3M22 12l-5.2 3M6.34 6.34l3.86 3.86M17.66 17.66l-3.86-3.86" />
                </svg>
                <span>{image.aperture}</span>
              </div>
            )}

            {image.dpi && (
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8" cy="8" r="1"/>
                  <circle cx="16" cy="8" r="1"/>
                  <circle cx="8" cy="16" r="1"/>
                  <circle cx="16" cy="16" r="1"/>
                </svg>
                <span>{image.dpi} DPI</span>
              </div>
            )}

            {image.bit && (
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M8 10h8M8 14h8"/>
                </svg>
                <span>{image.bit} Bit</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;