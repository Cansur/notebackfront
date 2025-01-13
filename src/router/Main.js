import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

// MD Editor
import MDEditor from '@uiw/react-md-editor';

const Main = () => {

    // spring boot 연결 test
    const [hello, setHello] = useState('')
    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
    }, []);
    // -------------------------------

    // Editor
    const [value, setValue] = React.useState("**Hello world!!!**");
    // -------------------------------


    
    return (
        <div>
            <SideBar />
            <Header />
            <div class='main2'>
                <div data-color-mode="light" class="mdeditor">
                    <MDEditor
                        value={value}
                        onChange={setValue}
                        height={960}
                    />
                </div>
            </div>
            
        </div>
    );
}

export default Main;