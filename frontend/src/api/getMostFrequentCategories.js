import axios from "axios";

const API_URL = require('./config.js');

export async function getMostFrequentCategories(userId, year) {
  try {
    const response = await axios.get(`${API_URL}/trend/most-frequent-categories/${userId}/${year}`);
    if (response.status === 200) {
      return response.data;
    } 
    // Handle other non-200 status codes as errors
    console.log('Unknown error (getMostFrequentCategories):', response);
    return response;
  } catch (error) {
    // Handle 404 errors separately
    if (error.response && error.response.status === 404) {
      console.log('No categories found 404 (getMostFrequentCategories):', error.response);
      return error.response;
    } 
    console.error('Error in connection (getMostFrequentCategories):', error.response);
    return error.response;
  }
}