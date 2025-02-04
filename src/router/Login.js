import { Link, useNavigate  } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import axios from '../utils/axios'; // axios.js에서 import

const Login = () => {

    // spring boot 연결 test
    // const [hello, setHello] = useState('')
    // useEffect(() => {
    //   axios.get('/api/hello')
    //     .then(response => setHello(response.data))
    //     .catch(error => console.log(error))
    // }, []);
    // -------------------------------
  
    // 페이지 이동 함수
    const navigate = useNavigate();
    const onClick = () => {
      navigate('/main');
    }
    // -------------------------------
    // 로그인 기능
    const onSubmit = (event) => {
      event.preventDefault(); // 폼 기본 제출 동작 방지
      const formData = new FormData(event.target);
    
      axios.post('/api/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // 중요
        },
      })
      .then(response => {
        const token = response.headers['authorization']; // 헤더에서 토큰 추출
        if (token) {
          localStorage.setItem('token', token); // 토큰을 localStorage에 저장
          console.log('Token stored:', token);
        }
      })
      .catch(error => console.error('Login failed:', error));
    };

    // 앱 초기화 시 토큰 확인
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          console.log('Token found:', token);
          // 필요한 경우, Axios 기본 헤더에 설정
          axios.defaults.headers.common['Authorization'] = token;
      } else {
          console.log('No token found, user not authenticated');
      }
  }, []);
  //---------------------------------------------------------
  
    return (
      <div className="main">
        <div className="middle">
          <form onSubmit={onSubmit} action="/login" method="POST">
            <input
              type="text"
              name="username"
              className="input-box"
              placeholder="아이디 또는 전화번호"
              required
            />
            <input
              type="password"
              name="password"
              className="input-box"
              placeholder="비밀번호"
              required
            />
            <button type="submit" className="naver-login-button">
              로그인
            </button>
          </form>
          <p className="text_15">회원가입</p>
        </div>
      </div>
    );
  }
  
  export default Login;