import { List } from 'antd';
import classes from './Members.module.css';

export default function Members({ members, ownerID, userID }) {
  return (
    <List
      dataSource={members}
      renderItem={(item) => (
        <List.Item
          key={item.email}
          className={userID === item.id ? classes['current-user'] : ''}
          style={{ padding: '10px' }}
        >
          <List.Item.Meta
            title={<a href='https://ant.design'>{item.name}</a>}
            description={ownerID === item.id ? 'Admin' : 'Member'}
          />
          <div>Online ?</div>
        </List.Item>
      )}
    />
  );
}
