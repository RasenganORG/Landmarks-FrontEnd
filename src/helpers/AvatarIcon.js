import React from 'react';
import { Buffer } from 'buffer';
import SVG from 'react-inlinesvg';
import Icon from '@ant-design/icons';

export default function AvatarIcon({ svg64, size }) {
  const decodedAvatar = Buffer.from(svg64, 'base64').toString();
  const newSVG = () => <SVG src={decodedAvatar} />;
  const UserAvatar = (props) => <Icon component={newSVG} {...props} />;

  return <UserAvatar />;
}
