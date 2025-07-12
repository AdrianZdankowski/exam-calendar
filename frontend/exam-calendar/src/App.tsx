import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<MainLayout/>}>
        <Route index element = {<Home/>}/>
        <Route path="login" element = {<LoginPage/>}/>
        <Route path="register" element = {<RegisterPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
