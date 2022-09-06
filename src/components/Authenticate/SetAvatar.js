import { useEffect, useState } from 'react';
import Icon from '@ant-design/icons';
import { Button } from 'antd';
import SVG from 'react-inlinesvg';
import Spinner from '../LayoutPage/Spinner';
import { Buffer } from 'buffer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { successToast, errorToast } from '../../helpers/messageToast';
import { userActions, register } from './userSlice';
import classes from './SetAvatar.module.css';

export default function SetAvatar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();

  const {
    user,
    isLoading: loading,
    isSuccess,
    isError,
    message: authStateMessage,
  } = useSelector((state) => state.user);

  useEffect(() => {
    const getAvatar = async () => {
      setIsLoading(true);
      const data = [];
      const avatar = {};
      for (let i = 0; i < 5; i++) {
        const res = await fetch(
          `https://api.multiavatar.com/${Math.round(
            Math.random() * 10000
          )}?apikey=e6zKM2AxYihuBa`
        );
        const svg = await res.text();
        const encoded64 = Buffer.from(svg).toString('base64');
        // const decoded64 = Buffer.from(encoded64, 'base64').toString();

        const newSVG = () => <SVG src={svg} />;
        const newIcon = (props) => <Icon component={newSVG} {...props} />;

        avatar[`avatar${i}`] = { svg64: encoded64, icon: newIcon };
        data.push(avatar[`avatar${i}`]);
      }
      setAvatars(data);
      setIsLoading(false);
    };
    getAvatar();
  }, [setAvatars]);

  useEffect(() => {
    if (isError) {
      errorToast(authStateMessage);
    }
    if (isSuccess) {
      navigate('/');
      successToast(`Welcome, ${authStateMessage}`);
    }
    if (user) {
      navigate('/');
    }

    dispatch(userActions.reset());
  }, [user, isError, isSuccess, authStateMessage, navigate, dispatch]);

  const submitRegisterForm = () => {
    const user = { ...state };
    user.avatar = avatars[selectedAvatar].svg64;
    dispatch(register(user));
  };

  return (
    <div className={classes['avatars-wrapper']}>
      {isLoading || loading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <h1>Pick an Avatar for your profile</h1>
          </div>
          <div style={{ margin: 20 }}>
            {avatars.map((image, index) => {
              const Avatar = image.icon;
              return (
                <Button
                  onClick={() => setSelectedAvatar(index)}
                  type='primary'
                  shape='circle'
                  icon={<Avatar />}
                  key={index}
                  className={classes['avatars']}
                  style={{
                    border:
                      selectedAvatar === index
                        ? '5px solid black'
                        : '5px solid transparent',
                  }}
                />
              );
            })}
          </div>
          <Button
            type='primary'
            className={classes['set-avatar-btn']}
            onClick={submitRegisterForm}
          >
            Set Avatar
          </Button>
        </>
      )}
    </div>
  );
}
