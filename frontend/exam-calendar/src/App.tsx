import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AddTaskPage from "./pages/AddTaskPage";
import TagsPage from "./pages/TagsPage";
import EditTaskPage from "./pages/EditTaskPage";
import { ThemeProvider } from "@mui/material/styles";
import DialogTheme from "./themes/DialogTheme";

function App() {
  return (
    <ThemeProvider theme={DialogTheme}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element = {<MainLayout/>}>
          <Route index element = {
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
            }/>
          <Route path="login" element = {<LoginPage/>}/>
          <Route path="register" element = {<RegisterPage/>}/>
          <Route path="users" element = {
            <ProtectedAdminRoute>
              <UserPage/>
            </ProtectedAdminRoute>
          }
          />
          <Route path="addtask" element = {
            <ProtectedRoute>
              <AddTaskPage/>
            </ProtectedRoute>
            }/>
            <Route path="tags" element = {
            <ProtectedRoute>
              <TagsPage/>
            </ProtectedRoute>
          }
          />
          <Route path="edittask" element = {
            <ProtectedRoute>
              <EditTaskPage/>
            </ProtectedRoute>
            }/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
