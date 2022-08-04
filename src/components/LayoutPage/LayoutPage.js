import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import ModalUI from './ModalUI';
import classes from './LayoutPage.module.css';
import { modalActions } from './modalSlice';

import { PlusSquareOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;

function getItem(label, key, icon, path, children) {
  return {
    label,
    key,
    icon,
    path,
    children,
  };
}

const menuItems = [
  getItem('Create Room', 'createRoom', <PlusSquareOutlined />, '/rooms/new'),
];

const logoutItem = [getItem('Logout', '9', <LogoutOutlined />)];

const LayoutPage = () => {
  const [current, setCurrent] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const currentPath = location.pathname;

  // Add Loading for creating Room - roomState.isLoading and userState.isLoading

  useEffect(() => {
    const getRooms = async () => {
      const response = await fetch(
        `http://localhost:8080/api/${user.id}/rooms/`
      );
      const data = await response.json();
      console.log(data);
      setRooms([
        ...data.map((room) =>
          getItem(`${room.name}`, `${room.id}`, null, `/rooms/${room.id}`)
        ),
      ]);
    };
    getRooms();
  }, [user]);

  useEffect(() => {
    // If a menu item path correspons with the current url path, then set that menu item active
    const menus = [...menuItems, ...rooms];
    menus.forEach((item) => {
      if (item.path === currentPath) setCurrent(item.key);
    });
  }, [currentPath, rooms]);

  const onClickRooms = (e) => {
    // Set current active menu item
    if (e.key === 'createRoom') {
      navigate('rooms/new');
      return;
    } else navigate(`/rooms/${e.key}`);
  };

  const onLogout = (e) => {
    dispatch(modalActions.openModal('Logout'));
    setCurrent('');
    // Log out the user
  };

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
          <Menu
            theme='dark'
            selectedKeys={[current]}
            mode='inline'
            items={menuItems}
            onClick={onClickRooms}
          />
          <br />
          <br />

          <Menu
            theme='dark'
            selectedKeys={[current]}
            mode='inline'
            items={rooms}
            onClick={onClickRooms}
          />

          <div className={classes.logout}>
            <Menu
              theme='dark'
              selectedKeys={['']}
              onClick={onLogout}
              mode='vertical'
              items={logoutItem}
              style={{
                fontSize: '16px',
              }}
            />
          </div>
        </Sider>
        <Layout className='site-layout'>
          <Content>
            <div
              className={classes['layout-content']}
              style={{
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <ModalUI></ModalUI>
    </>
  );
};

export default LayoutPage;
