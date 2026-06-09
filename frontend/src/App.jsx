import { Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./page/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
