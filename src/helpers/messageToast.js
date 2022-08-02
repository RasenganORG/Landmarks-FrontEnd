import { message } from 'antd';

export const successToast = (msg) => {
  message.success({
    content: msg,
    style: {
      marginTop: '10vh',
    },
  });
};

export const errorToast = (msg) => {
  message.error({
    content: msg,
    style: {
      marginTop: '10vh',
    },
  });
};
