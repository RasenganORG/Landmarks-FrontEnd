import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import ModalUI from './ModalUI';
import classes from './LayoutPage.module.css';
import { roomActions } from '../Rooms/roomSlice';

import { Layout } from 'antd';
import Spinner from './Spinner';
import MenuUI from './MenuUI';

const { Content, Sider } = Layout;

const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const rooms = useSelector((state) => state.room.rooms);
  const [loading, setLoading] = useState(false);

  // Run only once
  // Fetch rooms from DB on application start or refresh
  useEffect(() => {
    const getRoomsForUser = async () => {
      try {
        // setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/${user.id}/rooms/`
        );

        if (!response.ok)
          throw new Error(`${response.status} ${response.statusText}`);

        const roomsArray = await response.json();
        console.log('getRoomsForUser response', roomsArray);
        dispatch(roomActions.addMultipleRooms(roomsArray));

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    if (rooms.length === 0) getRoomsForUser();
  }, []);

  return (
    <>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className='logo' />
          <div className={classes.avatar}>
            <p>{user.name}</p>
          </div>
          <MenuUI classes={classes} rooms={rooms} loading={loading} />
        </Sider>
        <Layout className='site-layout'>
          <Content>
            <div
              className={classes['layout-content']}
              style={{
                height: '100%',
                width: '100%',
              }}
            >
              {loading ? (
                <Spinner tip='Starting your next adventure...' />
              ) : (
                <Outlet />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
      <ModalUI></ModalUI>
    </>
  );
};

export default LayoutPage;
