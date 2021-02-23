import axios from "axios";

export const instance = axios.create({
  baseURL: "https://10.10.10.10:8443/api/",
});
