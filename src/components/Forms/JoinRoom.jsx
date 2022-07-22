import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';

import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 24,
  },
};

export default function JoinRoom() {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Form
      {...layout}
      name='create_room'
      labelAlign='left'
      style={{ width: '90%' }}
    >
      <Form.Item
        name='roomName'
        label='Room Name'
        rules={[
          {
            required: true,
            message: 'Please enter a room name !',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='password'
        label='Room Password'
        rules={[
          {
            required: true,
            message: 'Please enter a password for the room !',
          },
        ]}
      >
        <Input type='password' />
      </Form.Item>

      <Form.Item
        style={{
          textAlign: 'center',
          margin: '30px 0 0 0',
        }}
      >
        <Button
          style={{ marginRight: '10px' }}
          type='primary'
          htmlType='submit'
        >
          Join Room
        </Button>
        <Button type='secondary' htmlType='button' onClick={closeModalHandler}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
