import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Text } from '../elements';

const CardFront = ({ profile, userName, interest, stack }) => {
  return (
    <Grid>
      <Grid
        width="350px"
        height="200px"
        borderRadius="16px"
        border="1px solid black"
      >
        <Image shape="circle" src={profile} />
        <Text>이름: {userName}</Text>
        <Text>스택: {stack}</Text>
        <Text>관심사: {interest}</Text>
      </Grid>
    </Grid>
  );
};

CardFront.propTypes = {
  userName: PropTypes.string,
  profile: PropTypes.string,
  interest: PropTypes.string,
  stack: PropTypes.string,
};

CardFront.defaultProps = {
  userName: '이아롱',
  profile:
    'http://file3.instiz.net/data/cached_img/upload/2019/12/09/17/c7dc4d6a28ec0d6079a6738c0e3fcc38.jpg',
  interest: '여행',
  stack: 'React',
};

export default CardFront;
