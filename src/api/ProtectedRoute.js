import { Navigate } from "react-router-dom";

// ✅ USER 권한이 있는지 확인하는 함수
const hasUserRole = () => {
  const token = localStorage.getItem("access");
  
  if (!token) return false; // 토큰이 없으면 접근 불가

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // JWT 디코딩
    return payload.role === "ROLE_USER" || payload.role === "ROLE_ADMIN"; // ✅ "USER" 권한인지 확인
  } catch (error) {
    console.error("토큰 해석 오류:", error);
    return false;
  }
};

// ✅ 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }) => {
  return hasUserRole() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
