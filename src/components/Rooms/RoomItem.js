import { Layout, Menu, Col, Row, Typography, Tooltip } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import classes from './RoomItem.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../LayoutPage/Spinner';

export function RoomItem() {
  const { roomID } = useParams();

  const currentRoom = useSelector((state) =>
    state.room.rooms?.find((room) => room.id === roomID)
  );

  const userID = useSelector((state) => state.user.user.id);

  if (!currentRoom) return <Spinner tip='Room does not exist...' />;

  // const currentDrawer = useSelector((state) => state.drawer.currentDrawer);

  const roomNavItems = [
    {
      key: 'Chat',
      label: 'Chat',
    },
    {
      key: 'Members',
      label: 'Members',
    },
    {
      key: 'Landmark',
      label: 'Add Landmark',
    },
    {
      key: 'Event',
      label: 'Add Event',
    },
    {
      key: 'Edit',
      label: 'Edit',
    },
    {
      key: 'Invite',
      label:
        userID === currentRoom.ownerID ? (
          <Tooltip
            title='Invite link has been generated.'
            trigger={'click'}
            mouseLeaveDelay={0}
          >
            <span>{`Invite Code: ${currentRoom.inviteToken}`}</span>
          </Tooltip>
        ) : (
          ''
        ),
    },
  ];

  const handleMenuItemClick = ({ key }) => {
    // console.log('key', key);
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
    if (key === 'Invite') {
      navigator.clipboard.writeText(
        `http://localhost:3000/rooms/${currentRoom.inviteToken}/join`
      );
    }
  };

  return (
    <Layout
      style={{
        minWidth: '100%',
        // padding: '0 10px',
      }}
    >
      <Row>
        <Col span={4}>
          <div className={classes['room-name']}>
            <Typography.Title level={3} style={{ margin: 0, color: 'aqua' }}>
              {currentRoom.name}
            </Typography.Title>
          </div>
        </Col>
        <Col span={20}>
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['']}
            selectedKeys={['']}
            // defaultSelectedKeys={[currentDrawer]}
            // selectedKeys={[currentDrawer]}
            onClick={handleMenuItemClick}
            items={roomNavItems}
          />
        </Col>
      </Row>
      <Content>
        <div className={classes['map-container']}></div>
      </Content>
    </Layout>
  );
}
