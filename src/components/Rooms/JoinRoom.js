import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  roomActions,
  addUserToRoomMembership,
  getRoomsForUser,
} from './roomSlice';
import Spinner from '../Home/Spinner';
import { errorToast } from '../../helpers/messageToast';

export default function JoinRoom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inviteToken } = useParams();

  const {
    rooms,
    joinRoom: { isError, isSuccess },
    message,
    newRoom,
  } = useSelector((state) => state.room);
  const userID = useSelector((state) => state.user.user.id);
  const room = rooms.find((room) => room.inviteToken === inviteToken);

  useEffect(() => {
    if (room) {
      navigate(`/rooms/${room.id}`);
    } else {
      dispatch(addUserToRoomMembership({ roomToken: inviteToken, userID }));
    }
  }, [room, inviteToken, navigate, dispatch, userID]);

  useEffect(() => {
    if (isError) {
      navigate(`/rooms/`);
      errorToast(message);
    }
    if (newRoom && isSuccess) {
      dispatch(getRoomsForUser(userID));
      navigate(`/rooms/${newRoom.id}`, { replace: true });
    }
    dispatch(roomActions.resetActions('joinRoom'));
  }, [dispatch, navigate, isError, isSuccess, message, newRoom, userID]);

  return <Spinner tip='Joining room...' />;
}
