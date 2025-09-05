import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/project/', label: 'Project' },
    { href: '/gallery/', label: 'Gallery' },
    { href: '/experience/', label: 'Experience' }
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav className="bg-[#1976D2] border-gray-800 fixed top-0 left-0 w-full z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 rtl:space-x-reverse"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Jeremi
            </span>
          </Link>

          {/* Mobile menu button + Dark Mode */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleDarkMode}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white hover:bg-white hover:text-[#1976D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white hover:text-[#1976D2] rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white active:bg-[#1976D2] active:text-white transition-colors duration-200"
              aria-controls="navbar-default"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <ul className="font-medium flex flex-row space-x-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-md px-4 py-2 transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-white text-[#1976D2]'
                        : 'text-white hover:bg-white hover:text-[#1976D2]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white border border-white rounded-lg hover:bg-white hover:text-[#1976D2] focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </>
              )}
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:hidden mt-4`}
            id="navbar-mobile"
          >
            <ul className="font-medium flex flex-col space-y-2 rounded-lg bg-[#1976D2]">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-left rounded-md px-4 py-2 transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-white text-[#1976D2]'
                        : 'text-white hover:bg-white hover:text-[#1976D2]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
