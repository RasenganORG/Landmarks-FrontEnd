import { Typography } from 'antd';

const { Title } = Typography;

export default function Home() {
  return (
    <div>
      <Title level={1}>Landmarks</Title>
      <Title level={2}>Create your next adventure</Title>
      <Title level={3}>Planning and sharing made easier</Title>
      <br />
      <div>
        <p>
          With Landmarks you can easily add markers, routes and itineraries of
          your favourite destinations.
        </p>
        <p>The best part ? You can share them with your friends.</p>
        <p>
          Everyone can see your planned adventure, but also come up with their
          own.
        </p>
      </div>
      <br />
      <div className='card'>
        <Title level={3}>Create a room</Title>
        <h1>And start adventuring with your friends.</h1>
      </div>
      <br />
      <div className='card'>
        <Title level={3}>Join a room</Title>
        <h1>Get in on the fun.</h1>
      </div>
    </div>
  );
}
