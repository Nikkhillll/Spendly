import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./components/dashboard/Dashboard";
import "./index.css";

function AppInner() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <AuthPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
