import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../Authenticate/userSlice';
import { getRoom, roomActions, addUserToRoomMembership } from './roomSlice';
import Spinner from '../LayoutPage/Spinner';

export default function JoinRoom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roomID } = useParams();
  const userState = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);

  useEffect(() => {
    if (userState.user.roomList.some((id) => id === roomID))
      navigate(`/rooms/${roomID}`);
    else {
      dispatch(getRoom(roomID));
    }
  }, [dispatch, roomID, navigate, userState]);

  useEffect(() => {
    if (roomState.isError) {
      console.log(roomState.message);
    }
    if (roomState.isSuccess) {
      const userRooms = [...userState.user.roomList];
      const roomMembers = [...roomState.newRoom.members];

      if (!userRooms.includes(roomState.newRoom.id)) {
        // Add room ID to user.roomList
        userRooms.push(roomState.newRoom.id);
        // Add user ID to room.members
        roomMembers.push(userState.user.id);
        dispatch(
          updateUser({ userID: userState.user.id, roomList: userRooms })
        );
        dispatch(
          addUserToRoomMembership({
            roomID: roomState.newRoom.id,
            members: roomMembers,
          })
        );
      }
    }
    // dispatch(userActions.reset());
    // dispatch(roomActions.reset());
  }, [userState, dispatch, roomState, navigate]);

  return <Spinner tip='Joining room...' />;
}
