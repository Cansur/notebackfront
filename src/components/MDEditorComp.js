import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MDEditor from '@uiw/react-md-editor';

const MDEditorComp = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // 자동 저장 함수
    const autoSave = async () => {
        if (!title && !content) return; // 내용이 없으면 저장하지 않음

        setIsSaving(true);
        try {
            await axios.post("/api/posts/1", {
                title,
                content,
            });
            console.log("Draft saved");
        } catch (error) {
            console.error("Error saving draft", error);
        } finally {
            setIsSaving(false);
        }
    };

    // 입력 시 상태 업데이트
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);

    // 일정 간격으로 자동 저장
    useEffect(() => {
        const interval = setInterval(autoSave, 5000); // 5초 간격
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, [title, content]);

    const [value, setValue] = React.useState("**Hello world!!!**");


    return (
        <div className='p-4 flex flex-col w-4/6'>
            <div data-color-mode="light" class="">
                <div>
                    <input class="my-8" onChange={handleTitleChange} ></input>
                    <button type="button" onClick={() => localStorage.setItem("item", 10)}>dd</button>
                </div>

                <MDEditor
                    className=""
                    value={content}
                    onChange={handleContentChange}
                // height={900}
                />
            </div>
        </div>
    );
}

export default MDEditorComp;