import axios from "axios";

const api = axios.create({
  baseURL: "https://task2-ky99.onrender.com/api",
  withCredentials: true,
});

export default api;