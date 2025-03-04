// src/components/SideBar.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { FaSearch, FaInbox, FaHome } from "react-icons/fa";

const SideBar = ({ onItemClick }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get("/board/my");
        setItems(response.data);
      } catch (error) {
        console.error("사이드바 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="w-1/5 min-h-screen bg-gray-800 text-white p-6 shadow-lg">
      <div className="mb-6 text-lg font-semibold">Notion</div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer">
          <FaSearch />
          <span>검색</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer">
          <FaInbox />
          <span>수신함</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer">
          <FaHome />
          <span>홈</span>
        </div>
      </div>

      <hr className="my-4 border-gray-700" />

      <div className="space-y-2">
        {items.map((item) => (
          <p
            key={item.id}
            className="hover:text-blue-300 cursor-pointer transition"
            onClick={() => onItemClick(item.id)}
          >
            {item.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
