import './App.css';
import 'antd/dist/antd.min.css';

import Navbar from './components/Navbar';
import { Layout } from 'antd';

function App() {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Navbar />
    </Layout>
  );
}

export default App;
