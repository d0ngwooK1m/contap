import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Grid, Image, Text } from '../elements';

const CardFront = ({ id = '' }) => {
  const front = useSelector((state) => state.cards.byId);
  return (
    <Grid
      width="350px"
      height="200px"
      borderRadius="16px"
      border="1px solid black"
    >
      <Div is_flex>
        <Image shape="circle" src={front[id].profile} />
        <Grid width="30%" margin="0px 20px">
          <Text>{front[id].userName}</Text>
          <Text>{front[id].stack}</Text>
          <Text>{front[id].interest}</Text>
        </Grid>
      </Div>
    </Grid>
  );
};

CardFront.propTypes = {
  id: PropTypes.number.isRequired,
};

// CardFront.defaultProps = {
//   userName: '이아롱',
//   profile:
//     'http://file3.instiz.net/data/cached_img/upload/2019/12/09/17/c7dc4d6a28ec0d6079a6738c0e3fcc38.jpg',
//   interest: '여행',
//   stack: 'React',
// };

export default CardFront;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10% 0px;
`;
