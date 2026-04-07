import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5242/api",
  withCredentials: true
});