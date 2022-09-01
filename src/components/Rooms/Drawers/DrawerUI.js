import { useDispatch, useSelector } from 'react-redux';
import { drawerActions } from './drawerSlice';

import { Drawer } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Chat from './Chat';
import Members from './Members';

export default function DrawerUI() {
  const dispatch = useDispatch();
  const currentDrawer = useSelector((state) => state.drawer.currentDrawer);
  const visible = useSelector((state) => state.drawer.visible);

  const onDrawerCloseHandler = () => {
    dispatch(drawerActions.closeDrawer());
  };

  let whichDrawer = null;
  if (currentDrawer === 'Chat') whichDrawer = <Chat />;
  if (currentDrawer === 'Members') whichDrawer = <Members />;

  return (
    <Drawer
      title={currentDrawer}
      placement={'right'}
      width={300}
      onClose={onDrawerCloseHandler}
      visible={visible}
      closeIcon={<RightOutlined />}
      getContainer={() => document.getElementById('LayoutContent')}
      mask={false}
    >
      {whichDrawer}
    </Drawer>
  );
}
