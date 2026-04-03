import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area,
} from "recharts";
import { Card } from "../shared/UI";
import { CATEGORIES, CAT_COLORS } from "../../utils/constants";

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--text-primary)",
      border: "none",
      borderRadius: 8,
      padding: "8px 12px",
      boxShadow: "var(--shadow-lg)",
    }}>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginBottom: 2 }}>{payload[0].name}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
        ₹{Number(payload[0].value).toLocaleString("en-IN")}
      </p>
    </div>
  );
};

// ─── Category Chart ───────────────────────────────────────────────────────────
export function CategoryChart({ expenses }) {
  const [chartType, setChartType] = useState("donut");

  const data = CATEGORIES.map((cat) => ({
    name: cat,
    value: expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0),
    color: CAT_COLORS[cat],
  })).filter((d) => d.value > 0);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card style={{ flex: 1, minWidth: 280 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-.01em" }}>
            Spending breakdown
          </h3>
          <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 2 }}>By category this month</p>
        </div>

        <div style={{ display: "flex", background: "var(--surface-2)", borderRadius: "var(--radius-sm)", padding: 2, border: "1px solid var(--border)" }}>
          {[["donut", "Donut"], ["bar", "Bar"]].map(([id, label]) => (
            <button key={id} onClick={() => setChartType(id)} style={{
              padding: "4px 10px", borderRadius: 5, border: "none",
              fontSize: 12, fontWeight: 500, fontFamily: "inherit",
              cursor: "pointer", transition: "all .15s",
              background: chartType === id ? "var(--surface)" : "transparent",
              color: chartType === id ? "var(--text-primary)" : "var(--text-tertiary)",
              boxShadow: chartType === id ? "var(--shadow-sm)" : "none",
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {data.length === 0 ? (
        <div style={{ height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ fontSize: 28 }}>📊</div>
          <p style={{ fontSize: 14, color: "var(--text-tertiary)" }}>No expenses this month</p>
        </div>
      ) : chartType === "donut" ? (
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ position: "relative", width: 160, height: 160, flexShrink: 0 }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={48} outerRadius={72}
                  dataKey="value" stroke="none" paddingAngle={2}>
                  {data.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Total</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-.02em" }}>
                ₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0, notation: "compact" })}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0 }}>
            {data.sort((a, b) => b.value - a.value).map((d) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                <span style={{ fontSize: 15, color: "var(--text-secondary)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {d.name}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", fontFamily: "var(--font-mono, monospace)", flexShrink: 0 }}>
                  {((d.value / total) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" fontSize={11} tick={{ fill: "var(--text-tertiary)", fontFamily: "inherit" }} axisLine={false} tickLine={false} />
            <YAxis fontSize={11} tick={{ fill: "var(--text-tertiary)", fontFamily: "inherit" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-2)" }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

// ─── Monthly Trend Chart ──────────────────────────────────────────────────────
export function MonthlyTrendChart({ allExpenses }) {
  const trendData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - (5 - i));
    const key   = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleString("default", { month: "short" });
    const total = allExpenses.filter((e) => e.date.startsWith(key)).reduce((s, e) => s + e.amount, 0);
    return { month: label, amount: total };
  });

  const max = Math.max(...trendData.map((d) => d.amount));

  return (
    <Card style={{ flex: 1, minWidth: 280 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-.01em" }}>
          Monthly trend
        </h3>
        <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 2 }}>Last 6 months</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--accent)" stopOpacity={0.12} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" fontSize={11} tick={{ fill: "var(--text-tertiary)", fontFamily: "inherit" }} axisLine={false} tickLine={false} />
          <YAxis fontSize={11} tick={{ fill: "var(--text-tertiary)", fontFamily: "inherit" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-2)", strokeWidth: 1 }} />
          <Area type="monotone" dataKey="amount" stroke="var(--accent)" strokeWidth={2}
            fill="url(#areaGrad)" dot={{ fill: "var(--accent)", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "var(--accent)", strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
