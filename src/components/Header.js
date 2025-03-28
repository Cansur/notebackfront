// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";


const Header = () => {
  // 프로필 메뉴가 열려있는지 여부를 관리하는 상태 라네요..
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // 검색어를 관리하는 상태
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 프로필 메뉴가 열려있을 때, 다른 곳을 클릭하면 닫히도록 하는 이벤트 리스너
  // 오 
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

  useEffect(() => {
    if (query.length < 2) return; // 입력이 너무 짧으면 요청하지 않음

    const fetchSuggestions = async () => {
      try {
        const res = await axiosInstance.get(`/board/search?q=${query}`);
        // console.log(res.data);
        setSuggestions(res.data);
        console.log(suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300); // 디바운싱 적용 (300ms 대기)
    return () => clearTimeout(timer);
  }, [query]);


  
  return (
    <div className="text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-4">
        <p className="cursor-pointer tl">NoteBack</p>
      </div>

      <div className="">
        <input 
          className="w-96 h-8 px-2 rounded-lg bg-gray-800 text-white" 
          placeholder="검색하기"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul>
          {suggestions.map((s, index) => (
            <li key={index}>{s}</li>
          ))}
        </ul>
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
