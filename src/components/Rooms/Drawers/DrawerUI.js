import './DrawerUI.css';
import { useDispatch, useSelector } from 'react-redux';
import { drawerActions } from './drawerSlice';

import { Drawer } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Chat from '../../Chat/Chat';
import Members from './Members';

export default function DrawerUI({
  room: { members, id, ownerID, chatID },
  currentUserID,
}) {
  const dispatch = useDispatch();
  const currentDrawer = useSelector((state) => state.drawer.currentDrawer);
  const visible = useSelector((state) => state.drawer.visible);

  const onDrawerCloseHandler = () => {
    dispatch(drawerActions.closeDrawer());
  };

  let whichDrawer = null;
  if (currentDrawer === 'Chat')
    whichDrawer = (
      <Chat members={members} chatID={chatID} currentUserID={currentUserID} />
    );
  if (currentDrawer === 'Members')
    whichDrawer = (
      <Members
        members={members}
        ownerID={ownerID}
        currentUserID={currentUserID}
      />
    );

  return (
    <Drawer
      title={currentDrawer}
      placement={'right'}
      width={400}
      onClose={onDrawerCloseHandler}
      visible={visible}
      closeIcon={<RightOutlined />}
      getContainer={() => document.getElementById('LayoutContent')}
      mask={false}
    >
      {whichDrawer}
    </Drawer>
  );
}
