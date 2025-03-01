import React, { useState } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import MDEditorComp from '../components/MDEditorComp';

const Main = () => {

    const [editorKey, setEditorKey] = useState(0); // 🔹 MDEditorComp 리렌더링을 위한 상태

    const refreshEditor = (boardId) => {
        setEditorKey((prevKey) => prevKey + 1); // 🔹 key 변경 → MDEditorComp 새로 렌더링
        localStorage.setItem("lastBoardId", boardId); // 선택한 게시글 ID 저장
    };

    return (
        <div className='bg-gray-700 h-screen py-16 px-64 text-white'>
            <Header />
            <div className='flex justify-between'>
                <SideBar onItemClick={refreshEditor} />
                <MDEditorComp key={editorKey} />
            </div>
        </div>
    );
}

export default Main;