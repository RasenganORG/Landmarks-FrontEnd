import axios from 'axios';

const API_GET_LOGGED_USER = 'http://localhost:8080/api/getLoggedUser/';
const API_USER = 'http://localhost:8080/api/user/';

const register = async (userData) => {
  const response = await axios.post(API_USER, userData, {
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
  const response = await axios.get(
    `${API_GET_LOGGED_USER}${userData.email}/?pwd=${userData.password}`
  );

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
