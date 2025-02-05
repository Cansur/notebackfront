import React from 'react';
import '../styles/ComponentsCss.css';

const Header = () => {
    return (
        <div class='sticky top-0 z-50 bg-gray-900/90 p-4 text-white backdrop-blur-md'>
            <div class='flex items-center space-x-4 color-white'>
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