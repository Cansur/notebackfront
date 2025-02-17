import React from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import MDEditorComp from '../components/MDEditorComp';

const Main = () => {

    return (
        <div className='bg-gray-700 h-screen py-16 px-64 text-white'>
            <Header />
            <div className='flex justify-between'>
                <SideBar />
                <MDEditorComp />
            </div>
        </div>
    );
}

export default Main;