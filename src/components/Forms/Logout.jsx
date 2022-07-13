import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';

import 'antd/dist/antd.min.css';
import { Button, Form } from 'antd';

export default function Logout() {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Form name='logout'>
      <Form.Item
        style={{
          textAlign: 'center',
          margin: 0,
        }}
      >
        <Button
          style={{ marginRight: '10px' }}
          type='primary'
          htmlType='button'
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
