/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { loadCurrentCardDB } from '../features/cards/actions';

import CardModal from './CardModal';
import { Grid, Image, Text } from '../elements';
import HashTag from './HashTag';

const CardFront = ({ id, contap }) => {
  const dispatch = useDispatch();
  const front = useSelector((state) =>
    contap ? state.taps.byId : state.cards.byId,
  );

  const stackHashTags = front[id].hashTags.split('_')[0].split('@').slice(1, 2);
  const interestHashTags = front[id].hashTags
    .split('_')[1]
    .split('@')
    .slice(1, 4);

  const [shwoModal, setShowMadal] = React.useState(false);

  const behind = async () => {
    await dispatch(loadCurrentCardDB(id));
    setShowMadal(!shwoModal);
  };

  const currentCard = useSelector((state) => state.cards.current);
  return (
    <Grid
      width="350px"
      height="200px"
      borderRadius="16px"
      border="1px solid black"
      margin="16px"
      _onClick={behind}
    >
      <CardModal
        show={shwoModal}
        onHide={() => setShowMadal(false)}
        card={currentCard}
      />
      <Div is_flex>
        <Image shape="circle" src={front[id]?.profile} />
        <Grid width="30%" margin="0px 20px">
          <Text>{front[id]?.userName}</Text>
          <Text color="#7F7C82" bold>
            # {stackHashTags}
          </Text>
        </Grid>
      </Div>
      <Hash>
        {interestHashTags.map((stack, idx) => {
          return stack && <HashTag key={idx} tag={stack} />;
        })}
      </Hash>
    </Grid>
  );
};

CardFront.propTypes = {
  id: PropTypes.number.isRequired,
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
