import axios from "axios";

const API_URL = require('./config.js');

export async function loginWithUsername(username) {
  try {
    const response = await axios.post(`${API_URL}/user/login/${username}`);
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } 
    // Handle other non-200 status codes as errors
    console.log('Unknown error (loginWithUsername):', response);
    return response;
  } catch (error) {
    // Handle 404 errors separately
    if (error.response && error.response.status === 404) {
      console.log('User not found 404 (loginWithUsername):', error.response);
      return error.response;
    } 
    console.error('Error in connection (loginWithUsername):', error.response);
    return error.response;
  }
}