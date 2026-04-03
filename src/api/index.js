import axios from "axios";

// All requests go to your Express server
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Automatically attach the JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("et_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Auth ──────────────────────────────────────────────────────────────────────
export const register = async (name, email, password) => {
  const res = await API.post("/auth/register", { name, email, password });
  return res.data; // { token, user }
};

export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data; // { token, user }
};

// ── Expenses ──────────────────────────────────────────────────────────────────
export const getExpenses = async () => {
  const res = await API.get("/expenses");
  return res.data; // array of expenses
};

export const addExpense = async (data) => {
  const res = await API.post("/expenses", data);
  return res.data; // the new expense object
};

export const deleteExpense = async (id) => {
  await API.delete(`/expenses/${id}`);
};