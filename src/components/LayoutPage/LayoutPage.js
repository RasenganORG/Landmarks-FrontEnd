import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import ModalUI from './ModalUI';
import classes from './LayoutPage.module.css';
import { roomActions, getRoomsForUser } from '../Rooms/roomSlice';

import { Layout } from 'antd';
import Spinner from './Spinner';
import MenuUI from './MenuUI';

const { Content, Sider } = Layout;

const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const {
    rooms,
    getRoom: { isLoading },
    userHasRooms,
  } = useSelector((state) => state.room);

  // Run only once
  // Fetch rooms from DB on application start or refresh
  useEffect(() => {
    if (!userHasRooms) dispatch(getRoomsForUser(user.id));
    dispatch(roomActions.resetActions('getRoom'));
  }, [userHasRooms, dispatch, user.id]);

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
          <MenuUI classes={classes} rooms={rooms} loading={isLoading} />
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
              {isLoading ? (
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
