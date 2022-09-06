import { useNavigate, Link } from 'react-router-dom';

import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col } from 'antd';

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const userData = { ...values };
    navigate('/set-avatar', { state: userData });
  };

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
            name='name'
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
            name='email'
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
