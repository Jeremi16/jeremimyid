import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="lg:grid lg:h-screen lg:place-content-center">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
          <div className="max-w-prose text-left">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Jeremi Pison Efrat Sianturi
            </h1>

            <p className="mt-4 text-base text-pretty sm:text-lg/relaxed">
              Bachelor of Informatics Engineering student at the Sumatra Institute of Technology
            </p>

            <div className="mt-4 flex gap-4 sm:mt-6">
              <Link
                to="/project"
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Project
              </Link>

              <Link
                to="/experience"
                className="inline-block rounded border border-gray-200 px-5 py-3 font-medium shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Experience
              </Link>
            </div>
          </div>
          
          <img 
            src="/image/photo-profile.png" 
            className="mx-auto hidden max-w-md md:block rounded-lg shadow-lg" 
            alt="Jeremi Profile"
          />
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            About Me
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            I am passionate about technology, software development, and continuous learning. 
            My journey in Informatics Engineering has equipped me with skills in web development, 
            problem-solving, and teamwork.
          </p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Achievements
          </h2>
          <div className="relative w-full max-w-3xl mx-auto">
            {/* Carousel container */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src="/certificates/cert1.jpg" alt="Certificate 1" className="w-full" />
            </div>
            {/* Next button */}
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Download CV Section */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Download My CV
          </h2>
          <a
            href="/files/my-cv.pdf"
            download
            className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
          >
            Download CV
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
