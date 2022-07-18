import { drawerActions } from '../../../store/drawer-slice';
import { modalActions } from '../../../store/modal-slice';
import { useDispatch, useSelector } from 'react-redux';

import 'antd/dist/antd.min.css';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default function HeaderUI() {
  const dispatch = useDispatch();
  const currentDrawer = useSelector((state) => state.drawer.currentDrawer);

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
    console.log('drawer', currentDrawer);

    if (key === '1') {
      if (key === currentDrawer) {
        dispatch(drawerActions.closeDrawer());
        return;
      }
      // Open Chat Drawer
      dispatch(drawerActions.changeDrawer(key));
      dispatch(drawerActions.openDrawer());
    }
    if (key === '2') {
      if (key === currentDrawer) {
        dispatch(drawerActions.closeDrawer());
        return;
      }
      // Open Members Drawer
      dispatch(drawerActions.changeDrawer(key));
      dispatch(drawerActions.openDrawer());
    }
    if (key === '3') {
      dispatch(modalActions.openModal('Landmarks'));
      dispatch(drawerActions.closeDrawer());
    }
    if (key === '4') {
      dispatch(modalActions.openModal('Events'));
      dispatch(drawerActions.closeDrawer());
    }
  };

  return (
    <Header>
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={[currentDrawer]}
        selectedKeys={[currentDrawer]}
        onClick={handleMenuItemClick}
        items={roomItems}
        style={{
          fontSize: '16px',
        }}
      />
    </Header>
  );
}
