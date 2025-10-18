import React from "react";

const Footer = () => {
  return (
    <>
      {/* --- Contact Content --- */}

      <footer className="bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden text-center text-gray-400 text-sm pb-5 relative z-10">
        <hr className="border-t border-white/10 mb-4 w-11/12 mx-auto" />©{" "}
        {new Date().getFullYear()}{" "}
        <span className="text-red-400 hover:text-pink-400 transition-colors duration-300font-medium">
          Areeba Farhan
        </span>
        . All rights reserved.
      </footer>
    </>
  );
};

export default Footer;
