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

export default function MenuUI({ current, setCurrent, classes, isLoading }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const currentPath = location.pathname;

  useEffect(() => {
    const getRooms = async () => {
      const response = await fetch(
        `http://localhost:8080/api/${user.id}/rooms/`
      );
      // Check if the user is part of any room
      if (response.status === 204) {
        setRooms([]);
        setLoading(false);
        return;
      }

      const data = await response.json();
      dispatch(roomActions.setRooms(data));

      setRooms([
        ...data
          .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
          .map((room) =>
            getItem(`${room.name}`, `${room.id}`, null, `/rooms/${room.id}`)
          ),
      ]);
      setLoading(false);
    };
    setTimeout(getRooms, 1000);
  }, [user, dispatch]);

  useEffect(() => {
    // If a menu item path correspons with the current url path,
    // then set that menu item to active
    const menus = [...menuItems, ...rooms];
    menus.forEach((item) => {
      if (item.path === currentPath) setCurrent(item.key);
    });
  }, [currentPath, rooms, setCurrent]);

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
      {isLoading || loading ? (
        <div className={classes['spin-container']}>
          <Spinner size={36} />
        </div>
      ) : (
        <Menu
          theme='dark'
          selectedKeys={[current]}
          mode='inline'
          items={rooms}
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
