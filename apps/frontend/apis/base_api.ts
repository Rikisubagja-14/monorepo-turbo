import axios from "axios";

const master = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

export { master };
