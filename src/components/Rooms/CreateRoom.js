import { useMemo, useRef, useState } from 'react';
import { Button, Select, Form, Input, Spin } from 'antd';
import debounce from 'lodash/debounce';

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
  console.log('fetching user', username);
  return fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((body) =>
      body.results.map((user) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
      }))
    );
}

const onSubmit = (values) => {
  const roomData = { ...values };
  console.log('Room data:', roomData);
};

export function CreateRoom() {
  const [value, setValue] = useState([]);

  return (
    <Form
      {...layout}
      name='create_room'
      labelAlign='left'
      style={{ width: '100%', maxWidth: '700px' }}
      initialValues={{
        roomName: '',
        password: '',
        selectTemplate: 'Room 1',
        selectMap: 'None',
      }}
      onFinish={onSubmit}
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

      <Form.Item name='selectTemplate' label='Select from template'>
        <Select placeholder='Create room from template'>
          <Option value='None'>None</Option>
          <Option value='Room 1'>Room 1</Option>
          <Option value='Option2'>Option2</Option>
        </Select>
      </Form.Item>

      <Form.Item name='selectMap' label='Select a map'>
        <Select placeholder='Choose a map for your room'>
          <Option value='None'>None</Option>
          <Option value='Option2'>Option2</Option>
        </Select>
      </Form.Item>
      <Form.Item name='addUsers' label='Add members'>
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
