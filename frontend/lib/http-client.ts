import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.BACKEND_URL!
})