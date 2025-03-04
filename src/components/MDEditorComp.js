// src/components/MDEditorComp.jsx
import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import axiosInstance from "../api/axiosInstance";

const MDEditorComp = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [viewMode, setViewMode] = useState("edit"); // 🔹 초기값을 'edit'으로 설정

  useEffect(() => {
    const getData = async () => {
      try {
        const lastBoardId = localStorage.getItem("lastBoardId");
        if (!lastBoardId) return;
        const response = await axiosInstance.get(`/board/${lastBoardId}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="w-full bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <input
        className="w-full bg-transparent text-3xl border-b-2 border-gray-500 focus:border-blue-400 outline-none p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />
      <MDEditor height={650} value={content} onChange={setContent} visibleDragbar={false} preview={viewMode} />
    </div>
  );
};

export default MDEditorComp;
