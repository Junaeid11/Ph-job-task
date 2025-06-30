export const API_BASE_URL = "https://event-server-ashy.vercel.app/api";

// Helper for fetch
export const apiFetch = (endpoint: string, options?: RequestInit): Promise<Response> => {
  return fetch(`${API_BASE_URL}${endpoint}`, options);
};

// Helper for axios
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

