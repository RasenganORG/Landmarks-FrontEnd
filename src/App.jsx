import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Register from './components/pages/Register';
import PrivateRoute from './components/pages/PrivateRoute';

function App() {
  // const isAuth = useSelector((state) => state.login.isAuthenticated);

  return (
    <>
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
