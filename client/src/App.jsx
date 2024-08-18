import "./App.css";
import { Routes, Route } from "react-router-dom";
import PageNotFoud from "./pages/PageNotFoud";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/Authentication";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieListPage from "./pages/MovieListPage";

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/movies" element={<MovieListPage />} />
            <Route path="*" element={<PageNotFoud />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="*" element={<PageNotFoud />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
