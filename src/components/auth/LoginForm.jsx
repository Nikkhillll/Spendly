import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { login as apiLogin } from "../../api";
import { Input, Button } from "../shared/UI";

export default function LoginForm({ onSwitch }) {
  const { loginUser } = useAuth();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const { user, token } = await apiLogin(form.email, form.password);
      loginUser(user, token);
    } catch (err) {
  setError(err.response?.data?.message || "Something went wrong. Try again.");
}     finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Input
        label="Email"
        type="email"
        placeholder="you@email.com"
        value={form.email}
        onChange={handleChange("email")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange("password")}
      />

      {error && (
        <p style={{ color: "#E24B4A", fontSize: 13, marginBottom: 12, padding: "8px 12px", background: "#FEF2F2", borderRadius: 8 }}>
          ⚠ {error}
        </p>
      )}

      <Button style={{ width: "100%" }} onClick={handleSubmit} disabled={loading}>
        {loading ? "Signing in…" : "Sign In"}
      </Button>

      <p style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", marginTop: 16 }}>
        No account?{" "}
        <span onClick={onSwitch} style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }}>
          Register
        </span>
      </p>
    </div>
  );
}
