import { useDispatch } from 'react-redux';
import { modalActions } from '../LayoutPage/modalSlice';
import { logout, authActions } from './authSlice';

import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(authActions.reset());
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
