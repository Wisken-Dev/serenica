// src/api/ai.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

export const analyzeJournal = async (text) => {
  try {
    const res = await axios.post(`${API_URL}/analyze`, { text });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to analyze text" };
  }
};
