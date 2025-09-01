import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ProjectCard = ({ project }) => {
  const cardContent = (
    <>
      <img 
        className="object-cover w-full h-64 md:h-64 md:w-48 md:rounded-none md:rounded-s-lg"
        src={project.image}
        alt={project.alt}
        loading="lazy"
      />
      <div className="flex flex-col justify-between p-4 leading-normal flex-grow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {project.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {project.description}
        </p>
      </div>
    </>
  );

  const cardClasses = `flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm 
                      md:flex-row md:max-w-xl hover:bg-gray-100 
                      dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 
                      h-full w-full max-w-md transition-colors duration-200`;

  // Render different elements based on link type
  if (project.link === "#" || !project.link) {
    return (
      <div className={cardClasses}>
        {cardContent}
      </div>
    );
  }

  if (project.isExternal) {
    return (
      <a 
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        {cardContent}
      </a>
    );
  }

  // For internal navigation, using regular anchor
  return (
    <a 
      href={project.link}
      className={cardClasses}
    >
      {cardContent}
    </a>
  );
};

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('id', { ascending: false }); // Fetch in descending order to have latest last

        if (error) throw error;
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠</div>
          <h2 className="text-white text-xl mb-2">Error loading projects</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow pt-16">
      {/* Page Title */}
      <div className="px-4 sm:px-8 mt-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Projects
        </h1>
      </div>

      {/* Card Grid */}
      {projects.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p>No projects found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 px-4 sm:px-8 justify-items-center items-stretch">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Load More Button (Optional) */}
      <div className="flex justify-center mt-12 mb-8">
        <button 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     dark:focus:ring-offset-gray-800"
        >
          Load More Projects
        </button>
      </div>
    </main>
  );
};

export default Project;