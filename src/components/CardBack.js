/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import HashTag from './HashTag';
import TapForm from './TapForm';

const CardBack = ({ card, userId }) => {
  const stackHashTags = card.hashTags?.split('_')[0]?.split('@');
  const interestHashTags = card.hashTags?.split('_')[1]?.split('@');

  return (
    <Wrap>
      <Card>
        <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>
          {card?.title}
        </Typography>
        <Typography>{card?.content}</Typography>
        <div>
          <Typography>기술스택</Typography>
          <Hash>
            {stackHashTags?.map((stack, idx) => {
              return stack && <HashTag key={idx} tag={stack} />;
            })}
          </Hash>
        </div>
        <div>
          <Typography>관심사</Typography>
          <Hash>
            {interestHashTags?.map((stack, idx) => {
              return stack && <HashTag key={idx} tag={stack} />;
            })}
          </Hash>
          <TapForm userId={userId} />
        </div>
      </Card>
    </Wrap>
  );
};

CardBack.propTypes = {
  card: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
};

const Wrap = styled.div`
  width: 100%;
`;

const Card = styled.div`
  background-color: #fff;
  width: 820px;
  height: 450px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 16px;
`;

const Hash = styled.div`
  display: flex;
  margin: -10px 10px;
`;

export default CardBack;
