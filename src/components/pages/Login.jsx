import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../store/login-slice';
import './Login.css';

import 'antd/dist/antd.min.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = (values) => {
    console.log('Login form ', values);
    dispatch(loginActions.login());
    if (location.state?.from) navigate(location.state.from);
  };

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
            name='username'
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
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className='login-form-forgot' href=''>
              Forgot password
            </a>
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
