import axios from "axios";

// should come from .env, have interceptors, abortController and stuff
// for now just baseURL
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 1000,
});
