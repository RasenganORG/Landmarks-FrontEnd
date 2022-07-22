import { useDispatch, useSelector } from 'react-redux';
import { authActions, login } from '../../store/auth-slice';
import './Login.css';

import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const onFinish = (values) => {
    const userData = { ...values.user };
    console.log('Logged in userData', userData);
    dispatch(login(userData));
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
          name='login-user'
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
              data-cy='login-username-input'
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

            {/* <a className='login-form-forgot' href=''>
              Forgot password
            </a> */}
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
