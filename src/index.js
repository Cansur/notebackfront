import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 2번 반복되는 바람에 트랜잭션 충돌이 일어났네.. 이런..
  // <React.StrictMode>
    <App />
  // </React.StrictMode> 
);
