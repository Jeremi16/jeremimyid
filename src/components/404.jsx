import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        Oops! It seems like you've taken a wrong turn
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        We're working to bring it back.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFoundPage;