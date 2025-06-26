import React from "react";

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">SiteTask Tracker</h1>
      <div className="text-sm text-gray-300">Welcome, Engineer</div>
    </header>
  );
};

export default Navbar;
