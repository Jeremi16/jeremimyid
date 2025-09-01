import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ExperienceModal from './ExperienceModal';

const CorporateIcon = () => (
  <svg 
    className="w-4 h-4" 
    viewBox="0 0 24 24" 
    stroke="white"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M19 21V7a2 2 0 00-2-2H7a2 2 0 00-2 2v14m14 0H5m14 0v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 7h1m-1 4h1m4-4h1m-1 4h1" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .order('id', { ascending: false }); // Changed to descending order

        if (error) throw error;
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading experiences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠</div>
          <h2 className="text-white text-xl mb-2">Error loading experiences</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const openModal = (experience) => {
    setSelectedExperience(experience);
  };

  const closeModal = () => {
    setSelectedExperience(null);
  };

  return (
    <div className="min-h-screen pt-16">
      <main className="p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Pengalaman</h1>

        {experiences.length === 0 ? (
          <div className="text-center">
            <p>No experiences found</p>
          </div>
        ) : (
          <ul className="relative border-l border-gray-200 dark:border-gray-700 mb-12">
            {experiences.map((exp) => (
              <li key={exp.id} className="mb-10 ml-4 sm:ml-6 relative cursor-pointer" onClick={() => openModal(exp)}>
                <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -left-3 sm:-left-3">
                  <CorporateIcon />
                </span>
                <div className="ml-10">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">
                    {exp.title}
                    {exp.isLatest && (
                      <span className="bg-white text-xs sm:text-sm font-medium ml-2 px-2 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                        Latest
                      </span>
                    )}
                  </h3>
                  <time className="block mb-2 text-sm sm:text-base">
                    {exp.duration}
                  </time>
                  <p className="text-sm sm:text-base ">
                    {exp.position}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Experience;