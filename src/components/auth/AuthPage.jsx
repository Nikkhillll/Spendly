import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { login as apiLogin, register as apiRegister } from "../../api";
import { Input, Button } from "../shared/UI";

export default function AuthPage() {
  const { loginUser } = useAuth();
  const [mode, setMode]     = useState("login");
  const [form, setForm]     = useState({ name: "", email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const f = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = mode === "login"
        ? await apiLogin(form.email, form.password)
        : await apiRegister(form.name, form.email, form.password);
      loginUser(res.user, res.token);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      fontFamily: "inherit",
    }}>
      {/* ── Left panel — branding ── */}
      <div style={{
        background: "var(--text-primary)",
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(255,255,255,.1)",
              border: "1px solid rgba(255,255,255,.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>
              ◈
            </div>
            <span style={{ color: "#fff", fontSize: 16, fontWeight: 600, letterSpacing: "-.01em" }}>
              Spendly
            </span>
          </div>
        </div>

        {/* Center content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            fontSize: 13, fontWeight: 500,
            color: "rgba(255,255,255,.4)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}>
            Personal Finance
          </div>
          <h1 style={{
            fontSize: 42, fontWeight: 700,
            color: "#fff", lineHeight: 1.1,
            letterSpacing: "-.03em",
            marginBottom: 20,
          }}>
            Take control of your money.
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 340 }}>
            Track expenses, visualize spending patterns, and understand where your money goes — all in one place.
          </p>

          {/* Fake stats */}
          <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
            {[["₹0 wasted", "on surprise bills"], ["100%", "data privacy"], ["Real-time", "sync across devices"]].map(([val, label]) => (
              <div key={val}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{val}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.3)", fontStyle: "italic" }}>
            "A budget is telling your money where to go instead of wondering where it went."
          </p>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div style={{
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px",
      }}>
        <div style={{ width: "100%", maxWidth: 380 }} className="fade-up">

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-.02em", color: "var(--text-primary)", marginBottom: 6 }}>
              {mode === "login" ? "Welcome back" : "Create account"}
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
              {mode === "login"
                ? "Sign in to your account to continue"
                : "Start tracking your expenses today"}
            </p>
          </div>

          {/* Tab switcher */}
          <div style={{
            display: "flex",
            background: "var(--surface-2)",
            borderRadius: "var(--radius)",
            padding: 3,
            marginBottom: 28,
            border: "1px solid var(--border)",
          }}>
            {["login", "register"].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                style={{
                  flex: 1, padding: "7px 0",
                  borderRadius: 8, border: "none",
                  fontSize: 13, fontWeight: 500,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all .15s",
                  background: mode === m ? "var(--surface)" : "transparent",
                  color: mode === m ? "var(--text-primary)" : "var(--text-tertiary)",
                  boxShadow: mode === m ? "var(--shadow-sm)" : "none",
                }}
              >
                {m === "login" ? "Sign in" : "Register"}
              </button>
            ))}
          </div>

          {/* Form */}
          <div>
            {mode === "register" && (
              <Input label="Full name" placeholder="Nikhil Sharma" value={form.name} onChange={f("name")} onKeyDown={handleKey} />
            )}
            <Input label="Email address" type="email" placeholder="you@example.com" value={form.email} onChange={f("email")} onKeyDown={handleKey} />
            <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={f("password")} onKeyDown={handleKey} />

            {error && (
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 13px", borderRadius: "var(--radius)",
                background: "var(--red-bg)",
                border: "1px solid #fecaca",
                marginBottom: 16,
              }}>
                <span style={{ fontSize: 14 }}>⚠</span>
                <span style={{ fontSize: 13, color: "var(--red)", fontWeight: 500 }}>{error}</span>
              </div>
            )}

            <Button
              variant="primary"
              size="md"
              loading={loading}
              onClick={handleSubmit}
              style={{ width: "100%", marginTop: 4 }}
            >
              {mode === "login" ? "Sign in" : "Create account"} →
            </Button>
          </div>

          <p style={{ fontSize: 12, color: "var(--text-tertiary)", textAlign: "center", marginTop: 20 }}>
            By continuing, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
