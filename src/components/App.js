import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";

function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function Login({ handleLogin }) {
  return (
    <div className="main-container">
      <h2>Log In</h2>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

function Playground() {
  return (
    <div className="main-container">
      <h2>Hi Welcome to Code PlayGround</h2>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="main-container">
        <p>
          {isAuthenticated
            ? "Logged in, Now you can enter Playground"
            : "You are not authenticated, Please login first"}
        </p>

        <ul>
          <li>
            <Link to="/">PlayGround</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </ul>

        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Playground />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={<Login handleLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}