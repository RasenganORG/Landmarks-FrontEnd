import axios from 'axios';

const API_GET_LOGGED_USER = 'http://localhost:8080/api/getLoggedUser/';
const API_REGISTER_USER = 'http://localhost:8080/api/user/';

//register user
const register = async (userData) => {
  const response = await axios.post(API_REGISTER_USER, userData, {
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
  const response = await axios.get(
    `${API_GET_LOGGED_USER}${userData.email}/?pwd=${userData.password}`
  );

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
