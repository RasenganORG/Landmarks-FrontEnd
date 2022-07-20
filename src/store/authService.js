import axios from 'axios';

const API_USER_URL = 'http://localhost:8080/api/user/';

//register user
const register = async (userData) => {
  const response = await axios.post(API_USER_URL, userData, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
    },
  });

  console.log('register response.data', response.data);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

//login user
const login = async (userData) => {
  const response = await axios.get(API_USER_URL + userData.name);

  console.log('login response.data', response.data);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem('user');
};

const authService = { register, login, logout };

export default authService;
