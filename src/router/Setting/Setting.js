import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('사용자이름');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const updateField = (field, value) => {
    toast.success(`${field}이(가) 업데이트되었습니다.`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700 p-6">
      <div className="bg-gray-600 p-12 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-green-400 text-2xl font-bold text-center mb-6">프로필 설정</h2>
        <div className="flex flex-col items-center mb-6">
          <label className="block text-gray-300 mb-2">프로필 사진</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="profileImage" />
          <label htmlFor="profileImage" className="cursor-pointer">
            <img src={profileImage || 'https://via.placeholder.com/100'} alt="Profile" className="w-24 h-24 rounded-full border-2 border-green-400 object-cover" />
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-gray-300 w-1/3">아이디</label>
          <input
            type="email"
            className="w-2/3 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="ml-2 px-4 py-2 bg-green-500 text-white rounded" onClick={() => updateField('이메일', email)}>변경</button>
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-gray-300 w-1/3">휴대폰 번호</label>
          <input
            type="tel"
            className="w-2/3 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
            placeholder="010-1234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="ml-2 px-4 py-2 bg-green-500 text-white rounded" onClick={() => updateField('휴대폰 번호', phone)}>변경</button>
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-gray-300 w-1/3">새 비밀번호</label>
          <input
            type="password"
            className="w-2/3 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
            placeholder="새 비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="ml-2 px-4 py-2 bg-gray-600 rounded text-gray-600">변경</div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-gray-300 w-1/3">비밀번호 확인</label>
          <input
            type="password"
            className="w-2/3 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button className="ml-2 px-4 py-2 bg-green-500 text-white rounded" onClick={() => updateField('비밀번호', password)} disabled={!passwordMatch}>변경</button>
        </div>
        {!passwordMatch && <p className="text-red-500 text-sm text-center">비밀번호가 일치하지 않습니다.</p>}
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

export default ProfileSettings;
