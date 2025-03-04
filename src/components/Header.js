// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-4">
        <p className="cursor-pointer">🔙</p>
        <p className="cursor-pointer">🔜</p>
        <p className="cursor-pointer">➕</p>
        <p className="cursor-pointer">View</p>
      </div>

      <div className="relative" ref={profileRef}>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        />

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white border border-gray-700 shadow-lg rounded-lg p-2">
            <Link
              to="/setting"
              className="block p-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => setIsProfileOpen(false)}
            >
              프로필 설정
            </Link>
            <Link
              to="/register"
              className="block p-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => setIsProfileOpen(false)}
            >
              로그아웃
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
