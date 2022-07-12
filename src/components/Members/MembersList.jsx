import 'antd/dist/antd.min.css';
import { Avatar, Col, Row, List, Skeleton, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../../store/membersList-actions';
import { membersListActions } from '../../store/membersList-slice';

export default function Members() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.membersList.members);
  const count = useSelector((state) => state.membersList.count);
  const howManyToLoad = useSelector((state) => state.membersList.howManyToLoad);
  const initialLoading = useSelector(
    (state) => state.membersList.initialLoading
  );
  const loading = useSelector((state) => state.membersList.loading);

  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (members.length === 0) dispatch(fetchMembers());
  }, [dispatch, members]);

  useEffect(() => {
    setList(members);
    setData(members);
  }, [count, members]);

  const onLoadMore = () => {
    dispatch(membersListActions.changeLoading(true));
    setList(
      data.concat(
        [...new Array(howManyToLoad)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );

    dispatch(fetchMembers());
    dispatch(membersListActions.changeLoading(false));
    window.dispatchEvent(new Event('resize'));
  };

  const loadMore =
    !initialLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <>
      <Row gutter={[0, 0]}>
        {/* Numer of members */}
        <Col span={10}>
          {members.legth ? members.legth : '0'}
          {members.legth === 1 ? ' member' : ' members'}
        </Col>
        {/* Add member button */}
        <Col span={10}></Col>
      </Row>
      <br />
      <List
        className='demo-loadmore-list'
        loading={initialLoading}
        itemLayout='horizontal'
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={item.name?.last}
                description={item.name?.title}
              />
              {item.nat}
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
}
