import { useDispatch } from 'react-redux';
import { modalActions } from '../LayoutPage/modalSlice';
import { logout, userActions } from './userSlice';

import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { roomActions } from '../Rooms/roomSlice';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(userActions.reset());
    dispatch(roomActions.resetAll());
    dispatch(modalActions.closeModal());
    navigate('/');
  };

  return (
    <Form name='logout' onFinish={onLogout}>
      <Form.Item
        style={{
          textAlign: 'center',
          margin: 0,
        }}
      >
        <Button
          style={{ marginRight: '10px' }}
          type='primary'
          htmlType='submit'
        >
          Yes
        </Button>
        <Button type='secondary' htmlType='button' onClick={closeModalHandler}>
          No
        </Button>
      </Form.Item>
    </Form>
  );
}
