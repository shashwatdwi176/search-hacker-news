// src/api.js
import axios from 'axios';

const BASE_URL = 'http://hn.algolia.com/api/v1';

export const searchPosts = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search?query=${query}`);
    return response.data.hits;
  } catch (error) {
    throw new Error('An error occurred while fetching the data.');
  }
};
