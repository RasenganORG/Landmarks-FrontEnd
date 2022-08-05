import { Button, Select, Form, Input, Spin } from 'antd';
import debounce from 'lodash/debounce';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { roomActions, addRoomToDB } from './roomSlice';
import { updateUser, userActions } from '../Authenticate/userSlice';
import Spinner from '../LayoutPage/Spinner';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 24,
  },
};

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
      options={options}
    />
  );
} // Usage of DebounceSelect

async function fetchUserList(username) {
  return fetch(`http://localhost:8080/api/user/${username}`)
    .then((response) => response.json())
    .then((user) => [
      { label: `${user.name} - ${user.email}`, value: user.id },
    ]);
}

export function CreateRoom() {
  const [value, setValue] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);

  const roomState = useSelector((state) => state.room);

  const onSubmit = (formValues) => {
    const room = {
      ...formValues,
      ownerID: userState.user.id,
      createdOn: new Date().toUTCString(),
    };
    // Add current user ID to room.members
    !room.members.includes(userState.user.id) &&
      room.members.push(userState.user.id);

    // dispatch(roomActions.setRoom(room));
    dispatch(addRoomToDB(room));
  };

  useEffect(() => {
    if (roomState.isError) {
      console.log(roomState.message);
    }
    if (roomState.isSuccess) {
      // Add room ID to user.roomList
      const roomList = [...userState.user.roomList];

      if (!roomList.includes(roomState.newRoom.id)) {
        roomList.push(roomState.newRoom.id);
        dispatch(updateUser({ userID: userState.user.id, roomList }));
      }
    }
    if (userState.isError) {
      console.log(userState.message);
    }
    if (userState.isSuccess) {
      navigate(`../${roomState.newRoom.id}`);
    }
    dispatch(roomActions.reset());
    dispatch(userActions.reset());
  }, [roomState, userState, navigate, dispatch]);

  if (roomState.isLoading || userState.isLoading)
    return <Spinner tip='Starting your next adventure...' />;

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
        members: [],
        events: {},
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
      <Form.Item name='members' label='Add members'>
        <DebounceSelect
          mode='multiple'
          value={value}
          placeholder='Select users'
          fetchOptions={fetchUserList}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          style={{
            width: '100%',
          }}
        />
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
