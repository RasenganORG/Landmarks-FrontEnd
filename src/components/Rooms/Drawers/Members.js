import { List } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../SocketIO/socket';
import { roomActions } from '../roomSlice';
import classes from './Members.module.css';

export default function Members({ members, ownerID, currentUserID, chatID }) {
  const { onlineUsers } = useSelector((state) => state.room);
  const [online, setOnline] = useState([]);
  const [offline, setOffline] = useState([]);
  const dispatch = useDispatch();

  socket.on('getUserRooms', ({ room: roomID, users }) => {
    dispatch(roomActions.setOnlineUsers({ room: roomID, users }));
    console.log('here');
  });

  useEffect(() => {
    console.log(onlineUsers);
    setOnline(
      members.filter((el) => {
        return onlineUsers.some((foo) => foo.id === el.id);
      })
    );
    setOffline(
      members.filter((el) => {
        return onlineUsers.every((foo) => foo.id !== el.id);
      })
    );
  }, [onlineUsers, members, chatID]);

  // console.log('online', online);
  // console.log('offline', offline);

  return (
    <>
      {online.length > 0 && (
        <List
          dataSource={online}
          renderItem={(item) => (
            <List.Item
              key={item.email}
              className={
                currentUserID === item.id ? classes['current-user'] : ''
              }
              style={{ padding: '10px' }}
            >
              <List.Item.Meta
                title={item.name}
                description={ownerID === item.id ? 'Admin' : 'Member'}
              />
              <div className={classes['status']}></div>
            </List.Item>
          )}
        />
      )}
      {offline.length > 0 && (
        <List
          className={classes['offline-users']}
          dataSource={offline}
          renderItem={(item) => (
            <List.Item
              key={item.email}
              className={
                currentUserID === item.id ? classes['current-user'] : ''
              }
              style={{ padding: '10px' }}
            >
              <List.Item.Meta
                title={item.name}
                description={ownerID === item.id ? 'Admin' : 'Member'}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
}
