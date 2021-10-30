import React from 'react';

import { Grid, Text } from '../elements';

const CardBackWrite = () => {
  return (
    <Grid
      width="960px"
      height="510px"
      borderRadius="16px"
      border="1px solid #dcdcdc"
      bgcolor="background.paper"
      margin="auto"
    >
      <Text>프로젝트 이름</Text>
      <Text>프로젝트 설명</Text>
    </Grid>
  );
};

export default CardBackWrite;
