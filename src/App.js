import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './router/Login';
import NotFound from './router/NotFound';
import Main from './router/Main';
import Test from './router/Test';

const App = () => {

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Main" element={<Main />}></Route>
        <Route path="/Test" element={<Test />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;