import React from "react";
import { useNavigate } from "react-router-dom";
import MotionPage from "./MotionPage";

const LoggedIn: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("bypass");
    navigate("/");
  };
  return (
    <MotionPage>
      <h1>You are logged in</h1>
      <button onClick={handleLogout}>
        <b>Logout</b>
      </button>
    </MotionPage>
  );
};

export default LoggedIn;
