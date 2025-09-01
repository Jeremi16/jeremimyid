import { useEffect, useState } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Set current year when component mounts
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerLinks = [
    { href: '/privacy/', label: 'Privacy Policy' },
    { href: '/license/', label: 'Licensing' },
    { href: '/contact/', label: 'Contact' }
  ];

  return (
    <footer className="bg-[#1976D2] rounded-lg shadow-sm dark:bg-black m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        {/* Top section with logo and links */}
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo */}
          <a 
            href="https://jeremi.my.id" 
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">
              Jeremi
            </span>
          </a>

          {/* Footer navigation links */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className={`hover:underline ${
                    index < footerLinks.length - 1 ? 'me-4 md:me-6' : ''
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        {/* Copyright */}
        <span className="block text-sm text-white sm:text-center dark:text-gray-400">
          © {currentYear}{' '}
          <a href="https://jeremi.my.id" className="hover:underline">
            Jeremi™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;