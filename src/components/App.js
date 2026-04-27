import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";

// Private Route Component
function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Login Component
function Login({ handleLogin }) {
  return (
    <div className="main-container">
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

// Home Component (Private Route)
function Home() {
  return (
    <div className="main-container">
      <h2>Code Playground</h2>
      <p>Welcome! You are logged in.</p>
    </div>
  );
}

// Not Found Page
function NotFound() {
  return (
    <div className="main-container">
      <h2>Page not Found</h2>
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
            ? "You are authenticated"
            : "You are not authenticated, Please login first"}
        </p>

        <ul>
          <li>
            <Link to="/">PlayGround</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={<Login handleLogin={handleLogin} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}