import axios from "axios";
import { config } from "../config";

export const apiInstance = axios.create({
  baseURL: config.API_PATH,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});
