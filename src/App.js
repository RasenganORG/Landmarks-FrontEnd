import 'antd/dist/antd.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
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
              <Home />
            </PrivateRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path='rooms' element={<LandingPage />}>
            <Route path='new' element={<CreateRoom />} />
            <Route path=':roomID' element={<RoomItem />} />
            <Route path=':roomID/edit' element={<EditRoom />} />
            <Route path='join/:inviteToken/' element={<JoinRoom />} />
          </Route>
          <Route path='profile/:id' element={<Profile />} />
        </Route>

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='set-avatar' element={<SetAvatar />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
