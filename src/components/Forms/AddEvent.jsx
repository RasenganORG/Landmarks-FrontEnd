import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';

import 'antd/dist/antd.min.css';
import { Button, Select, Form, Input, DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

export default function AddEvent() {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const rangeTimeValue = fieldsValue['date-time-picker'];
    const values = {
      ...fieldsValue,
      'date-time-picker': [
        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
      ],
    };
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      onFinish={onFinish}
      {...layout}
      name='add_event'
      labelAlign='left'
      style={{ width: '90%' }}
    >
      <Form.Item
        name='eventName'
        label='Event'
        rules={[
          {
            required: true,
            message: 'Please enter an event name !',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='date-time-picker'
        label='When:'
        rules={[
          {
            required: true,
            message:
              'Please enter a date & time to start and to end the event !',
          },
        ]}
      >
        <RangePicker
          showTime={{
            format: 'HH:mm',
          }}
          format='YYYY-MM-DD HH:mm'
        />
      </Form.Item>

      <Form.Item
        name='type'
        label='Type:'
        rules={[
          {
            required: true,
            message: 'Please select the type of landmark',
          },
        ]}
      >
        <Select placeholder='Please select a type'>
          <Option value='Stadium'>Stadium</Option>
          <Option value='Shop'>Shop</Option>
        </Select>
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
          Add Event
        </Button>
        <Button type='secondary' htmlType='button' onClick={closeModalHandler}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
