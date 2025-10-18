import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-sm bg-white/10 border-b border-white/10  shadow-[0_8px_30px_rgba(255,255,255,0.35)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-3xl font-extrabold font-serif tracking-wider uppercase bg-gradient-to-r from-red-500 via-pink-400 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,100,150,0.6)]">
          Bella Vista
        </h1>

        <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-200">
          {["home", "about", "menu", "contact"].map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="relative group px-1 py-1 text-gray-300 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_25px_#fb7185]"
              >
                <span className="capitalize">{id}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-red-500 to-pink-400 transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_15px_#fb7185]"></span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline bg-gradient-to-r from-red-600 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:scale-105 hover:shadow-[0_0_12px_#fb7185] transition-all duration-300"
          >
            Book Table
          </a>
          <button className="md:hidden text-white px-3 py-2 rounded-lg">
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
