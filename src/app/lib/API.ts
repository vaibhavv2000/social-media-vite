import axios from "axios";

const dev = false;
let local = "http://localhost:9000";
const prod = `https://social-media-server-7z5e.onrender.com`;

export const API_URL = dev ? local : prod;

export const API = axios.create({
 baseURL: `${API_URL}/api`,
 withCredentials: true,
});