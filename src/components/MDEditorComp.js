// components/MDEditorComp.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import axiosInstance from "../api/axiosInstance";

const MDEditorComp = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // 입력 시 상태 업데이트
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (value) => setContent(value);

    useEffect(() => {
        const getData = async () => {
            try {
                const lastBoardId = localStorage.getItem("lastBoardId");

                if (!lastBoardId) return;

                const boardData = await axiosInstance.get(`/board/${lastBoardId}`);

                setTitle(boardData.data.title);
                setContent(boardData.data.content);
                // 근데 생성인지 아니면 업데이트인지 구분이 필요하네??
                // 그럼 이건 어떻게 구분하지??
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        console.error("403 Forbidden: 권한이 없습니다.");
                        localStorage.setItem("lastBoardId", null);
                        // window.location.reload();
                        return;
                    } else {
                        console.error(`에러 발생: ${error.response.statusText}`);
                    }
                } else {
                    console.error("서버 응답 없음:", error);
                }
            }

        };
        getData();
    }, []);

    // 폼 제출 이벤트 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage("");

        const data = {
            "title": title,
            "content": content
        };

        try {
            const response = await axiosInstance.post("/board/create", data);

            if (response.status !== 201 && response.status !== 200) {
                throw new Error(`서버 오류: ${response.statusText}`);
            }

            setMessage("게시글이 성공적으로 저장되었습니다.");
            localStorage.setItem("lastBoardId", response.data);
        } catch (error) {
            setMessage(`에러 발생: ${error.response ? error.response.data.message : error.message}`);
        } finally {
            setIsSaving(false);
        }
    };


    return (
        <div className="px-4 flex flex-col w-4/6">
            <div data-color-mode="light">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        className="w-full h-10 px-4 py-2 my-2 bg-gray-700 border-b-2 border-gray-500 text-3xl 
                        focus:outline-none focus:border-b-4 focus:border-blue-500 transition-all duration-200"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="제목을 입력하세요"
                        required
                    />

                    <MDEditor height={650} value={content} onChange={handleContentChange} />
                    <button
                        type="submit"
                        className="w-1/6 h-10 bg-blue-500 text-white rounded"
                        disabled={isSaving}
                    >
                        {isSaving ? "저장 중..." : "저장"}
                    </button>
                </form>
                {message && <div className="mt-4 text-center text-red-500">{message}</div>}
            </div>
        </div>
    );
};

export default MDEditorComp;
