import { Layout, Menu, Col, Row, Typography, Tooltip } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import classes from './RoomItem.module.css';
import Spinner from '../Home/Spinner';
import DrawerUI from './Drawers/DrawerUI';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { drawerActions } from './Drawers/drawerSlice';
import { useEffect, useContext, useState } from 'react';
import { chatActions, getMessages } from '../Chat/chatSlice';
import { WebSocketContext } from '../SocketIO/socket';
import { roomActions } from './roomSlice';

export function RoomItem() {
  const { roomID } = useParams();
  const dispatch = useDispatch();
  const { socket } = useContext(WebSocketContext);
  const [newMessage, setNewMessage] = useState(null);

  const currentRoom = useSelector((state) =>
    state.room.rooms?.find((room) => room.id === roomID)
  );
  const { id: currentUserID, name } = useSelector((state) => state.user.user);
  const currentDrawer = useSelector((state) => state.drawer.currentDrawer);
  const currentChat = useSelector((state) => state.room.currentChat);

  useEffect(() => {
    if (currentRoom) {
      dispatch(getMessages(currentRoom.chatId));
      dispatch(roomActions.setCurrentChat(currentRoom.chatId));
      dispatch(chatActions.reset());
    }
  }, [currentRoom, dispatch, currentUserID]);

  useEffect(() => {
    if (currentChat) {
      socket.emit('joinRoom', {
        id: currentUserID,
        chatId: currentChat,
        name: name,
      });
      console.log('joinRoom socket event');
      const getUserRoomsHandler = ({ chatId, users }) => {
        console.log('getUserRooms');
        // console.log('chatId', chatId);
        // const currentChatUsers = users.map((user) => user.id);
        // const currentRoomMembers = currentRoom.members.map(
        //   (member) => member.id
        // );
        // console.log('currentChatUsers', currentChatUsers);
        // console.log('currentRoomMembers', currentRoomMembers);
        // console.log('currentRoom', currentRoom);
        // dispatch(roomActions.setOnlineUsers({ room: roomID, currentChatUsers }));
      };
      socket.on('getUserRooms', getUserRoomsHandler);
      return () => {
        socket.removeListener('joinRoom');
        socket.removeListener('getUserRooms');
      };
    }
  }, [currentChat, socket]);

  useEffect(() => {
    const getOtherUsersMessagesHandler = (message) => {
      console.log('getMessage from other users', message);
      setNewMessage(message);
    };
    socket.on('getMessage', getOtherUsersMessagesHandler);
    return () => {
      socket.removeListener('getMessage');
    };
  }, [socket]);

  useEffect(() => {
    newMessage &&
      newMessage.chatId === currentChat &&
      dispatch(chatActions.addMessage(newMessage)) &&
      console.log('newMessage', newMessage);
  }, [newMessage, dispatch]);

  if (!currentRoom) return <Spinner tip='Searching for room...' />;

  const roomNavItems = [
    {
      key: 'Chat',
      label: 'Chat',
    },
    {
      key: 'Members',
      label: 'Members',
    },
    {
      key: 'Landmark',
      label: 'Add Landmark',
    },
    {
      key: 'Event',
      label: 'Add Event',
    },
    {
      key: 'Edit',
      label: 'Edit',
    },
    currentUserID === currentRoom.ownerID
      ? {
          key: 'Invite',
          label: (
            <Tooltip
              title='Invite link has been generated.'
              trigger={'click'}
              mouseLeaveDelay={0}
            >
              <span>{`Invite Code: ${currentRoom.inviteToken}`}</span>
            </Tooltip>
          ),
        }
      : null,
  ];

  const handleMenuItemClick = ({ key }) => {
    // console.log('key', key);
    // console.log('last drawer opened', currentDrawer);
    if (key === currentDrawer) {
      dispatch(drawerActions.closeDrawer());
      return;
    }
    if (key === 'Chat') {
      // Open Chat Drawer
      dispatch(drawerActions.changeDrawer(key));
      dispatch(drawerActions.openDrawer());
    }
    if (key === 'Members') {
      // Open Members Drawer
      dispatch(drawerActions.changeDrawer(key));
      dispatch(drawerActions.openDrawer());
    }

    if (key === 'Invite') {
      navigator.clipboard.writeText(
        `http://localhost:3000/rooms/join/${currentRoom.inviteToken}`
      );
    }
  };

  return (
    <Layout
      id='LayoutContent'
      style={{
        minWidth: '100%',
        // padding: '0 10px',
      }}
    >
      <Row>
        <Col span={4}>
          <div className={classes['room-name']}>
            <Typography.Title level={3} style={{ margin: 0, color: 'aqua' }}>
              {currentRoom.name}
            </Typography.Title>
          </div>
        </Col>
        <Col span={20}>
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={[currentDrawer]}
            selectedKeys={[currentDrawer]}
            onClick={handleMenuItemClick}
            items={roomNavItems}
          />
        </Col>
      </Row>
      <Content>
        <div className={classes['map-container']}></div>
      </Content>
      <DrawerUI room={currentRoom} currentUserID={currentUserID} />
    </Layout>
  );
}
