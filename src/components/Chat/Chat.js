import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input } from 'antd';
import classes from './Chat.module.css';

export default function Chat() {
  return (
    <div className={classes['chat-wrapper']}>
      <div className={classes['chat-body']}>
        <div className={`${classes['message-wrapper']} ${classes['pinned']} `}>
          <div className={classes['message-body']}>
            <Avatar size='large' icon={<UserOutlined />} />
            <div className={classes['message-text']}>
              TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText
            </div>
          </div>
          <div className={classes['message-info']}>
            <div className={classes['message-owner']}>Todd</div>
            <div className={classes['timepstamp']}>Yesterday</div>
          </div>
        </div>

        <div className={`${classes['message-wrapper']} ${classes['right']} `}>
          <div className={classes['message-body']}>
            <div className={classes['message-text']}>
              TextTextTextTextTextTextTextTextTextText
              TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText
            </div>
          </div>
          <div className={classes['message-info']}>
            <div className={classes['timepstamp']}> 19:32</div>
          </div>
        </div>

        <div className={`${classes['message-wrapper']} ${classes['left']} `}>
          <div className={classes['message-body']}>
            <Avatar size='large' icon={<UserOutlined />} />
            <div className={classes['message-text']}>Text</div>
          </div>
          <div className={classes['message-info']}>
            <div className={classes['message-owner']}>Todd</div>
            <div className={classes['timepstamp']}> 19:32</div>
          </div>
        </div>

        <div className={`${classes['message-wrapper']} ${classes['right']} `}>
          <div className={classes['message-body']}>
            <div className={classes['message-text']}>Text</div>
          </div>
          <div className={classes['message-info']}>
            <div className={classes['timepstamp']}> 19:32</div>
          </div>
        </div>
      </div>
      <Form className={classes['chat-form']}>
        <Input
          defaultValue=''
          placeholder='Type your message...'
          className={classes['chat-input']}
        />
        <Button
          type='primary'
          shape='circle'
          icon={<SendOutlined />}
          className={classes['chat-send']}
        />
      </Form>
    </div>
  );
}
