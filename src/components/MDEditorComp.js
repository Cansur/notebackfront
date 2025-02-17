import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import MDEditor from '@uiw/react-md-editor';

const MDEditorComp = () => {

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    // if (!currentBoard) return <div>No board selected.</div>;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // 입력 시 상태 업데이트
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);

    return (
        <div className='px-4 flex flex-col w-4/6'>
            <div data-color-mode="light" class="">
                <div className="flex justify-between p-4">
                    <input
                        className="w-full h-8 mb-8 py-6 bg-gray-700 border-b-2 text-3xl"
                        value={title}
                        onChange={handleTitleChange} >
                    </input>
                </div>
        
                <MDEditor
                    className=""
                    height={650}
                    value={content}
                    onChange={handleContentChange}
                />

                <button
                    className="w-1/6 h-8 bg-blue-500 text-white"
                >
                </button>
            </div>
        </div>
    );
}

export default MDEditorComp;