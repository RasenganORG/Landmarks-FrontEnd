import { Button, Select, Form, Input } from 'antd';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { roomActions, createRoom } from './roomSlice';
import { v4 as uuidv4 } from 'uuid';
import { errorToast } from '../../helpers/messageToast';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 24,
  },
};

export function CreateRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);

  const {
    createRoom: { isError, isSuccess },
    message,
    newRoom,
  } = useSelector((state) => state.room);

  const onSubmit = (formValues) => {
    const data = {
      room: {
        ...formValues,
        id: uuidv4(),
        ownerID: userState.user.id,
        createdOn: new Date().toUTCString(),
        inviteToken: uuidv4(),
      },
      members: [
        {
          id: userState.user.id,
          name: userState.user.name,
          avatar: userState.user.avatar ? userState.user.avatar : null,
        },
      ],
    };

    data.room.chatID = `${data.room.id}_${data.room.ownerID}`;

    dispatch(createRoom(data));
  };

  useEffect(() => {
    if (isError) {
      errorToast(message);
    }
    if (isSuccess) {
      navigate(`/rooms/${newRoom.id}`);
    }
    dispatch(roomActions.resetActions('createRoom'));
  }, [navigate, dispatch, newRoom, isError, isSuccess, message]);

  return (
    <Form
      {...layout}
      name='create_room'
      labelAlign='left'
      style={{ width: '100%', maxWidth: '700px' }}
      initialValues={{
        name: '',
        template: 'Room 1',
        map: 'None',
        events: [],
      }}
      onFinish={onSubmit}
    >
      <Form.Item
        name='name'
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

      <Form.Item name='template' label='Select from template'>
        <Select placeholder='Create room from template'>
          <Option value='None'>None</Option>
          <Option value='Room 1'>Room 1</Option>
          <Option value='Option2'>Option2</Option>
        </Select>
      </Form.Item>

      <Form.Item name='map' label='Select a map'>
        <Select placeholder='Choose a map for your room'>
          <Option value='None'>None</Option>
          <Option value='Option2'>Option2</Option>
        </Select>
      </Form.Item>
      <Form.Item name='events' label='Add events'>
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
          style={{ margin: '10px 10px 0 0' }}
          type='primary'
          htmlType='submit'
        >
          Create Room
        </Button>
        <Button
          style={{ margin: '10px 10px 0 0' }}
          type='primary'
          htmlType='submit'
        >
          Save as template
        </Button>
      </Form.Item>
    </Form>
  );
}
