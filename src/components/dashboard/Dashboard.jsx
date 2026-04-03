import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getExpenses, addExpense as apiAdd, deleteExpense as apiDelete } from "../../api";
import Navbar from "../shared/Navbar";
import StatCard from "./StatCard";
import { CategoryChart, MonthlyTrendChart } from "./Charts";
import CategoryBreakdown from "./CategoryBreakdown";
import ExpenseList from "../expenses/ExpenseList";
import AddExpenseModal from "../expenses/AddExpenseModal";
import { Card } from "../shared/UI";

export default function Dashboard() {
  const { user } = useAuth();
  const [expenses, setExpenses]       = useState([]);
  const [showModal, setShowModal]     = useState(false);
  const [activeTab, setActiveTab]     = useState("overview");
  const [filterMonth, setFilterMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getExpenses();
        setExpenses(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleAdd = async (data) => {
    const exp = await apiAdd(data);
    setExpenses((p) => [exp, ...p]);
  };

  const handleDelete = async (id) => {
    await apiDelete(id);
    setExpenses((p) => p.filter((e) => e._id !== id));
  };

  // Derived
  const totalAll    = expenses.reduce((s, e) => s + e.amount, 0);
  const monthlyExp  = expenses.filter((e) => e.date.startsWith(filterMonth));
  const monthTotal  = monthlyExp.reduce((s, e) => s + e.amount, 0);
  const topCategory = Object.entries(
    monthlyExp.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + e.amount; return acc; }, {})
  ).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  const avgPerDay = monthlyExp.length > 0
    ? (monthTotal / new Date().getDate()).toFixed(0)
    : 0;

  const tabs = [
    { id: "overview",  label: "Overview" },
    { id: "expenses",  label: `Transactions` },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar onAddExpense={() => setShowModal(true)} />

      <div style={{ maxWidth:"80%", margin: "0 auto", padding: "28px 40px" }}>

        {/* Page header */}
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.03em", color: "var(--text-primary)" }}>
              Dashboard
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 3 }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          {/* Month picker */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <label style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 500 }}>Period</label>
            <input type="month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}
              style={{
                padding: "6px 10px", fontSize: 13, fontFamily: "inherit",
                color: "var(--text-primary)",
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", outline: "none", cursor: "pointer",
              }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: 24, gap: 0 }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "8px 16px", border: "none",
              borderBottom: `2px solid ${activeTab === tab.id ? "var(--text-primary)" : "transparent"}`,
              background: "transparent", fontFamily: "inherit",
              fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? "var(--text-primary)" : "var(--text-tertiary)",
              cursor: "pointer", transition: "all .15s",
              marginBottom: -1,
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Overview ──────────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <>
            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 20 }}>
              <StatCard label="All-time total"   value={totalAll}        icon="◈" />
              <StatCard label="This month"       value={monthTotal}      icon="▦" sub={`${monthlyExp.length} transactions`} />
              <StatCard label="Daily average"    value={avgPerDay}       icon="∿" sub="this month" />
              <StatCard label="Top category"     value={topCategory}     icon="◉" isText />
            </div>

            {/* Charts row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <CategoryChart expenses={monthlyExp} />
              <MonthlyTrendChart allExpenses={expenses} />
            </div>

            {/* Category breakdown */}
            <CategoryBreakdown expenses={monthlyExp} />
          </>
        )}

        {/* ── Transactions ──────────────────────────────────────────────────── */}
        {activeTab === "expenses" && (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            {/* Table header */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
            }}>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
                  Transactions
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 2 }}>
                  {monthlyExp.length} records · ₹{monthTotal.toLocaleString("en-IN")} total
                </p>
              </div>
              <input type="month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}
                style={{
                  padding: "6px 10px", fontSize: 13, fontFamily: "inherit",
                  color: "var(--text-primary)",
                  background: "var(--surface-2)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", outline: "none", cursor: "pointer",
                }}
              />
            </div>

            {loading ? (
              <div style={{ padding: "40px", textAlign: "center", color: "var(--text-tertiary)", fontSize: 13 }}>
                Loading transactions…
              </div>
            ) : (
              <ExpenseList expenses={monthlyExp} onDelete={handleDelete} />
            )}
          </Card>
        )}
      </div>

      {showModal && <AddExpenseModal onAdd={handleAdd} onClose={() => setShowModal(false)} />}
    </div>
  );
}
