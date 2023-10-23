import axios from "axios";

const API_URL = require('./config.js');

export async function getDailyAverageOverview(userId, year) {
  try {
    const response = await axios.get(`${API_URL}/trend/daily-average-overview/${userId}/${year}`);
    if (response.status === 200) {
      return response.data;
    } 
    console.log('Unknown error (getDailyAverageOverview):', response);
    return response;
  } catch (error) {
    console.error('Error in connection (getDailyAverageOverview):', error.response);
    return error.response;
  }
}