import axios from "axios";

export const instance = axios.create({
  baseURL: "http://10.10.10.10:8443/api/",
});
