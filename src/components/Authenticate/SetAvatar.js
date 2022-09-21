import { useEffect, useState } from 'react';
import { Button } from 'antd';
import Spinner from '../Home/Spinner';
import { Buffer } from 'buffer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { successToast, errorToast } from '../../helpers/messageToast';
import { userActions, register } from './userSlice';
import classes from './SetAvatar.module.css';
import AvatarIcon from '../../helpers/AvatarIcon';

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
      for (let i = 0; i < 5; i++) {
        const res = await fetch(
          `https://api.multiavatar.com/${Math.round(
            Math.random() * 1000
          )}?apikey=e6zKM2AxYihuBa`
        );
        // Get SVG image from Multiavatar API
        const svg = await res.text();
        // Encode it in base64 to be later saved in database
        const svg64 = Buffer.from(svg).toString('base64');
        // Push object {svg64, icon}
        data.push(svg64);
      }
      setAvatars(data);
      setIsLoading(false);
    };
    getAvatar();
  }, [setAvatars, setIsLoading]);

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
    user.avatar = avatars[selectedAvatar];
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
            {avatars.map((svg64, index) => {
              return (
                <Button
                  onClick={() => setSelectedAvatar(index)}
                  type='primary'
                  shape='circle'
                  icon={<AvatarIcon svg64={svg64} />}
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
