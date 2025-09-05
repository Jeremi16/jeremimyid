// App.js
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './components/home';
import Project from './components/project';
import Gallery from './components/Gallery.jsx';
import Experience from './components/experience';
import NotFound from './components/404.jsx';

// Main App Component
const App = () => {

  return (<div className="min-h-screen">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/" element={<Project />} />
        <Route path="/gallery/" element={<Gallery />} />
        <Route path="/experience/" element={<Experience />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer />
    </div>
  );
};

export default App;