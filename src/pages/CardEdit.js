import React from 'react';
import styled from 'styled-components';

import CardFrontWrite from '../components/CardFrontWrite';
import StackSearch from '../components/StackSearch';
import HobbySearch from '../components/HobbySearch';
import { Grid, Text } from '../elements';

const CardEdit = () => {
  return (
    <Grid>
      <Grid>
        <CardFrontWrite />
      </Grid>
      <Grid>
        <TagDiv>
          <Text bold32>스택/툴</Text>
        </TagDiv>
        <Grid>
          <StackSearch />
        </Grid>
        <TagDiv>
          <Text bold32>관심사</Text>
        </TagDiv>
        <Grid>
          <HobbySearch />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default CardEdit;

const TagDiv = styled.div`
  margin: 80px 0px 53px 165px;
`;
