import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<MainLayout/>}>
        <Route index element = {<Home/>}/>
        <Route path="login" element = {<LoginPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
