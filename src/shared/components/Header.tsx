import React from "react";
import { Link } from "react-router-dom";
import AuthStatus from "../../pages/login/AuthStatus";

const Header = () => (
  <header className="bg-blue-500 text-white p-4">
    <nav className="flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/">Teller App</Link>
      </div>
      <AuthStatus />
    </nav>
  </header>
);

export default Header;
