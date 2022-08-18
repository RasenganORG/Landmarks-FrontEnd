import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlusSquareOutlined, LogoutOutlined } from '@ant-design/icons';

import { modalActions } from './modalSlice';
import Spinner from './Spinner';
import { roomActions } from '../Rooms/roomSlice';

function getItem(label, key, icon, path, children) {
  return {
    label,
    key,
    icon,
    path,
    children,
  };
}

const logoutItem = [getItem('Logout', '9', <LogoutOutlined />)];

const menuItems = [
  getItem('Create Room', 'createRoom', <PlusSquareOutlined />, '/rooms/new'),
];

export default function MenuUI({ classes }) {
  const [menuRooms, setMenuRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const rooms = useSelector((state) => state.room.rooms);

  const currentPath = location.pathname;

  // Run only once
  // Fetch rooms from DB on application start or refresh
  useEffect(() => {
    const getRoomsForUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/${user.id}/rooms/`
        );

        if (!response.ok)
          throw new Error(`${response.status} ${response.statusText}`);

        const data = await response.json();
        console.log('data', data);
        dispatch(roomActions.setRooms(data));

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (rooms.length === 0) getRoomsForUser();
  }, []);

  // Change menu based on store rooms
  useEffect(() => {
    const foo = [...rooms];
    setMenuRooms([
      ...foo
        .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
        .map((room) =>
          getItem(`${room.name}`, `${room.id}`, null, `/rooms/${room.id}`)
        ),
    ]);
  }, [rooms]);

  useEffect(() => {
    // If a menu item path correspons with the current url path,
    // then set that menu item to active
    const menus = [...menuItems, ...menuRooms];
    menus.forEach((item) => {
      if (item.path === currentPath) setCurrent(item.key);
    });
  }, [currentPath, menuRooms, setCurrent]);

  const onClickRooms = (e) => {
    // Set current active menu item
    if (e.key === 'createRoom') {
      navigate('rooms/new');
      return;
    } else navigate(`/rooms/${e.key}`);
  };

  const onLogout = (e) => {
    dispatch(modalActions.openModal('Logout'));
    setCurrent('');
    // Log out the user
  };

  return (
    <>
      <Menu
        theme='dark'
        selectedKeys={[current]}
        mode='inline'
        items={menuItems}
        onClick={onClickRooms}
      />
      <br />
      <br />
      {loading ? (
        <div className={classes['spin-container']}>
          <Spinner size={36} />
        </div>
      ) : (
        <Menu
          theme='dark'
          selectedKeys={[current]}
          mode='inline'
          items={menuRooms}
          onClick={onClickRooms}
        />
      )}
      <div className={classes.logout}>
        <Menu
          theme='dark'
          selectedKeys={['']}
          onClick={onLogout}
          mode='vertical'
          items={logoutItem}
          style={{
            fontSize: '16px',
          }}
        />
      </div>
    </>
  );
}
