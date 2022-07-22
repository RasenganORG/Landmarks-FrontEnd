import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';

import { Button, Select, Form, Input } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 24,
  },
};

export default function CreateRoom() {
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
        <Input data-cy='room-name-input' />
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

      <Form.Item name='template' label='Select from template'>
        <Select defaultValue='Room 1'>
          <Option value='Room 1'>Room 1</Option>
          <Option value='Option2'>Option2</Option>
        </Select>
      </Form.Item>

      <Form.Item name='addMap' label='Select a map'>
        <Select defaultValue='None'>
          <Option value='None'>None</Option>
          <Option value='Option2'>Option2</Option>
        </Select>
      </Form.Item>
      <Form.Item name='addEvents' label='Add events'>
        <Button type='primary' htmlType='button'>
          Add Event
        </Button>
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
          Create Room
        </Button>
        <Button
          style={{ marginRight: '10px' }}
          type='primary'
          htmlType='submit'
        >
          Save as template
        </Button>
        <Button type='secondary' htmlType='button' onClick={closeModalHandler}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
