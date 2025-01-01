import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {

    // spring boot 연결 test
    const [hello, setHello] = useState('')
    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
    }, []);
    // -------------------------------

    return (
        <div class='main'>
            <div class='middle'>
                Main Page
            </div>
        </div>
    );
}

export default Main;