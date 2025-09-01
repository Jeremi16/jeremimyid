import { useState, useEffect } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    // Column 1
    [
      {
        src: "https://github.com/Jeremi16/asset/blob/main/105185139132594/image/IMG-03-SD.jpg?raw=true",
        desc: "Pantai Sanggar, Kalianda, Lampung Selatan, Indonesia",
        camera: "Canon EOS 600D",
        lens: "Unknown",
        focal: "75mm",
        exposure: "0",
        iso: "100",
        shutter: "1/400s",
        dpi: "72",
        bit: "24-bit",
        hd: "https://github.com/Jeremi16/asset/blob/main/105185139132594/image/IMG-03-HD.jpg?raw=true",
        raw: "https://github.com/Jeremi16/asset/blob/main/105185139132594/image/IMG_9052.JPG?raw=true"
      },
      {
        src: "/image/gallery/sample2_sd.jpg",
        desc: "Air terjun alami",
        camera: "Nikon D750",
        iso: "400",
        shutter: "1/200s",
        hd: "/image/gallery/sample2_hd.jpg"
      },
      {
        src: "/image/gallery/sample3_sd.jpg",
        desc: "Pantai saat senja",
        camera: "Canon EOS 90D",
        iso: "200",
        shutter: "1/125s",
        hd: "/image/gallery/sample3_hd.jpg"
      }
    ],
    // Column 2
    [
      {
        src: "/image/gallery/IMG_9052_sd.jpg",
        desc: "Pantai Ujung Sukasuka — sore hari.",
        camera: "Canon EOS 90D",
        iso: "200",
        shutter: "1/125s",
        hd: "/image/gallery/IMG_9052_hd.jpg"
      },
      {
        src: "/image/gallery/sample4_sd.jpg",
        desc: "Danau tenang",
        camera: "Fujifilm X-T4",
        iso: "160",
        shutter: "1/80s",
        hd: "/image/gallery/sample4_hd.jpg"
      },
      {
        src: "/image/gallery/sample5_sd.jpg",
        desc: "Hutan berkabut",
        camera: "Olympus OM-D E-M1",
        iso: "800",
        shutter: "1/50s",
        hd: "/image/gallery/sample5_hd.jpg"
      }
    ],
    // Column 3
    [
      {
        src: "/image/gallery/sample6_sd.jpg",
        desc: "Jalan pedesaan",
        camera: "Sony A6400",
        iso: "320",
        shutter: "1/160s",
        hd: "/image/gallery/sample6_hd.jpg"
      },
      {
        src: "/image/gallery/sample7_sd.jpg",
        desc: "Gedung kota malam hari",
        camera: "Canon EOS R",
        iso: "1600",
        shutter: "1/30s",
        hd: "/image/gallery/sample7_hd.jpg"
      },
      {
        src: "/image/gallery/sample8_sd.jpg",
        desc: "Gunung berapi",
        camera: "Nikon Z6",
        iso: "250",
        shutter: "1/200s",
        hd: "/image/gallery/sample8_hd.jpg"
      }
    ],
    // Column 4
    [
      {
        src: "/image/gallery/sample9_sd.jpg",
        desc: "Pemandangan sawah",
        camera: "Panasonic GH5",
        iso: "200",
        shutter: "1/125s",
        hd: "/image/gallery/sample9_hd.jpg"
      },
      {
        src: "/image/gallery/sample10_sd.jpg",
        desc: "Air laut biru",
        camera: "Sony RX100",
        iso: "100",
        shutter: "1/500s",
        hd: "/image/gallery/sample10_hd.jpg"
      },
      {
        src: "/image/gallery/sample11_sd.jpg",
        desc: "Gunung salju",
        camera: "Canon EOS 5D",
        iso: "400",
        shutter: "1/250s",
        hd: "/image/gallery/sample11_hd.jpg"
      }
    ]
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Gallery Content */}
      <main className="p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Gallery</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((column, columnIndex) => (
            <div key={columnIndex} className="grid gap-4">
              {column.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  className="h-auto max-w-full rounded-lg cursor-zoom-in hover:opacity-80 transition-opacity"
                  src={image.src}
                  alt={image.desc}
                  onClick={() => openModal(image)}
                />
              ))}
            </div>
          ))}
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-2 shadow-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImage.hd || selectedImage.src}
                alt={selectedImage.desc}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            {/* Image info */}
            <div className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedImage.desc}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                {selectedImage.camera && (
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                      <circle cx="12" cy="13" r="3"/>
                    </svg>
                    <span>{selectedImage.camera}</span>
                  </div>
                )}
                
                {selectedImage.iso && (
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1.05 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1.05H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1.05-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.05 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1.05H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1.05z"/>
                    </svg>
                    <span>ISO {selectedImage.iso}</span>
                  </div>
                )}
                
                {selectedImage.shutter && (
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    <span>{selectedImage.shutter}</span>
                  </div>
                )}
                
                {selectedImage.focal && (
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    <span>{selectedImage.focal}</span>
                  </div>
                )}
              </div>

              {selectedImage.lens && (
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Lens:</strong> {selectedImage.lens}
                </div>
              )}

              {selectedImage.exposure && (
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Exposure:</strong> {selectedImage.exposure}
                </div>
              )}

              {selectedImage.dpi && (
                <div className="mt-2 text-sm text-gray-600">
                  <strong>DPI:</strong> {selectedImage.dpi}
                </div>
              )}

              {selectedImage.bit && (
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Bit Depth:</strong> {selectedImage.bit}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;