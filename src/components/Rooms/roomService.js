import axios from 'axios';

const API_ROOM = 'http://localhost:8080/api/room/';

// Create 'room' in DB
const createRoom = async (roomData) => {
  await axios.post(API_ROOM, roomData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // Returns 'room.id' string
  return roomData.id;
};

// Get 'room' by id
const getRoom = async (roomID) => {
  const response = await axios.get(`${API_ROOM}${roomID}`);

  // Returns 'room' object
  return response.data;
};

// update 'room' in DB
const addUserToRoomMembership = async ({ roomID, userID }) => {
  const response = await axios.put(
    `${API_ROOM}${roomID}`,
    { userID },
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

const roomService = { createRoom, addUserToRoomMembership, getRoom };

export default roomService;
