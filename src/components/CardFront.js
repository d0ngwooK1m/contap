// /*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';

import { loadCurrentCardDB, onPopup } from '../features/cards/actions';
import CardModal from './CardModal';
import { Grid, Image, Text, Button } from '../elements';

const CardFront = ({ id = '', contap }) => {
  const dispatch = useDispatch();
  const front = useSelector((state) =>
    contap ? state.taps.byId : state.cards.byId,
  );
  // console.log(contap);
  // console.log(front);
  // console.log(id);

  const handlePopup = useSelector((state) => state.cards.isPopup);
  const back = useSelector((state) => state.cards.byId);
  // console.log('back 확인===>', back);

  const behind = () => {
    dispatch(loadCurrentCardDB(back[id].userId));
    if (!handlePopup) {
      dispatch(onPopup(true));
    }
  };

  return (
    <Grid
      width="350px"
      height="200px"
      borderRadius="16px"
      border="1px solid black"
    >
      {handlePopup && <CardModal />}
      <Div is_flex>
        <Image shape="circle" src={front[id]?.profile} />
        <Grid width="30%" margin="0px 20px">
          <Text>{front[id]?.userName}</Text>
          <Text>{front[id]?.stack}</Text>
          <Text>{front[id]?.interest}</Text>
        </Grid>
      </Div>
      <Button _onClick={behind}>뒷면</Button>
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
