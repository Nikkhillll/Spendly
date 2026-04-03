# 💸 Spendly — Expense Tracker

A MERN-ready React frontend for tracking expenses by category, with charts and user auth.

---

## 🚀 How to Run

```bash
# 1. Open this folder in VS Code
cd spendly

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 📁 Folder Structure

```
spendly/
├── index.html                  ← HTML entry point
├── vite.config.js              ← Vite bundler config
├── package.json                ← Dependencies
└── src/
    ├── main.jsx                ← Renders <App /> into the DOM
    ├── App.jsx                 ← Root: theme + auth routing
    │
    ├── api/
    │   └── index.js            ← All API calls (mock now → axios later)
    │
    ├── context/
    │   └── AuthContext.jsx     ← Global auth state (user, login, logout)
    │
    ├── utils/
    │   └── constants.js        ← CATEGORIES, CAT_COLORS, CAT_ICONS
    │
    └── components/
        ├── shared/
        │   ├── UI.jsx          ← Input, Select, Button, Card
        │   └── Navbar.jsx      ← Top navigation bar
        │
        ├── auth/
        │   ├── AuthPage.jsx    ← Auth screen wrapper (tab toggle)
        │   ├── LoginForm.jsx   ← Login form
        │   └── RegisterForm.jsx← Register form
        │
        ├── dashboard/
        │   ├── Dashboard.jsx   ← Main page (composes everything)
        │   ├── StatCard.jsx    ← Single metric card
        │   ├── Charts.jsx      ← CategoryChart + MonthlyTrendChart
        │   └── CategoryBreakdown.jsx ← Category list with %
        │
        └── expenses/
            ├── ExpenseList.jsx ← List of expense rows
            └── AddExpenseModal.jsx ← Add expense popup
```

---

## 🔌 How to Connect Your Backend (when ready)

All mock API logic lives in ONE file: `src/api/index.js`

Replace each function with an axios call:

```js
// BEFORE (mock)
export const login = (email, password) => {
  const user = db.users.find(...);
  ...
};

// AFTER (real backend)
import axios from "axios";
export const login = (email, password) =>
  axios.post("/api/auth/login", { email, password }).then(res => res.data);
```

That's the only file you need to change. Every component stays the same.

---

## 📦 Dependencies

| Package    | Purpose                  |
|------------|--------------------------|
| react      | UI framework             |
| react-dom  | DOM rendering            |
| recharts   | Pie + bar charts         |
| vite       | Dev server + bundler     |

---

## 🧭 Your Backend Learning Path

| Week | What to Build                                      |
|------|----------------------------------------------------|
| 1    | Express server + MongoDB connection + models       |
| 2    | POST /api/auth/register and /login with JWT        |
| 3    | GET/POST/DELETE /api/expenses with auth middleware |
| 4    | Swap `src/api/index.js` mock → real axios calls    |
