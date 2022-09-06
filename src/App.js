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
import JoinRoom from './components/Rooms/JoinRoom';
import SetAvatar from './components/Authenticate/SetAvatar';

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
          <Route path='rooms' element={<Home />}>
            <Route path='new' element={<CreateRoom />} />
            <Route path=':roomID' element={<RoomItem />} />
            <Route path=':roomID/edit' element={<EditRoom />} />
            <Route path=':inviteToken/join' element={<JoinRoom />} />
          </Route>
          <Route path='profile/:id' element={<Profile />} />
        </Route>

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />}></Route>
        <Route path='set-avatar' element={<SetAvatar />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
