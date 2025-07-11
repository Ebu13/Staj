import {  BrowserRouter as Router,Route,Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Login from "./Login";
import './App.css'
import { ToastContainer } from "react-toastify";
import Home from "./Home";

function App(){
  return (
    <Router>
    <div style={{height:'100%'}}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  </Router>
  );
}
export default App;