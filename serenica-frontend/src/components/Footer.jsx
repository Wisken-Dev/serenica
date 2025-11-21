import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-gray-700 py-6 mt-10 border-t">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-lg font-semibold text-blue-700">Serenica Health Africa</h3>
          <p className="text-sm text-gray-600">
            Empowering minds, healing hearts 💙
          </p>
        </div>

        {/* Center Links */}
        <div className="flex space-x-6 text-sm">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/about" className="hover:text-blue-600">About</a>
          <a href="/journal" className="hover:text-blue-600">Journal</a>
          <a href="/contact" className="hover:text-blue-600">Contact</a>
        </div>

        {/* Right Section */}
        <div className="text-sm text-gray-600 mt-4 md:mt-0">
          © {new Date().getFullYear()} Serenica Health Africa. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
