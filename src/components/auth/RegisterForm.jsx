import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { register as apiRegister } from "../../api";
import { Input, Button } from "../shared/UI";

export default function RegisterForm({ onSwitch }) {
  const { loginUser } = useAuth();
  const [form, setForm]     = useState({ name: "", email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.email || !form.password) {
      return setError("All fields are required");
    }
    setLoading(true);
    try {
      const { user, token } = await apiRegister(form.name, form.email, form.password);
      loginUser(user, token);
    } catch (err) {
  setError(err.response?.data?.message || "Something went wrong. Try again.");
} finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Input
        label="Full Name"
        placeholder="Priya Sharma"
        value={form.name}
        onChange={handleChange("name")}
      />
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
        {loading ? "Creating account…" : "Create Account"}
      </Button>

      <p style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", marginTop: 16 }}>
        Have an account?{" "}
        <span onClick={onSwitch} style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }}>
          Sign In
        </span>
      </p>
    </div>
  );
}
