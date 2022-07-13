import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal-slice';

import 'antd/dist/antd.min.css';
import { Modal } from 'antd';
import CreateRoom from '../Forms/CreateRoom';
import JoinRoom from '../Forms/JoinRoom';
import Logout from '../Forms/Logout';
import AddEvent from '../Forms/AddEvent';
import AddLandmark from '../Forms/AddLandmark';

export default function ModalUI(props) {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);
  const whichModal = useSelector((state) => state.modal.whichModal);

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  let whichForm, title;

  if (whichModal === 'Create') {
    whichForm = <CreateRoom />;
    title = 'Create a room:';
  }
  if (whichModal === 'Join') {
    whichForm = <JoinRoom />;
    title = 'Join a room:';
  }
  if (whichModal === 'Logout') {
    whichForm = <Logout />;
    title = 'Are you sure you want to log out ?';
  }
  if (whichModal === 'Events') {
    whichForm = <AddEvent />;
    title = 'Add an event:';
  }
  if (whichModal === 'Landmarks') {
    whichForm = <AddLandmark />;
    title = 'Add a landmark:';
  }

  return (
    <Modal
      // transitionName=''
      title={title}
      centered
      visible={visible}
      onCancel={closeModalHandler}
      destroyOnClose={true}
      footer={null}
      width={600}
      bodyStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {whichForm}
      {/* {props.children} */}
    </Modal>
  );
}
