import './App.css';
import 'antd/dist/antd.min.css';
import SideMenu from './components/UI/Layout/SideMenu';
import DrawerUI from './components/UI/Layout/DrawerUI';
import ModalUI from './components/UI/ModalUI';
import MapUI from './components/Map/MapUI';

import { Layout } from 'antd';
import HeaderUI from './components/UI/Layout/HeaderUI';
const { Footer, Content } = Layout;

function App() {
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

export default App;
