import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';
import { loginActions } from '../../store/login-slice';

import 'antd/dist/antd.min.css';
import { Button, Form } from 'antd';

export default function Logout() {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  const onLogout = () => {
    dispatch(loginActions.logout());
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
