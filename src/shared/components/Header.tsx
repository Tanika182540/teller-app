import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-blue-500 text-white p-4">
    <nav className="flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/">MyApp</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  </header>
);

export default Header;
