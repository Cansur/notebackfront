// src/pages/Main.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import MDEditorComp from "../components/MDEditorComp";

const Main = () => {
  const [editorKey, setEditorKey] = useState(0);

  const refreshEditor = (boardId) => {
    setEditorKey((prevKey) => prevKey + 1);
    localStorage.setItem("lastBoardId", boardId);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <SideBar onItemClick={refreshEditor} />
        <div className="flex-grow p-8">
          <MDEditorComp key={editorKey} />
        </div>
      </div>
    </div>
  );
};

export default Main;
