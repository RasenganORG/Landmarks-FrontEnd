import { useDispatch, useSelector } from 'react-redux';
import { drawerActions } from '../../../store/drawer-slice';

import { Drawer } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import ChatUI from '../../Chat/ChatUI';
import MembersList from '../../Members/MembersList';

export default function DrawerUI() {
  const dispatch = useDispatch();
  const currentDrawer = useSelector((state) => state.drawer.currentDrawer);
  const visible = useSelector((state) => state.drawer.visible);
  const title = useSelector((state) => state.drawer.title);

  const onDrawerCloseHandler = () => {
    dispatch(drawerActions.closeDrawer());
  };

  console.log('Drawer gets rendered');

  let whichDrawer = null;
  if (currentDrawer === '1') whichDrawer = <ChatUI />;
  if (currentDrawer === '2') whichDrawer = <MembersList />;

  return (
    <Drawer
      title={title[currentDrawer - 1]}
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
      {whichDrawer}
    </Drawer>
  );
}
