import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Register from './components/pages/Register';
import PrivateRoute from './components/pages/PrivateRoute';

import 'antd/dist/antd.min.css';
// import { ConfigProvider } from 'antd';

// ConfigProvider.config({
//   theme: {
//     primaryColor: '#98212E', // primary color for all components
//     // errorColor: '#ff4d4f',
//     // warningColor: '#faad14',
//     // successColor: '#52c41a',
//     // infoColor: '#1890ff',},
//   },
// });

function App() {
  // const isAuth = useSelector((state) => state.login.isAuthenticated);

  return (
    <>
      {/* <ConfigProvider>
      </ConfigProvider> */}
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
