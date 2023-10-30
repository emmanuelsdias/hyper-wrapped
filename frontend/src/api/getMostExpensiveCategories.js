import axios from "axios";

const API_URL = require('./config.js');

export async function getMostExpensiveCategories(userId, year) {
  try {
    const response = await axios.get(`${API_URL}/trend/most-expensive-categories/${userId}/${year}`);
    if (response.status === 200) {
      return response.data;
    } 
    // Handle other non-200 status codes as errors
    console.log('Unknown error (getMostExpensiveCategories):', response);
    return response;
  } catch (error) {
    // Handle 404 errors separately
    if (error.response && error.response.status === 404) {
      console.log('No categories found 404 (getMostExpensiveCategories):', error.response);
      return error.response;
    } 
    console.error('Error in connection (getMostExpensiveCategories):', error.response);
    return error.response;
  }
}