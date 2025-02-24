import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './router/Login/Login';
import NotFound from './router/NotFound';
import Main from './router/Main';
import Test from './router/Test';
import ProtectedRoute from './api/ProtectedRoute';
import Register from './router/Register/Register';

const App = () => {

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;