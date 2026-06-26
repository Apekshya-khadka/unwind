import axios from "axios";
import { getToken, clearToken } from "./auth.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://unwind-qhzl.onrender.com",
});

// Attach the admin token (if logged in) to every request automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If an admin session expires or is invalid, clear it and send them to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && getToken()) {
      clearToken();
      if (typeof window !== "undefined") window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);

export const getCabins = (params) => api.get("/cabins", { params }).then((r) => r.data);
export const getCabin = (id) => api.get(`/cabins/${id}`).then((r) => r.data);
export const getRegions = () => api.get("/cabins/meta/regions").then((r) => r.data);
export const getFaqs = () => api.get("/faqs").then((r) => r.data);
export const joinNewsletter = (email) => api.post("/newsletter", { email }).then((r) => r.data);
export const getExperiences = (params) => api.get("/experiences", { params }).then((r) => r.data);
export const getExperience = (id) => api.get(`/experiences/${id}`).then((r) => r.data);
export const createBooking = (payload) => api.post("/bookings", payload).then((r) => r.data);

// Admin-only (requires a logged-in admin session)
export const getSubscribers = () => api.get("/newsletter").then((r) => r.data);
export const getBookings = () => api.get("/bookings").then((r) => r.data);
export const getContactMessages = () => api.get("/contact").then((r) => r.data);

// Auth + public contact form
export const adminLogin = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);
export const sendContactMessage = (payload) => api.post("/contact", payload).then((r) => r.data);

export default api;
