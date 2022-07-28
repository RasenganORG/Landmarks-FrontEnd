import { PlusSquareOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import classes from './LayoutPage.module.css';

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

const LayoutPage = () => {
  const [current, setCurrent] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
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
  );
};

export default LayoutPage;
