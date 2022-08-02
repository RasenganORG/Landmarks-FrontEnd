import { useDispatch, useSelector } from 'react-redux';
import { authActions, login } from './authSlice';
import './Login.css';
import { successToast, errorToast } from '../../helpers/messageToast';

import { LockOutlined, MailOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 64,
    }}
    spin
  />
);

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {
    user,
    isLoading,
    isSuccess,
    isError,
    message: authStateMessage,
  } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    const userData = { ...values.user };
    dispatch(login(userData));
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
    dispatch(authActions.reset());
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
          name='login-user'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          preserve
        >
          <Form.Item
            name={['user', 'email']}
            rules={[
              {
                required: true,
                message: 'Please enter a valid email.',
                type: 'email',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='Email'
              data-cy='login-email-input'
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
              data-cy='login-password-input'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Log in
            </Button>
            <span>
              Or <Link to='/register'>register now !</Link>
            </span>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
