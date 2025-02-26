import { Link, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const checkUsername = async () => {
    if (!username.trim()) {
      toast.warn('아이디를 입력해주세요.');
      setIsUsernameAvailable(null);
      return;
    }

    try {
      const response = await axios.get(`/api/check-username?username=${username}`);
      setIsUsernameAvailable(response.data.available);
      if (response.data.available) {
        toast.success('사용 가능한 아이디입니다.');
      } else {
        toast.error('이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
      console.log(error);
      toast.error('아이디 중복 체크 중 오류가 발생했습니다.');
      setIsUsernameAvailable(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!isUsernameAvailable) {
      toast.error('이미 사용 중인 아이디입니다.');
      return;
    }

    if (!passwordMatch) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    const data = { username, password };

    try {
      const response = await axios.post('/api/join', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
      
      console.log('Signup success:', response.data);
      toast.success('회원가입이 정상적으로 완료되었습니다.');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.log(error);
      toast.error('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="bg-gray-600 p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-green-400 text-xl font-bold text-center mb-6">회원가입</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">아이디</label>
            <div className="flex items-center">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white mr-2"
              placeholder="아이디 입력"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button
              type="button"
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={checkUsername}
            >
              중복 확인
            </button>
            </div>
            {isUsernameAvailable === false && <p className="text-red-500 text-sm">이미 사용 중인 아이디입니다.</p>}
            {isUsernameAvailable === true && <p className="text-green-400 text-sm">사용 가능한 아이디입니다.</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">비밀번호</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
              placeholder="비밀번호 입력"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">비밀번호 확인</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {!passwordMatch && <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600 font-bold"
          >
            회원가입 하기
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-300">이미 계정이 있으신가요? <Link to="/" className="text-green-400 font-bold">로그인</Link></p>
        </div>
      </div>
      <ToastContainer 
        position="top-center"
        autoClose={3000} 
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
};

export default Register;
