import { useDispatch, useSelector } from 'react-redux';
import { drawerActions } from '../../../store/drawer-slice';

import 'antd/dist/antd.min.css';
import { Drawer } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import ChatUI from '../../Chat/ChatUI';
import Members from '../../Members/Members';

export default function DrawerUI() {
  const dispatch = useDispatch();
  const currentDrawer = useSelector((state) => state.drawer.currentDrawer);
  const visible = useSelector((state) => state.drawer.visible);

  const onDrawerCloseHandler = () => {
    dispatch(drawerActions.closeDrawer());
  };

  return (
    <Drawer
      title={currentDrawer === '1' ? 'Chat' : 'Members'}
      placement={'right'}
      width={300}
      onClose={onDrawerCloseHandler}
      visible={visible}
      closeIcon={<RightOutlined />}
      getContainer={() => document.getElementById('LayoutContent')}
      style={{ position: 'absolute', zIndex: 90 }}
      mask={false}
      // destroyOnClose={true}
      // extra={
      //   <Space>
      //     <Button onClick={onClose}>Cancel</Button>
      //     <Button type='primary' onClick={onClose}>
      //       OK
      //     </Button>
      //   </Space>
      // }
    >
      {currentDrawer === '1' ? <ChatUI /> : <Members />}
    </Drawer>
  );
}
