import { useDispatch, useSelector } from 'react-redux';
import { userActions, login } from './userSlice';
import './Login.css';
import { successToast, errorToast } from '../../helpers/messageToast';

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../Home/Spinner';

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
  } = useSelector((state) => state.user);

  const onFinish = (values) => {
    const userData = { ...values };
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
    dispatch(userActions.reset());
  }, [user, isError, isSuccess, authStateMessage, navigate, dispatch]);

  if (isLoading)
    return (
      <div className='spin-container'>
        <Spinner tip='Getting everything ready for you...' />
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
            name='email'
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
            name='password'
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
