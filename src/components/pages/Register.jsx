import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, register } from '../../store/auth-slice';

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
      fontSize: 24,
    }}
    spin
  />
);

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const onFinish = (values) => {
    const userData = { ...values.user };
    console.log('Registered form userData', userData);
    dispatch(register(userData));
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(authActions.reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) return <Spin indicator={antIcon} />;

  return (
    <Row align='middle' style={{ height: '100vh' }}>
      <Col span={6} offset={9}>
        <Form
          name='register-user'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
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
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
