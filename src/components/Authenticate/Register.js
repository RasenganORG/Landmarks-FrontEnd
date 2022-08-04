import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, register } from './userSlice';
import { successToast, errorToast } from '../../helpers/messageToast';

import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Spin } from 'antd';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 64,
    }}
    spin
  />
);

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    user,
    isLoading,
    isSuccess,
    isError,
    message: authStateMessage,
  } = useSelector((state) => state.user);

  const onFinish = (values) => {
    const userData = { ...values.user };
    dispatch(register(userData));
  };

  useEffect(() => {
    if (isError) {
      errorToast(authStateMessage);
    }
    if (isSuccess) {
      navigate('/');
      successToast(`Welcome, ${authStateMessage}`);
    }
    if (user) {
      navigate('/');
    }

    dispatch(userActions.reset());
  }, [user, isError, isSuccess, authStateMessage, navigate, dispatch]);

  if (isLoading)
    return (
      <div className='spin-container'>
        <Spin indicator={antIcon} tip='Loading...' />
      </div>
    );

  return (
    <Row align='middle' style={{ height: '100vh' }}>
      <Col span={6} offset={9}>
        <Form
          form={form}
          name='register-user'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          preserve={true}
        >
          <Form.Item
            name={['user', 'name']}
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
              data-cy='register-username-input'
            />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
                type: 'email',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='E-Mail'
              data-cy='register-email-input'
            />
          </Form.Item>
          <Form.Item
            name={['user', 'password']}
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
              data-cy='register-password-input'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Register
            </Button>
            <span>
              Go back to <Link to='/login'>Login</Link>.
            </span>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
