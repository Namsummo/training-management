
import axios from "axios";
import { API_CONFIG } from "./config";

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
