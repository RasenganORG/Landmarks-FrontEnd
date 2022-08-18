import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import ModalUI from './ModalUI';
import classes from './LayoutPage.module.css';

import { Layout } from 'antd';
import Spinner from './Spinner';
import MenuUI from './MenuUI';

const { Content, Sider } = Layout;

const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const userState = useSelector((state) => state.user);

  const roomState = useSelector((state) => state.room);

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
          <MenuUI classes={classes} />
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
              {roomState.isLoading || userState.isLoading ? (
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
