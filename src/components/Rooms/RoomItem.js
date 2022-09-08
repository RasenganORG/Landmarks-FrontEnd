import { Layout, Menu, Col, Row, Typography, Tooltip } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import classes from './RoomItem.module.css';
import Spinner from '../Home/Spinner';
import DrawerUI from './Drawers/DrawerUI';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { drawerActions } from './Drawers/drawerSlice';
import { useEffect } from 'react';
import { chatActions, getMessages } from '../Chat/chatSlice';
import socket from '../SocketIO/socket';
import { roomActions } from './roomSlice';

export function RoomItem() {
  const { roomID } = useParams();
  const dispatch = useDispatch();

  const currentRoom = useSelector((state) =>
    state.room.rooms?.find((room) => room.id === roomID)
  );
  const { id: currentUserID, name } = useSelector((state) => state.user.user);
  const currentDrawer = useSelector((state) => state.drawer.currentDrawer);
  const currentChat = useSelector((state) => state.room.currentChat);

  useEffect(() => {
    if (currentRoom) {
      dispatch(getMessages(currentRoom.chatID));
      dispatch(roomActions.setCurrentChat(currentRoom.chatID));
      dispatch(chatActions.reset());
    }
  }, [currentRoom, dispatch, currentUserID]);

  useEffect(() => {
    if (currentChat) {
      socket.emit('joinRoom', {
        id: currentUserID,
        chatID: currentChat,
        name: name,
      });
    }
  }, [currentChat, currentUserID, name]);

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
