import { useAuth } from "../../context/AuthContext";
import { Button } from "../shared/UI";

export default function Navbar({ onAddExpense }) {
  const { user, logoutUser } = useAuth();

  return (
    <nav style={{
      height: 56,
      background: "rgba(248,248,247,.85)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 28, height: 28,
          background: "var(--text-primary)",
          borderRadius: 7,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 14, fontWeight: 700,
        }}>
          ◈
        </div>
        <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-.02em", color: "var(--text-primary)" }}>
          Spendly
        </span>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* User pill */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "5px 12px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 99,
          marginRight: 4,
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: "50%",
            background: "var(--text-primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 700, color: "#fff",
          }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>
            {user?.name?.split(" ")[0]}
          </span>
        </div>

        <Button variant="ghost" size="md" onClick={logoutUser}>
          Sign out
        </Button>

        <Button variant="primary" size="md" onClick={onAddExpense}>
          + Add expense
        </Button>
      </div>
    </nav>
  );
}
