import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { Grid, Text } from '../elements';

const CardBack = ({ id }) => {
  const back = useSelector((state) => state.cards.byId);

  return (
    <Grid
      width="960px"
      height="510px"
      borderRadius="16px"
      border="1px solid black"
    >
      <Grid>
        {/* <Image scr={image} shape="rectangle" /> */}
        <Text>{back[id].title}</Text>
        <Text>{back[id].content}</Text>
        <Text>{back[id].stack}</Text>
        <Text>{back[id].interest}</Text>
      </Grid>
    </Grid>
  );
};

CardBack.propTypes = {
  id: PropTypes.number.isRequired,
};

// CardBack.defaultProps = {
//   content: '제 포트폴리오를 소개합니다.',
//   // image:
//   //   'https://mblogthumb-phinf.pstatic.net/MjAxNzA5MjdfODkg/MDAxNTA2NTIyOTMwOTA4.YSIpeIFX6GAna9UvWS_IarVWxfHYA4vHlC6Yn49YAQYg.f18IO5v8tMvIvbcv7bcdGRdoyW3QPK0gFbAAuhdCl4Mg.PNG.june6505/y1.png?type=w2',
//   interest: '여행',
//   stack: 'React',
// };

export default CardBack;
