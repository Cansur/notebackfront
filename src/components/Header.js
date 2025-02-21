import React from 'react';
import '../styles/ComponentsCss.css';

const Header = () => {
    return (
        <div className='border-b-2 border-gray-500 p-4 flex justify-between items-center mb-16'>
            <div className='flex items-center space-x-4 color-white'>
                <p>🔙</p>
                <p>🔜</p>
                <p>➕</p>
                <p>View</p>
                <p>Go</p>
                <p>Run</p>
            </div>
        </div>
    );
}

export default Header;