import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

// MD Editor
import MDEditor from '@uiw/react-md-editor';

const Main = () => {
    //--------------------------------------------------------------------------------
    //------------------------------- spring boot 연결 --------------------------------
    //--------------------------------------------------------------------------------

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


    //------------------------------------------------------------------------------------------
    //-------------------------------------- Editor --------------------------------------------
    //------------------------------------------------------------------------------------------

    const [value, setValue] = React.useState("**Hello world!!!**");

    //------------------------------------------------------------------------------------------
    //-------------------------------------- LocalStorge --------------------------------------------
    //------------------------------------------------------------------------------------------

    useEffect(() => {
        const item = localStorage.getItem("item");
        console.log({item});
    }, []);


    //------------------------------------------------------------------------------------------
    //------------------------------------- Return ---------------------------------------------
    //------------------------------------------------------------------------------------------


    return (
        <div class='relative'>
            <Header />
            <SideBar />
            <div class='main2'>
                <div data-color-mode="light" class="mdeditor">
                    <input class="my-8" onChange={handleTitleChange} ></input>
                    <button type="button" onClick={() => localStorage.setItem("item", 10)}>dd</button>
                    <MDEditor
                        value={content}
                        onChange={handleContentChange}
                        height={900}
                    />
                </div>
            </div>

        </div>
    );
}

export default Main;