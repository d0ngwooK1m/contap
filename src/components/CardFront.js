/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { loadCurrentCardDB } from '../features/cards/actions';
import CardFrontContap from './CardFrontContap';
import HashTag from './HashTag';

import CardModal from './CardModal';
import ContapModal from './ContapModal';
import { Grid, Image, Text } from '../elements';
import T from '../api/tokenInstance';
import Chat from './Chat/Chat';

const CardFront = ({ userId, contap, select, grab }) => {
  const dispatch = useDispatch();
  const front = useSelector((state) =>
    contap ? state.taps.byId : state.cards.byId,
  );
  const [showModal, setShowMadal] = React.useState(false);
  const [sideModal, setSideModal] = React.useState(false);

  // console.log(front);
  console.log(front[userId].hashTags);

  const stackHashTags = front[userId].hashTags
    ?.split('_')[0]
    ?.split('@')
    .slice(1, 2);
  const interestHashTags = front[userId].hashTags
    ?.split('_')[1]
    ?.split('@')
    .slice(1, 4);

  const showCardBackModal = async () => {
    if (!showModal) {
      await dispatch(loadCurrentCardDB(userId));
    }
    setShowMadal(true);
  };

  // console.log(userId);

  const closeModal = () => {
    setShowMadal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const rejectTap = async () => {
    await T.POST('/contap/reject', { tagId: front[userId].tapId });
    console.log('거절');
  };

  const acceptTap = async () => {
    const { data } = await T.POST('/contap/accept', {
      tagId: front[userId].tapId,
    });
    console.log('수락');
    console.log(data);
  };

  const handleSideModal = () => {
    setShowMadal(false);
    setSideModal(true);
  };

  const closeSideModal = () => {
    setSideModal(false);
    setShowMadal(true);
  };

  return (
    <Grid
      width="350px"
      height="200px"
      borderRadius="16px"
      border="1px solid black"
      margin="16px"
      _onClick={showCardBackModal}
    >
      <Grid _onClick={stopPropagation}>
        {!contap && (
          <CardModal show={showModal} onHide={closeModal} userId={userId} />
        )}
        {contap && showModal && (
          <ContapModal
            className="contapModal"
            show={showModal}
            onHide={closeModal}
            userId={userId}
          >
            <CardFrontContap onModal={handleSideModal} userId={userId} />
            {grab && <Chat userId={userId} />}
          </ContapModal>
        )}
        {sideModal && (
          <CardModal show={sideModal} onHide={closeSideModal} userId={userId} />
        )}
      </Grid>
      <Div is_flex>
        <Image
          shape="circle"
          src={front[userId] ? front[userId].profile : null}
        />
        <Grid width="30%" margin="0px 20px">
          <Text>{front[userId] ? front[userId].userName : null}</Text># 
          {stackHashTags}
          <Text color="#7F7C82" bold />
        </Grid>
      </Div>
      <Hash>
        {interestHashTags?.map((stack, idx) => {
          return stack && <HashTag key={idx} tag={stack} />;
        })}
      </Hash>
      <Grid _onClick={stopPropagation}>
        {contap && select === 'ReceiveTap' && (
          <button type="button" onClick={acceptTap}>
            수락
          </button>
        )}
        {contap && select === 'ReceiveTap' && (
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
  select: PropTypes.string,
  contap: PropTypes.bool,
};

CardFront.defaultProps = {
  select: null,
  contap: false,
};

export const MemoizedCardFront = React.memo(CardFront);
// export default CardFront;

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
