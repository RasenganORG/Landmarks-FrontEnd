import './App.css';
import 'antd/dist/antd.min.css';
import SideMenu from './components/UI/Layout/SideMenu';
import DrawerUI from './components/UI/Layout/DrawerUI';
import ModalUI from './components/UI/ModalUI';

import { Layout } from 'antd';
import HeaderUI from './components/UI/Layout/HeaderUI';
const { Footer, Content } = Layout;

// const location = {
//   address: 'Strada Maior Gheorghe Șonțu 8 Etaj 1, București 011448',
//   lat: 44.46619,
//   lng: 26.08237,
// };

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
          <Content></Content>
          <DrawerUI />
          <Footer></Footer>
        </Layout>
      </Layout>
      <ModalUI />
    </Layout>
  );
}

export default App;
