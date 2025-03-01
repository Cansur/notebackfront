// import React from 'react';
// import '../styles/ComponentsCss.css';

// const Header = () => {
//     return (
//         <div className='border-b-2 border-gray-500 p-4 flex justify-between items-center mb-16'>
//             <div className='flex items-center space-x-4 color-white'>
//                 <p>🔙</p>
//                 <p>🔜</p>
//                 <p>➕</p>
//                 <p>View</p>
//                 <p>Go</p>
//                 <p>Run</p>
//             </div>
//         </div>
//     );
// }

// export default Header;


import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ComponentsCss.css';

const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // 외부 클릭 감지하여 프로필 메뉴 닫기
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='border-b-2 border-gray-500 p-4 flex justify-between items-center mb-16'>
            {/* 왼쪽 메뉴 */}
            <div className='flex items-center space-x-4 text-white'>
                <p>🔙</p>
                <p>🔜</p>
                <p>➕</p>
                <p>View</p>
                <p>Go</p>
                <p>Run</p>
            </div>

            {/* 프로필 메뉴 */}
            <div className="relative" ref={profileRef}>
                <img 
                    src="https://via.placeholder.com/40" 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full cursor-pointer" 
                    onClick={() => setIsProfileOpen(!isProfileOpen)} 
                />
                
                {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 shadow-lg rounded-lg p-2">
                        <Link to="/setting" className="block p-2 hover:bg-gray-100 cursor-pointer" onClick={() => setIsProfileOpen(false)}>프로필 설정</Link>
                        <Link to="/register" className="block p-2 hover:bg-gray-100 cursor-pointer" onClick={() => setIsProfileOpen(false)}>로그아웃</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;

