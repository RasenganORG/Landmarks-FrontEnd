import classes from './Message.module.css';

import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';

export default function Message({ position, title, type, text, data, date }) {
  return (
    <MessageBox
      className={classes['rce-container-mbox']}
      replyButton={true}
      position={position}
      title={title}
      type={type}
      text={text}
      data={data}
      date={date}
    />
  );
}
