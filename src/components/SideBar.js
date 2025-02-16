import React from 'react';
import '../styles/ComponentsCss.css';

const SideBar = () => {
    return (
        <div class='border-r-2 border-gray-500 p-4 flex flex-col items-center w-1/6'>
            <p>Notion</p><br/>
            <p>검색</p><br/>
            <p>Notion AI</p><br/>
            <p>홈</p><br/>
            <p>수신함</p>
        </div>
    );
}

export default SideBar;