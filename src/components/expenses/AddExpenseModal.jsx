import { useState } from "react";
import { Input, Select, Button, Card } from "../shared/UI";
import { CATEGORIES } from "../../utils/constants";

export default function AddExpenseModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    title: "", amount: "", category: "Food",
    date: new Date().toISOString().slice(0, 10), notes: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const f = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.title.trim()) return setError("Title is required");
    if (!form.amount || isNaN(+form.amount) || +form.amount <= 0) return setError("Enter a valid amount");
    setLoading(true);
    try {
      await onAdd({ ...form, amount: parseFloat(form.amount) });
      onClose();
    } catch {
      setError("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,.3)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 100, padding: 20,
      }}
    >
      <div className="scale-in" style={{ width: "100%", maxWidth: 440 }}>
        <Card style={{ padding: 28 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-.02em" }}>
                Add expense
              </h2>
              <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 2 }}>
                Record a new transaction
              </p>
            </div>
            <button onClick={onClose} style={{
              width: 28, height: 28, borderRadius: 7,
              background: "var(--surface-2)", border: "1px solid var(--border)",
              cursor: "pointer", fontSize: 14, color: "var(--text-secondary)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              ✕
            </button>
          </div>

          {/* Amount — big and prominent */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Amount (₹)
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
                fontSize: 18, fontWeight: 600, color: "var(--text-tertiary)",
              }}>₹</span>
              <input
                type="number" placeholder="0.00" value={form.amount} onChange={f("amount")}
                style={{
                  width: "100%", padding: "12px 13px 12px 30px",
                  fontSize: 22, fontWeight: 700, fontFamily: "inherit",
                  color: "var(--text-primary)", letterSpacing: "-.02em",
                  background: "var(--surface-2)",
                  border: "1.5px solid var(--border)",
                  borderRadius: "var(--radius)", outline: "none", boxSizing: "border-box",
                }}
                onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.background = "var(--surface)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.background = "var(--surface-2)"; }}
              />
            </div>
          </div>

          <Input label="Title" placeholder="e.g. Zomato order" value={form.title} onChange={f("title")} />

          {/* Category pills */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
              Category
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setForm((p) => ({ ...p, category: cat }))} style={{
                  padding: "5px 12px", borderRadius: 99,
                  fontSize: 13, fontWeight: 500, fontFamily: "inherit",
                  cursor: "pointer", transition: "all .15s",
                  border: `1.5px solid ${form.category === cat ? "var(--text-primary)" : "var(--border)"}`,
                  background: form.category === cat ? "var(--text-primary)" : "var(--surface)",
                  color: form.category === cat ? "#fff" : "var(--text-secondary)",
                }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <Input label="Date" type="date" value={form.date} onChange={f("date")} />
          <Input label="Notes (optional)" placeholder="Any extra detail…" value={form.notes} onChange={f("notes")} />

          {error && (
            <div style={{ padding: "9px 13px", background: "var(--red-bg)", border: "1px solid #fecaca", borderRadius: "var(--radius)", marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: "var(--red)", fontWeight: 500 }}>⚠ {error}</span>
            </div>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit} loading={loading} style={{ flex: 2 }}>
              Add expense
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
