import { PlusSquareOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import ModalUI from './ModalUI';
import classes from './LayoutPage.module.css';
import { modalActions } from './modalSlice';

const { Header, Content, Sider } = Layout;

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
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentPath = location.pathname;

  useEffect(() => {
    menuItems.forEach((item) =>
      setCurrent(item.path === currentPath ? item.key : '')
    );
  }, [currentPath]);

  const onClickRooms = (e) => {
    // Set current active menu item
    if (e.key === 'createRoom') {
      navigate('rooms/new');
      return;
    }
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
          <Header
            className='site-layout-background'
            style={{
              padding: 0,
            }}
          />
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <div
              className={classes['layout-content']}
              style={{
                padding: 24,
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
