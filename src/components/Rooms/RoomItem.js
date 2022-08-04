import { Layout, Menu, Col, Row } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export function RoomItem() {
  const { roomID } = useParams();
  // const dispatch = useDispatch();
  // const currentDrawer = useSelector((state) => state.drawer.currentDrawer);

  const roomItems = [
    {
      key: '1',
      label: 'Chat',
    },
    {
      key: '2',
      label: 'Members',
    },
    {
      key: '3',
      label: 'Add Landmark',
    },
    {
      key: '4',
      label: 'Add Event',
    },
  ];

  const handleMenuItemClick = ({ key }) => {
    console.log('key', key);

    // console.log('drawer', currentDrawer);

    // if (key === '1') {
    //   if (key === currentDrawer) {
    //     dispatch(drawerActions.closeDrawer());
    //     return;
    //   }
    //   // Open Chat Drawer
    //   dispatch(drawerActions.changeDrawer(key));
    //   dispatch(drawerActions.openDrawer());
    // }
    // if (key === '2') {
    //   if (key === currentDrawer) {
    //     dispatch(drawerActions.closeDrawer());
    //     return;
    //   }
    //   // Open Members Drawer
    //   dispatch(drawerActions.changeDrawer(key));
    //   dispatch(drawerActions.openDrawer());
    // }
    // if (key === '3') {
    //   dispatch(modalActions.openModal('Landmarks'));
    //   dispatch(drawerActions.closeDrawer());
    // }
    // if (key === '4') {
    //   dispatch(modalActions.openModal('Events'));
    //   dispatch(drawerActions.closeDrawer());
    // }
  };
  return (
    <Layout
      style={{
        minWidth: '100%',
        padding: '0 10px',
      }}
    >
      <Row>
        <Col offset={8} span={8}>
          <Header
            style={
              {
                // maxHeight: '0',
              }
            }
          >
            <Menu
              theme='dark'
              mode='horizontal'
              defaultSelectedKeys={['']}
              selectedKeys={['']}
              // defaultSelectedKeys={[currentDrawer]}
              // selectedKeys={[currentDrawer]}
              onClick={handleMenuItemClick}
              items={roomItems}
              style={{
                // maxHeight: '30px',
                fontSize: '16px',
                display: 'flex',
                justifyContent: 'center',
              }}
            />
          </Header>
        </Col>
      </Row>

      <Content>
        <div>Room Item @{roomID}</div>
      </Content>
    </Layout>
  );
}
