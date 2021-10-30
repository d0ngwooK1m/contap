/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { loadCurrentCardDB } from '../features/cards/actions';

import CardModal from './CardModal';
import { Grid, Image, Text } from '../elements';
import HashTag from './HashTag';
import T from '../api/tokenInstance';

const CardFront = ({ userId, contap }) => {
  const dispatch = useDispatch();
  const front = useSelector((state) =>
    contap ? state.taps.byId : state.cards.byId,
  );

  console.log(front[userId]);

  const stackHashTags = front[userId].hashTags
    ?.split('_')[0]
    .split('@')
    .slice(1, 2);
  const interestHashTags = front[userId].hashTags
    ?.split('_')[1]
    .split('@')
    .slice(1, 4);
  console.log(stackHashTags, interestHashTags);

  const [showModal, setShowMadal] = React.useState(false);

  console.log(userId);
  const behind = async () => {
    if (!showModal) {
      await dispatch(loadCurrentCardDB(userId));
    }
    setShowMadal(true);
  };

  const closeModal = () => {
    setShowMadal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const rejectTap = async () => {
    await T.POST('/contap/reject', { tagId: front[userId].tapId });
    console.log('거절')
  };

  const acceptTap = async () => {
    const { data} = await T.POST('/contap/accept', { tagId: front[userId].tapId });
    console.log('수락')
    console.log(data)
  };

  return (
    <Grid
      width="350px"
      height="200px"
      borderRadius="16px"
      border="1px solid black"
      margin="16px"
      _onClick={behind}
    >
      <Grid _onClick={stopPropagation}>
        <CardModal show={showModal} onHide={closeModal} userId={userId} />
      </Grid>
      <Div is_flex>
        <Image shape="circle" src={front[userId]?.profile} />
        <Grid width="30%" margin="0px 20px">
          <Text>{front[userId]?.userName}</Text>
          <Text color="#7F7C82" bold>
            # {stackHashTags}
          </Text>
        </Grid>
      </Div>
      <Hash>
        {interestHashTags?.map((stack, idx) => {
          return stack && <HashTag key={idx} tag={stack} />;
        })}
      </Hash>
      <Grid _onClick={stopPropagation}>
        {contap && (
          <button type="button" onClick={acceptTap}>
            수락
          </button>
        )}
        {contap && (
          <button type="button" onClick={rejectTap}>
            거절
          </button>
        )}
      </Grid>
    </Grid>
  );
};

CardFront.propTypes = {
  userId: PropTypes.number.isRequired,
  contap: PropTypes.bool,
};

CardFront.defaultProps = {
  contap: false,
};

export default CardFront;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10% 0px;
`;

const Hash = styled.div`
  display: flex;
  margin: -10px 10px;
`;
