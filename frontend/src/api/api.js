import axios from "axios";

const api = axios.create({
    baseURL: "https://aymenshakil.pythonanywhere.com/api",
});

export default api;