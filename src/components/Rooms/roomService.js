import axios from 'axios';

const API_ROOM = 'http://localhost:8080/api/room/';

// Create 'room' in DB
const createRoom = async (data) => {
  await axios.post(API_ROOM, data.room, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // Returns data{room{}, members[],chat[]}
  return data;
};

// Create 'room' in DB
const getRoomsForUser = async (userID) => {
  const res = await axios.get(`http://localhost:8080/api/${userID}/rooms/`);
  // Returns roomsArray
  return res.data;
};

// update 'room' in DB
const addUserToRoomMembership = async ({ roomToken, userID }) => {
  const response = await axios.put(
    `${API_ROOM}${roomToken}`,
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

const roomService = { createRoom, addUserToRoomMembership, getRoomsForUser };

export default roomService;
