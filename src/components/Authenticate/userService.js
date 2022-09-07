import axios from 'axios';

const API_USER = 'http://localhost:8080/api/users/user/';
const API_REGISTER = 'http://localhost:8080/api/auth/register/';
const API_LOGIN = 'http://localhost:8080/api/auth/login/';

const register = async (userData) => {
  const response = await axios.post(API_REGISTER, userData, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
    },
  });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
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
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem('user');
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
