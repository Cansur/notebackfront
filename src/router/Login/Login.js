import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  // 로그인 버튼 기능
  const onSubmit = async (event) => {
    event.preventDefault(); // 폼 기본 제출 방지

    const formData = new FormData(event.target);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
    
    if(localStorage.getItem('token') != null){
      console.log('Token removed:', localStorage.getItem('token'));
      localStorage.removeItem('token');
    }

    try {
      const response = await axios.post('/api/login', data, {
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 전송
        },
      });
      
      const token = response.headers['access']; // 토큰 추출
      if (token) {
        localStorage.setItem('access', token); // 토큰 저장
        console.log('Token stored:', token);
        navigate('/main'); // 로그인 성공 시 메인 페이지로 이동
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <div className="fixed w-full h-full flex items-center text-center bg-neutral-100">
      <Link className="absolute top-10 right-10 naver-login-button" to="/test">기능 Test</Link>
      <div className="middle block m-auto w-80">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            className="w-full input-box"
            placeholder="아이디 또는 전화번호"
            required
          />
          <input
            type="password"
            name="password"
            className="w-full input-box"
            placeholder="비밀번호"
            required
          />
          <button type="submit" className="naver-login-button">
            로그인
          </button>
        </form>
        <p className="text-base">
          <Link to="/register">회원가입</Link>
          {/* <p>{accessToken}</p> */}
        </p>
      </div>
    </div>
  );
};

export default Login;
