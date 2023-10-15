import axios from "axios";

const API_URL = require('./config.js');

export async function getMonthlyOverview(userId, year) {
  try {
    const response = await axios.get(`${API_URL}/trend/monthly-overview/{${userId}/${year}`);
    if (response.status === 200) {
      return response.data;
    } 
    console.log('Unknown error (getMonthlyOverview):', response);
    return response;
  } catch (error) {
    console.error('Error in connection (getMonthlyOverview):', error.response);
    return error.response;
  }
}