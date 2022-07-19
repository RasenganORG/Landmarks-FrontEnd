import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users/';

//register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log(response.data);
  return response.data;
};

const authService = { register };

export default authService;
