"use client";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API;
export default axios.create({
  baseURL: BASE_URL,
});
