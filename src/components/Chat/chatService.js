import axios from 'axios';

const API_CHAT = 'http://localhost:8080/api/chat/';
const API_ADD_MESSAGE = 'http://localhost:8080/api/chat/addMessage';

// Create 'room' in DB
const addMessage = async (data) => {
  console.log(data);
  const res = await axios.post(API_ADD_MESSAGE, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // Returns data{ messages[ {}, ] }
  return res.data;
};

const getMessages = async (id) => {
  const res = await axios.get(`${API_CHAT}${id}`, id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // Returns data{ messages[ {}, ] }
  return res.data;
};

const chatService = { addMessage, getMessages };

export default chatService;
