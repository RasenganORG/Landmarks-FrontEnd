import axios from 'axios';

const API_POST_ROOM = 'http://localhost:8080/api/room/';

// Create Room by updating user's roomList
const addRoomToDB = async (roomData) => {
  const response = await axios.post(API_POST_ROOM, roomData, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
    },
  });
  // Returns room object
  return response.data;
};

const roomService = { addRoomToDB };

export default roomService;
