import axios from "axios";

const api = axios.create({
  baseURL: "https://worktask-zb5c.onrender.com/api",
  withCredentials: true,
});

export default api;