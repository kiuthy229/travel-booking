import axios from 'axios';

const token = localStorage.getItem('token');

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const get = async (url, params = {}, token = '') => {
  try {
    const { data: responseData } = await apiClient.get(url, {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
    return responseData.data;
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};

export const post = async (url, data, token = '') => {
  try {
    const { data: responseData } = await apiClient.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return responseData.data;
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

export const put = async (url, data, token = '') => {
  try {
    const { data: responseData } = await apiClient.put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return responseData.data;
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

export const del = async (url, token = '') => {
  try {
    const { data: responseData } = await apiClient.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return responseData.data;
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};

export default apiClient;
