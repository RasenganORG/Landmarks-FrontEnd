import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import classes from './LayoutPage.module.css';
import ModalUI from './ModalUI';
import Spinner from './Spinner';
import MenuUI from './MenuUI';
import { roomActions, getRoomsForUser } from '../Rooms/roomSlice';
import AvatarIcon from '../../helpers/AvatarIcon';

import { Layout, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [avatarClicked, setAvatarClicked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const {
    rooms,
    getRoom: { isLoading },
  } = useSelector((state) => state.room);

  const handleAvatarClick = () => {
    setAvatarClicked(true);
    navigate(`/profile/${user.name}`, { state: user.id });
  };

  // Run only once
  // Fetch rooms from DB on application start or refresh
  useEffect(() => {
    dispatch(getRoomsForUser(user.id));
    dispatch(roomActions.resetActions('getRoom'));
  }, [dispatch, user]);

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
          <div className={classes.avatar} onClick={handleAvatarClick}>
            <Avatar
              icon={
                user.avatar ? (
                  <AvatarIcon svg64={user.avatar} />
                ) : (
                  <UserOutlined />
                )
              }
              size={{ xs: 24, sm: 32, md: 40, lg: 50, xl: 70, xxl: 80 }}
              alt='ProfileAvatar'
            />
          </div>
          <MenuUI
            classes={classes}
            rooms={rooms}
            loading={isLoading}
            avatarClicked={avatarClicked}
            setAvatarClicked={setAvatarClicked}
          />
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
