import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const SideBar = ({ onItemClick }) => { // 🔹 props로 이벤트 함수 받기
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axiosInstance.get('/board/my'); // 🔹 API 경로 수정
                setItems(response.data); // 🔹 리스트 상태 업데이트
                // console.log(response.data);
            } catch (error) {
                console.error("사이드바 데이터를 불러오는 중 오류 발생:", error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className='border-r-2 border-gray-500 p-4 px-8 flex flex-col w-1/6
         h-700 overflow-y-auto scroll4 gap-5'>
            <p>Notion</p>
            <p>검색</p>
            <p>Notion AI</p>
            <p>홈</p>
            <p>수신함</p>
            <hr></hr>

            {/* 🔹 동적으로 사이드바 리스트 추가 */}
            {items.map((item) => (
                <p  key={item.id}
                    className="hover:text-blue-500"
                    type="button"
                    onClick={() => onItemClick(item.id)}>
                    {item.title}
                </p>
            ))}

        </div>
    );
}

export default SideBar;