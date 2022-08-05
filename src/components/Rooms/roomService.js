import axios from 'axios';

const API_ROOM = 'http://localhost:8080/api/room/';

// Create 'room' in DB
const addRoomToDB = async (roomData) => {
  const response = await axios.post(API_ROOM, roomData, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
    },
  });
  // Returns 'room' object
  return response.data;
};

// Get 'room' by id
const getRoom = async (roomID) => {
  const response = await axios.get(`${API_ROOM}${roomID}`);

  // Returns 'room' object
  return response.data;
};

// update 'room' in DB
const updateRoom = async ({ roomID, members }) => {
  const response = await axios.put(
    `${API_ROOM}${roomID}`,
    { members },
    {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json',
      },
    }
  );

  // Returns 'room' object
  return response.data;
};

const roomService = { addRoomToDB, updateRoom, getRoom };

export default roomService;
