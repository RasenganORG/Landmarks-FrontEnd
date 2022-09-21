import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from './modalSlice';

import { Modal } from 'antd';
import Logout from '../Authenticate/Logout';
import AddEvent from '../AddEvent/AddEvent';
import AddLandmark from '../AddLandmark/AddLandmark';

export default function ModalUI() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);
  const whichModal = useSelector((state) => state.modal.whichModal);

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  let whichForm, title;

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
    </Modal>
  );
}
