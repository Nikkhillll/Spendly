import { Card } from "../shared/UI";

export default function StatCard({ label, value, sub, icon, trend, isText }) {
  return (
    <Card className="fade-up" style={{ flex: 1, minWidth: 160 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: ".06em" }}>
          {label}
        </span>
        {icon && (
          <div style={{
            width: 28, height: 28,
            background: "var(--surface-2)",
            borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14,
          }}>
            {icon}
          </div>
        )}
      </div>

      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-.03em", color: "var(--text-primary)", lineHeight: 1 }}>
        {isText ? value : `₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
      </div>

      {sub && (
        <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 6 }}>
          {sub}
        </div>
      )}

      {trend !== undefined && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 3,
          marginTop: 8, fontSize: 12, fontWeight: 500,
          color: trend >= 0 ? "var(--green)" : "var(--red)",
        }}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% vs last month
        </div>
      )}
    </Card>
  );
}
