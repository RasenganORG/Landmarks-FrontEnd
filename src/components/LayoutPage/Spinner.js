import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function Spinner({ tip, size }) {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: size || 64,
      }}
      spin
    />
  );

  return <Spin indicator={antIcon} tip={tip || 'Loading...'} />;
}
