import 'antd/dist/antd.min.css';
import classes from './SideMenu.module.css';

import { modalActions } from '../../../store/modal-slice';
import { useDispatch } from 'react-redux';

import { useState } from 'react';
import {
  WindowsOutlined,
  PlusSquareOutlined,
  RightSquareOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Menu, Col, Row } from 'antd';

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const rooms = [
  getItem('Create Room', '1', <PlusSquareOutlined />),
  getItem('Join Room', '2', <RightSquareOutlined />),
  getItem('Rooms', '3', <WindowsOutlined />, [
    getItem('Room 1', '4'),
    getItem('Room 2', '5'),
    getItem('Room 3', '6'),
  ]),
];

const logoutItem = [getItem('Logout', '9', <LogoutOutlined />)];

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(true);
  const [current, setCurrent] = useState('');

  const dispatch = useDispatch();

  const siderCollapse = (value) => {
    setCollapsed(value);
  };

  const openRoom = (e) => {
    // Set current active menu item
    // If either 'Create Room' or 'Join Room' was clicked then instead of setting active item
    // open appropriate modal
    if (e.key === '1') {
      // Open Create Room modal
      dispatch(modalActions.openModal('Create'));
      setCurrent('');
      return;
    }
    if (e.key === '2') {
      // Open Join Room modal
      dispatch(modalActions.openModal('Join'));
      setCurrent('');
      return;
    }

    setCurrent(e.key);
    // Open room drawer
    // Check if room has map
    // If it has a map, then open map in center and chat in the right drawer
    // If it does not have a map, then open chat in center
  };

  const onStartWhichRoomToOpen = () => {
    // If a room was left open when the app was closed - open that room
    // - contiune from where the user left off

    // Else if there are rooms created, open the Rooms submenu

    // Else open modal asking the user to Create Room or Join Room
    return current;
  };

  const logout = (e) => {
    dispatch(modalActions.openModal('Logout'));
    setCurrent('');
    // Log out the user
  };

  return (
    <Sider
      width={300}
      collapsible
      collapsed={collapsed}
      onCollapse={siderCollapse}
      // style={{
      //   overflow: 'auto',
      //   height: '100vh',
      //   position: 'fixed',
      //   left: 0,
      //   top: 0,
      //   bottom: 0,
      // }}
    >
      <Row gutter={[0, 16]} align='middle' justify='space-around'>
        {/* Logo Column */}
        <Col span={24} align='middle'>
          {/* <div className={classes.logo} /> */}
        </Col>
        {/* Avatar Column */}
        <Col span={24} align='middle'>
          <Avatar size={60}>USER</Avatar>
        </Col>
        {/* Horizontal menu acting as buttons */}
        <Col span={24}>
          <Menu
            theme='dark'
            defaultOpenKeys={['']}
            selectedKeys={[onStartWhichRoomToOpen()]}
            onClick={openRoom}
            mode='inline'
            items={rooms}
            style={{
              fontSize: '16px',
            }}
          />
        </Col>
      </Row>
      <div className={classes.logout}>
        <Menu
          theme='dark'
          selectedKeys={['']}
          onClick={logout}
          mode='vertical'
          items={logoutItem}
          style={{
            fontSize: '16px',
          }}
        />
      </div>
    </Sider>
  );
}
