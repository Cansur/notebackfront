import { Link, useNavigate  } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {

    // spring boot 연결 test
    const [hello, setHello] = useState('')
    useEffect(() => {
      axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);
    // -------------------------------
  
    // 페이지 이동 함수
    const navigate = useNavigate();
    const onClick = () => {
      navigate('/main');
    }
    // -------------------------------

    return (
      <div class='main'>
        <div class='middle'>
          <input type="text" className="input-box" placeholder='아이디 또는 전화번호'/>
          <input type="text" className="input-box" placeholder='비밀번호'/>
          <button class="naver-login-button" onClick={onClick}> 로그인 </button>
          <p class='text_15'>회원가입</p>
        </div>
      </div>
    );
  }
  
  export default Login;