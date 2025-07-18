import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element = {<MainLayout/>}>
          <Route index element = {<Home/>}/>
          <Route path="login" element = {<LoginPage/>}/>
          <Route path="register" element = {<RegisterPage/>}/>
          <Route path="users" element = {
            <ProtectedRoute>
              <UserPage/>
            </ProtectedRoute>
          }
          />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
