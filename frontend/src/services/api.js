
import axios from "axios";

const BACKEND_URL = "https://tribe-green-api.onrender.com";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const IMAGE_BASE_URL = BACKEND_URL;

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return `${IMAGE_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

export default api;
