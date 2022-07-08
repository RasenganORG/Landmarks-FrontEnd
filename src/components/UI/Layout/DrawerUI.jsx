import { useContext } from 'react';
import { LayoutContext } from '../../../context/layout-context';

import 'antd/dist/antd.min.css';
import { Drawer } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import ChatUI from '../../Chat/ChatUI';
import Members from '../../Members/Members';

export default function DrawerUI() {
  const ctx = useContext(LayoutContext);

  return (
    <Drawer
      title={ctx.currentDrawer === '1' ? 'Chat' : 'Members'}
      placement={'right'}
      width={300}
      onClose={ctx.closeDrawer}
      visible={ctx.visibleDrawer}
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
      {ctx.currentDrawer === '1' ? <ChatUI /> : <Members />}
    </Drawer>
  );
}
