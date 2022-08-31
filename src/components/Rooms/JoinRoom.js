import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { roomActions, addUserToRoomMembership } from './roomSlice';
import Spinner from '../LayoutPage/Spinner';

export default function JoinRoom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inviteToken } = useParams();

  const rooms = useSelector((state) => state.room.rooms);
  const userID = useSelector((state) => state.user.user.id);

  useEffect(() => {
    if (rooms.length > 0) {
      console.log(rooms);
      // Check in the existing rooms if there is any room that has the same inviteToken
      const room = rooms.find((room) => room.inviteToken === inviteToken);

      if (inviteToken === room?.roomToken) navigate(`/rooms/${room.roomID}`);
      else {
        dispatch(addUserToRoomMembership({ roomToken: inviteToken, userID }));
      }
    }
  }, [rooms, inviteToken, navigate]);

  // useEffect(() => {
  //   if (roomState.isError) {
  //     console.log(roomState.message);
  //   }
  //   if (roomState.isSuccess) {
  //     const userRooms = [...userState.user.roomList];
  //     const roomMembers = [...roomState.newRoom.members];

  //     if (!userRooms.includes(roomState.newRoom.id)) {
  //       // Add room ID to user.roomList
  //       userRooms.push(roomState.newRoom.id);
  //       // Add user ID to room.members
  //       roomMembers.push(userState.user.id);
  //       dispatch(
  //         updateUser({ userID: userState.user.id, roomList: userRooms })
  //       );
  //       dispatch(
  //         addUserToRoomMembership({
  //           roomID: roomState.newRoom.id,
  //           members: roomMembers,
  //         })
  //       );
  //     }
  //   }
  //   // dispatch(userActions.reset());
  //   // dispatch(roomActions.reset());
  // }, [userState, dispatch, roomState, navigate]);

  return <Spinner tip='Joining room...' />;
}
