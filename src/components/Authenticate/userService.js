import axios from 'axios';

const API_USER = 'http://localhost:8080/api/user/';
const API_REGISTER = 'http://localhost:8080/api/register/';
const API_LOGIN = 'http://localhost:8080/api/login/';
const API_LOGOUT = 'http://localhost:8080/api/logout/';

const register = async (userData) => {
  const response = await axios.post(API_REGISTER, userData, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
    },
  });

  if (response.data) {
    // localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_LOGIN, userData, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
    },
  });

  if (response.data) {
    // localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${API_LOGOUT}`);

  if (response.data) {
    localStorage.removeItem('user');
  }
  return response.data;
};

// update User in DB
const updateUser = async ({ userID, roomList }) => {
  const response = await axios.put(
    `${API_USER}${userID}`,
    { roomList },
    {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  // Returns user object
  return response.data;
};

const userService = { register, login, logout, updateUser };

export default userService;
