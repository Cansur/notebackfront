import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
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
    
    if (localStorage.getItem('access') != null) {
      console.log('Token removed:', localStorage.getItem('access'));
      localStorage.removeItem('access');
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
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="bg-gray-600 p-10 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-green-400 text-xl font-bold mb-6">로그인</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
              placeholder="아이디 또는 전화번호"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
              placeholder="비밀번호"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600 font-bold"
          >
            로그인
          </button>
        </form>
        <div className="mt-4">
          <p className="text-gray-300">아직 계정이 없으신가요? <Link to="/register" className="text-green-400 font-bold">회원가입</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
