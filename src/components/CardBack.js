import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Text } from '../elements';

const CardBack = ({ content, image, interest, stack }) => {
  return (
    <Grid>
      <Grid>
        <Image scr={image} shape="rectangle" />
        <Text>{content}</Text>
        <Text>{stack}</Text>
        <Text>{interest}</Text>
      </Grid>
    </Grid>
  );
};

CardBack.propTypes = {
  content: PropTypes.string,
  image: PropTypes.string,
  interest: PropTypes.string,
  stack: PropTypes.string,
};

CardBack.defaultProps = {
  content: '제 포트폴리오를 소개합니다.',
  image:
    'https://mblogthumb-phinf.pstatic.net/MjAxNzA5MjdfODkg/MDAxNTA2NTIyOTMwOTA4.YSIpeIFX6GAna9UvWS_IarVWxfHYA4vHlC6Yn49YAQYg.f18IO5v8tMvIvbcv7bcdGRdoyW3QPK0gFbAAuhdCl4Mg.PNG.june6505/y1.png?type=w2',
  interest: '여행',
  stack: 'React',
};

export default CardBack;
