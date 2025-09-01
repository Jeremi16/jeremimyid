import React from 'react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Informatics Festival 2025",
      duration: "Agustus 2025 - November 2025",
      position: "Staff Sub-Divisi Dokumentasi, Divisi Publikasi Media Partner Dokumentasi",
      isLatest: true
    },
    {
      id: 2,
      title: "Panitia Hijau Bergelora 2025",
      duration: "Agustus 2025 - September 2025",
      position: "Staff Sub-Divisi Time Keeper, Divisi Acara",
      isLatest: false
    },
    {
      id: 3,
      title: "Panitia Family Gathering PMK ITERA 2025",
      duration: "Mei 2025 - Agustus 2025",
      position: "Staff Sub-Divisi Publikasi Dokumentasi, Divisi Publikasi Desain Dokumentasi",
      isLatest: false
    },
    {
      id: 4,
      title: "Panitia Ibadah PPLK PMK ITERA 2025",
      duration: "Mei 2025 - Agustus 2025",
      position: "Staff Sub-Divisi Publikasi Dokumentasi, Divisi Publikasi Desain Dokumentasi",
      isLatest: false
    },
    {
      id: 5,
      title: "Panitia PPLK ITERA 2025",
      duration: "Juni 2025 - Agustus 2025",
      position: "Staff Sub-Divisi Content Research, Divisi Implementasi Teknologi",
      isLatest: false
    },
    {
      id: 6,
      title: "Panitia Penyambutan Mahasiswa Baru Teknik Informatika ITERA 2025",
      duration: "Juni - Juli 2025",
      position: "Staff Divisi Acara",
      isLatest: false
    },
    {
      id: 7,
      title: "Badan Pengurus Angkatan Informatika'24",
      duration: "Mei 2025 - Sekarang",
      position: "Staff Divisi IT",
      isLatest: false
    },
    {
      id: 8,
      title: "Panitia Perayaan Paskah Keluarga Kristiani Asrama ITERA 2025",
      duration: "Februari 2025 - April 2025",
      position: "Kepala Divisi Publikasi Desain Dokumentasi",
      isLatest: false
    },
    {
      id: 9,
      title: "Panitia Perayaan Jumat Agung Keluarga Kristiani Asrama ITERA 2025",
      duration: "Februari 2025 - April 2025",
      position: "Kepala Divisi Publikasi Desain Dokumentasi",
      isLatest: false
    },
    {
      id: 10,
      title: "Badan Pengurus Harian Rohani Kristen SMAN 3 Babelan",
      duration: "2023-2024",
      position: "Kepala Divisi Publikasi & Dokumentasi",
      isLatest: false
    },
    {
      id: 11,
      title: "Panitia Natal Rohani Kristen SMAN 3 Babelan 2023",
      duration: "November 2023 - Desember 2023",
      position: "Staff Divisi Konsumsi",
      isLatest: false
    },
    {
      id: 12,
      title: "Panitia Natal Remaja HKBP Pondok Ungu Permai 2022",
      duration: "September 2022 - Desember 2022",
      position: "Kepala Divisi Humas, Publikasi & Dokumentasi",
      isLatest: false
    },
    {
      id: 13,
      title: "Tim Media HKBP Pondok Ungu Permai",
      duration: "Agustus 2022 - Sekarang",
      position: "Staff Tim Teknologi",
      isLatest: false
    }
  ];

  // Corporate icon component (SVG)
  const CorporateIcon = () => (
    <svg 
      className="w-4 h-4" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M19 21V7a2 2 0 00-2-2H7a2 2 0 00-2 2v14m14 0H5m14 0v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M9 7h1m-1 4h1m4-4h1m-1 4h1" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <main className="flex-grow p-4 sm:p-8">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 py-4">
        Pengalaman Semasa Kuliah
      </h2>
      
      <ul className="relative border-l border-gray-200 dark:border-gray-700">
        {experiences.map((exp) => (
          <li key={exp.id} className="mb-10 ml-4 sm:ml-6 relative">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -left-3 sm:-left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <CorporateIcon />
            </span>
            
            <div className="ml-10">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {exp.title}
                {exp.isLatest && (
                  <span className="bg-white text-black text-xs sm:text-sm font-medium ml-2 px-2 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                    Latest
                  </span>
                )}
              </h3>
              
              <time className="block mb-2 text-sm sm:text-base text-gray-400 dark:text-gray-300">
                {exp.duration}
              </time>
              
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-2">
                {exp.position}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Experience;