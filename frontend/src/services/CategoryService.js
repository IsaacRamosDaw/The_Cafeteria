import axios from "axios";

const API_URL = "http://localhost:5000/api/categories"; // Cambia el puerto si es necesario

export const fetchCategories = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createCategory = async (category) => {
    const response = await axios.post(API_URL, category);
    return response.data;
};

export const updateCategory = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
