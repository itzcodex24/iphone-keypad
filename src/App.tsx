import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoggedInPage from "./components/LoggedInPage";
import { AnimatePresence } from "framer-motion";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showPage, setShowPage] = useState(false);
  const redirect = useNavigate();

  useEffect(() => {
    const allowed = localStorage.getItem("bypass");
    if (!allowed) {
      redirect("/");
    } else {
      setShowPage(true);
    }
  }, []);
  !showPage && <></>;
  return <>{children}</>;
};

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <LoggedInPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
