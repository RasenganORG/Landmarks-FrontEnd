import { createRef } from 'react';
import classes from './ChatUI.module.css';

import { Col, Row } from 'antd';

import 'react-chat-elements/dist/main.css';
import { Input, Button } from 'react-chat-elements';

import { MESSAGES } from './MESSAGES';
import Message from './Message';

export default function ChatUI() {
  const inputReferance = createRef();

  return (
    <div className={classes['chat-container']}>
      <Row>
        <Col span={24}>
          {MESSAGES.map((msg, index) => (
            <Message
              key={index}
              position={msg.position}
              title={msg.title}
              type={msg.type}
              text={msg.text}
              data={msg.data}
              date={msg.date}
            />
          ))}
        </Col>
      </Row>
      <Input
        style={{ position: 'absolute', bottom: 0 }}
        inputStyle={{ overflow: 'hidden', maxHeight: '50px' }}
        referance={inputReferance}
        placeholder='Type here...'
        multiline={true}
        rightButtons={
          <Button color='white' backgroundColor='black' text='Send' />
        }
      />
    </div>
  );
}
