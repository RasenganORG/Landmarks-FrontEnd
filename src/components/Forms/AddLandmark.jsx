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

export default function AddLandmark() {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Form
      {...layout}
      name='add_landmark'
      labelAlign='left'
      style={{ width: '90%' }}
    >
      <Form.Item
        name='landmark'
        label='Landmark'
        rules={[
          {
            required: true,
            message: 'Please enter a landmark name !',
          },
        ]}
      >
        <Input />
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
          Add Landmark
        </Button>
        <Button type='secondary' htmlType='button' onClick={closeModalHandler}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
