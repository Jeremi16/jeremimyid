import React from 'react';

const Project = () => {
  const projects = [
    {
      id: 1,
      title: "Website Tugas Pra-Kaderisasi",
      description: "Build with HTML & CSS only.",
      image: "/image/thumb/webtugasprakader-thumbnail.jpg",
      alt: "WEBSITE TUGAS PRA-KADER",
      link: "/project/webtugasprakader/",
      isExternal: false
    },
    {
      id: 2,
      title: "PPLK ITERA 2025",
      description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      image: "/image/thumb/pplk2025-thumbnail.jpg",
      alt: "PPLK ITERA 2025",
      link: "#",
      isExternal: false
    },
    {
      id: 3,
      title: "PPLK ITERA 2025",
      description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      image: "/image/thumb/pplk2025-thumbnail.jpg",
      alt: "PPLK ITERA 2025",
      link: "#",
      isExternal: false
    }
  ];

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

    // For internal navigation, you would use Link from react-router-dom
    // But since we're keeping it simple, using regular anchor for now
    return (
      <a 
        href={project.link}
        className={cardClasses}
      >
        {cardContent}
      </a>
    );
  };

  return (
    <main className="flex-grow pt-16">
      {/* Page Title */}
      <div className="px-4 sm:px-8 mt-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Berikut adalah beberapa project yang telah saya kerjakan
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 px-4 sm:px-8 justify-items-center items-stretch">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

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