import rsg from '../../assets/rasengan.png';
import classes from './Message.module.css';

export const MESSAGES = [
  {
    position: 'left',
    title: 'George',
    titleColor: 'blue',
    type: 'text',
    text: 'Hello !',
    date: new Date(),
  },
  {
    position: 'left',
    title: 'George',
    titleColor: 'blue',
    type: 'photo',
    text: 'Check this out !',
    data: {
      uri: rsg,
      width: 'auto',
      height: 100,
    },
    date: new Date(),
  },
];
