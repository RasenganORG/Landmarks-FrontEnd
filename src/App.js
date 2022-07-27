import './App.css';
import 'antd/dist/antd.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutPage from './components/LayoutPage/LayoutPage';
import Home from './components/Home/Home';
import { RoomItem, CreateRoom, EditRoom } from './components/Rooms';
import Profile from './components/Profile/Profile';
import Login from './components/Authenticate/Login';
import Register from './components/Authenticate/Register';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/Authenticate/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <LayoutPage />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path='rooms' element={<Home />} />
          <Route path='rooms/:roomId' element={<RoomItem />} />
          <Route path='rooms/new' element={<CreateRoom />} />
          <Route path='rooms/edit' element={<EditRoom />} />
          <Route path='profile/:id' element={<Profile />} />
        </Route>

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
