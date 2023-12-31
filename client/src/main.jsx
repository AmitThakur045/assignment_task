import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Admin/Register.jsx";
import Login from "./pages/Admin/Login.jsx";
import UserRegister from "./pages/User/UserRegister.jsx";
import UserLogin from "./pages/User/UserLogin.jsx";
import UserChatSection from "./pages/User/UserChatSection.jsx";
import ChatSection from "./pages/Admin/ChatSection.jsx";
import ProtectedRoute from "./Utils/ProtectedRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute person="admin">
            <ChatSection />{" "}
          </ProtectedRoute>
        }
      />

      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />

      <Route
        path="/user/:chatId"
        element={
          <ProtectedRoute person="user">
            <UserChatSection />{" "}
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
  // </React.StrictMode>
);
