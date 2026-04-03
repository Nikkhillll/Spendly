import { CAT_COLORS, CAT_ICONS } from "../../utils/constants";
import { Badge } from "../shared/UI";

export default function ExpenseList({ expenses, onDelete }) {
  const sorted = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (sorted.length === 0) {
    return (
      <div style={{ padding: "56px 24px", textAlign: "center" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "var(--surface-2)", border: "1px solid var(--border)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, marginBottom: 14,
        }}>
          🧾
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
          No expenses yet
        </p>
        <p style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
          Click "+ Add expense" to record your first transaction
        </p>
      </div>
    );
  }

  // Group by date
  const grouped = sorted.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(expense);
    return acc;
  }, {});

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date}>
          {/* Date group header */}
          <div style={{
            padding: "10px 20px 6px",
            fontSize: 11, fontWeight: 600,
            color: "var(--text-tertiary)",
            letterSpacing: ".06em", textTransform: "uppercase",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span>{formatDate(date)}</span>
            <span style={{ fontFamily: "monospace" }}>
              ₹{items.reduce((s, e) => s + e.amount, 0).toLocaleString("en-IN")}
            </span>
          </div>

          {/* Expense rows */}
          {items.map((expense, i) => (
            <ExpenseRow
              key={expense._id}
              expense={expense}
              onDelete={onDelete}
              isLast={i === items.length - 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function ExpenseRow({ expense, onDelete, isLast }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "12px 20px",
        background: hover ? "var(--surface-2)" : "transparent",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
        transition: "background .12s",
      }}
    >
      {/* Icon */}
      <div style={{
        width: 36, height: 36, borderRadius: 9,
        background: CAT_COLORS[expense.category] + "18",
        border: `1px solid ${CAT_COLORS[expense.category]}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, flexShrink: 0,
      }}>
        {CAT_ICONS[expense.category]}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {expense.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: CAT_COLORS[expense.category] }}>
            {expense.category}
          </span>
          {expense.notes && (
            <>
              <span style={{ color: "var(--border-2)" }}>·</span>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {expense.notes}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Amount */}
      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-.02em", fontFamily: "monospace", flexShrink: 0 }}>
        ₹{expense.amount.toLocaleString("en-IN")}
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(expense._id)}
        style={{
          width: 28, height: 28, borderRadius: 7,
          background: hover ? "var(--red-bg)" : "transparent",
          border: `1px solid ${hover ? "#fecaca" : "transparent"}`,
          cursor: "pointer", fontSize: 13,
          color: hover ? "var(--red)" : "var(--text-tertiary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .15s", flexShrink: 0,
        }}
        title="Delete"
      >
        ×
      </button>
    </div>
  );
}

// useState import needed inside ExpenseRow
import { useState } from "react";
