import axios from "axios";

const API_URL = require('./config.js');

export async function getBiggestSpending(userId, year) {
  try {
    const response = await axios.get(`${API_URL}/trend/biggest-spending/${userId}/${year}`);
    if (response.status === 200) {
      return response.data;
    } 
    // Handle other non-200 status codes as errors
    console.log('Unknown error (getBiggestSpending):', response);
    return response;
  } catch (error) {
    // Handle 404 errors separately
    if (error.response && error.response.status === 404) {
      console.log('No transactions found 404 (getBiggestSpending):', error.response);
      return error.response;
    } 
    console.error('Error in connection (getBiggestSpending):', error.response);
    return error.response;
  }
}