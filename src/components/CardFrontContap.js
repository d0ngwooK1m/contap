/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Grid, Image, Text } from '../elements';
import HashTag from './HashTag';

const CardFrontContap = ({ userId, onModal }) => {
  const front = useSelector((state) => state.taps.byId);

  const stackHashTags = front[userId].hashTags
    ?.split('_')[0]
    ?.split('@')
    .slice(1, 2);
  const interestHashTags = front[userId].hashTags
    ?.split('_')[1]
    ?.split('@')
    .slice(1, 4);
  console.log(stackHashTags, interestHashTags);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Grid
      width="350px"
      height="200px"
      borderRadius="16px"
      border="1px solid black"
      margin="16px"
      _onClick={onModal}
    >
      <Div is_flex>
        <Image
          shape="circle"
          src={front[userId] ? front[userId].profile : null}
        />
        <Grid width="30%" margin="0px 20px">
          <Text>{front[userId] ? front[userId].userName : null}</Text>#{' '}
          {stackHashTags}
          <Text color="#7F7C82" bold />
        </Grid>
      </Div>
      <Hash>
        {interestHashTags?.map((stack, idx) => {
          return stack && <HashTag key={idx} tag={stack} />;
        })}
      </Hash>

      <Grid _onClick={stopPropagation} />
    </Grid>
  );
};

CardFrontContap.propTypes = {
  userId: PropTypes.number.isRequired,
  onModal: PropTypes.func.isRequired,
};

export default CardFrontContap;

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
