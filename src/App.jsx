import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './components/home'
import Project from './components/project'
import Gallery from './components/gallery'
import Experience from './components/experience'

export default function App() {

  return (
    <>

    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/experience" element={<Experience />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>

    </>
  );
}
