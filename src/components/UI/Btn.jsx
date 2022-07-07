import { Button } from 'antd';

import { PlusSquareOutlined, RightSquareOutlined } from '@ant-design/icons';

export default function Btn({ text, icon = true }) {
  const whichIcon = icon ? <PlusSquareOutlined /> : <RightSquareOutlined />;

  return (
    <Button type='primary' icon={whichIcon} block={true}>
      {text}
    </Button>
  );
}
