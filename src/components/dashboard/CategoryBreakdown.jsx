import { Card } from "../shared/UI";
import { CATEGORIES, CAT_COLORS, CAT_ICONS } from "../../utils/constants";

export default function CategoryBreakdown({ expenses }) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const cats = CATEGORIES.map((cat) => ({
    name: cat,
    icon: CAT_ICONS[cat],
    color: CAT_COLORS[cat],
    value: expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0),
    count: expenses.filter((e) => e.category === cat).length,
  })).sort((a, b) => b.value - a.value);

  return (
    <Card>
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-.01em" }}>
          Category breakdown
        </h3>
        <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 2 }}>
          Where your money went this month
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {cats.map((cat) => {
          const pct = total > 0 ? (cat.value / total) * 100 : 0;
          if (cat.value === 0) return null;

          return (
            <div key={cat.name}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{cat.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>{cat.name}</span>
                  <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{cat.count} txn</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{pct.toFixed(1)}%</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace", minWidth: 72, textAlign: "right" }}>
                    ₹{cat.value.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: 5, background: "var(--surface-2)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 99,
                  background: cat.color,
                  width: `${pct}%`,
                  transition: "width .6s cubic-bezier(.16,1,.3,1)",
                }} />
              </div>
            </div>
          );
        })}

        {total === 0 && (
          <p style={{ fontSize: 13, color: "var(--text-tertiary)", textAlign: "center", padding: "20px 0" }}>
            No expenses this month
          </p>
        )}
      </div>
    </Card>
  );
}
