import DrawerUI from '../UI/Layout/DrawerUI';
import ModalUI from '../UI/ModalUI';
import MapUI from '../Map/MapUI';
import HeaderUI from '../UI/Layout/HeaderUI';
import SideMenu from '../UI/Layout/SideMenu';

import { Layout } from 'antd';
const { Footer, Content } = Layout;

export default function Dashboard() {
  return (
    <Layout
      hasSider={true}
      style={{
        minHeight: '100vh',
      }}
    >
      <SideMenu />
      <Layout>
        <HeaderUI />
        <Layout
          id='LayoutContent'
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <Content>
            <MapUI />
          </Content>
          <DrawerUI />
          {/* <Footer></Footer> */}
        </Layout>
      </Layout>
      <ModalUI></ModalUI>
    </Layout>
  );
}
