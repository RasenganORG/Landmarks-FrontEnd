import { LayoutContext } from '../../../context/layout-context';

import 'antd/dist/antd.min.css';
import { Layout, Menu } from 'antd';
import { useContext } from 'react';

const { Header } = Layout;

export default function HeaderUI() {
  const ctx = useContext(LayoutContext);

  const roomItems = [
    {
      key: '1',
      label: 'Chat',
    },
    {
      key: '2',
      label: 'Members',
    },
  ];

  const handleMenuItemClick = ({ key }) => {
    console.log('key', key);
    console.log('drawer', ctx.currentDrawer);

    if (key === '1') {
      if (key === ctx.currentDrawer) {
        ctx.closeDrawer();
        return;
      }
      // Open Chat Drawer
      ctx.changeDrawer(key);
      ctx.openDrawer();
    }
    if (key === '2') {
      if (key === ctx.currentDrawer) {
        ctx.closeDrawer();
        return;
      }
      // Open Members Drawer
      ctx.changeDrawer(key);
      ctx.openDrawer();
    }
  };

  return (
    <Header>
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['1']}
        selectedKeys={[ctx.currentDrawer]}
        onClick={handleMenuItemClick}
        items={roomItems}
      />
    </Header>
  );
}
