import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export const axiosClient = axios.create({
  baseURL: `https://api.thecatapi.com/v1`,
  headers: { 'x-api-key': API_KEY },
});
