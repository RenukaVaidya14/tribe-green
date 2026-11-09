
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const IMAGE_BASE_URL = "http://localhost:5000";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return `${IMAGE_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

// Important: default export required by productService.js
export default api;
