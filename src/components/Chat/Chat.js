import { SendOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Chat.module.css';
import { addMessage } from './chatSlice';
import Spinner from '../LayoutPage/Spinner';
import AvatarIcon from '../../helpers/AvatarIcon';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function Chat({ chatID, currentUserID, members }) {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const [form] = Form.useForm();
  const scrollRef = useRef();

  const onSend = (values) => {
    const message = {
      messageText: values.message,
      timestamp: new Date().toUTCString(),
      sentBy: currentUserID,
    };
    console.log(message);
    dispatch(addMessage({ message, chatID }));
    form.resetFields();
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!messages) return <Spinner tip='Fetching messages...' />;

  //
  return (
    <div className={classes['chat-wrapper']}>
      <div className={classes['chat-body']}>
        {messages
          .map((message, index) => (
            <div
              key={index}
              ref={scrollRef}
              className={`${classes['message-wrapper']} ${
                message.sentBy === currentUserID
                  ? classes['right']
                  : classes['left']
              } `}
            >
              <div className={classes['message-body']}>
                <div className='avatar'>
                  <Avatar
                    size='large'
                    icon={
                      <AvatarIcon
                        svg64={
                          members.find((user) => user.id === message.sentBy)
                            .avatar
                        }
                      />
                    }
                  />
                </div>
                <div className={classes['message-text']}>
                  {message.messageText}
                </div>
              </div>
              <div className={classes['message-info']}>
                <div className={classes['message-owner']}>
                  {members.find((user) => user.id === message.sentBy).name}
                </div>
                <div className={classes['timepstamp']}>{message.timestamp}</div>
              </div>
            </div>
          ))
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))}
      </div>
      <Form
        className={classes['chat-form']}
        form={form}
        name='send-message'
        preserve
        onFinish={onSend}
        initialValues={{
          message: '',
        }}
      >
        <Form.Item className={classes['chat-input']} name='message'>
          <Input
            placeholder='Type your message...'
            name='message'
            style={{ borderRadius: '10px' }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            shape='circle'
            icon={<SendOutlined />}
            className={classes['chat-send']}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
