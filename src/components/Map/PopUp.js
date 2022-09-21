import { Card, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { modalActions } from '../Home/modalSlice';

export default function PopUp({ coordinates, closePopup }) {
  const dispatch = useDispatch();

  const onClose = () => {
    console.log('Clicked cancel button');
    closePopup();
  };
  const onAddLandmark = () => {
    dispatch(modalActions.openModal('Landmarks'));
  };
  const onAddEvent = () => {
    dispatch(modalActions.openModal('Events'));
  };

  return (
    <>
      <Card
        title='Add something'
        extra={
          <Button onClick={onClose} icon={<CloseOutlined />} size='small' />
        }
        size='small'
        style={{ fontSize: '12px' }}
      >
        <p>{coordinates}</p>
        <Button onClick={onAddLandmark}>Add Landmark</Button>
        <Button onClick={onAddEvent}>Add Event</Button>
      </Card>
    </>
  );
}
