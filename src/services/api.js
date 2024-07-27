import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v4';

export const getProducts = () => axios.get(`${API_URL}/product`);
export const getProductById = (id) => {
  if (!id) throw new Error('ID is required');
  return axios
    .get(`${API_URL}/product/${id}`)
    .then((response) => response)
    .catch((error) => {
      console.error(`Error fetching product by ID: ${error}`);
      throw error;
    });
};
export const createProduct = (product) => axios.post(`${API_URL}/product`, product);
export const updateProduct = (id, product) => {
  if (!id) throw new Error('ID is required');
  return axios
    .put(`${API_URL}/product/${id}`, product)
    .then((response) => response)
    .catch((error) => {
      console.error(`Error updating product: ${error}`);
      throw error;
    });
};
export const deleteProduct = (id) => {
  if (!id) throw new Error('ID is required');
  return axios
    .delete(`${API_URL}/product/${id}`)
    .then((response) => response)
    .catch((error) => {
      console.error(`Error deleting product: ${error}`);
      throw error;
    });
};
