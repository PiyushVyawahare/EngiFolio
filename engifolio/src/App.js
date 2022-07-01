// import Button from "./components/button";
// import Card from "./components/card";
// import Heading from "./components/heading";
// import Image from "./components/Image";
// import Input from "./components/input";
// import Title from "./components/Title";
import "./style.module.css"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login"
import Register from "./pages/register"
import VerifyUser from "./pages/verifyUser"


function App() {
  // function onC(){
  //   console.log(1);
  // }
  return (
    <>
      <Routes>
        <Route exact path = "/" element = {<Home/>}></Route>
        <Route exact path = "/login" element = {<Login/>}></Route>
        <Route exact path = "/register" element = {<Register/>}></Route>
        <Route exact path = "/verifyUser" element = {<VerifyUser/>}></Route>
        <Route exact path = "*" element = {<h1>404</h1>}></Route>
      </Routes>
    </>
  );
}
export default App;
