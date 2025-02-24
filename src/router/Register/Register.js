import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(''); // 상태 변수 추가

  // 회원가입 버튼 기능
  const onSubmit = async (event) => {
    event.preventDefault(); // 폼 기본 제출 방지

    const formData = new FormData(event.target);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    try {
      const response = await axios.post('/api/join', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 전송
        },
      });

      console.log('Signup success:', response.data);
      setMessage('회원가입이 정상적으로 되었습니다.'); // 성공 메시지 표시
      setTimeout(() => navigate('/'), 2000); // 2초 후 로그인 페이지로 이동
    } catch (error) {
      console.error('Signup failed:', error);
      setMessage('회원가입에 실패했습니다. 다시 시도해주세요.'); // 실패 메시지 표시
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
            placeholder="아이디 또는 전화번호를 입력해주세요."
            required
          />
          <input
            type="password"
            name="password"
            className="w-full input-box"
            placeholder="비밀번호를 입력해주세요."
            required
          />
          <button type="submit" className="naver-login-button">
            회원가입 하기
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>} {/* 메시지 표시 */}
      </div>
    </div>
  );
};

export default Register;
