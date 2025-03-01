import axios from 'axios';

// ✅ Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 인터셉터: 토큰 자동 추가
axiosInstance.interceptors.request.use(function (config) {
  // 요청이 전달되기 전에 작업 수행
  const access = localStorage.getItem('access');
  if (access) {
    config.headers['access'] = `${access}`;
  }
  return config;
}, function (error) {
  // 요청 오류가 있는 작업 수행
  return Promise.reject(error);
});

// ✅ 응답 인터셉터: 토큰 만료 시 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {

      try {
        const res = await axios.post("/api/reissue");

        localStorage.setItem("access", res.headers["access"]);
        
        // 기존 요청 재시도
        return axiosInstance(error.config);
      } catch (refreshError) {
        console.log(refreshError);

        if (refreshError.response.status === 403) {
          return axiosInstance(error.config);
        }
        
        console.log("Refresh Token도 만료됨. 로그아웃 처리.");
        localStorage.removeItem("access");
        window.location.href = "/";
        return Promise.reject(refreshError);

      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;