import './App.css';
import Header from './Components/Header';
import Home from "./Components/Home";
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error';
import {Routes, Route} from "react-router-dom";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
