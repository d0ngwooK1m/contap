/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

import CardFrontWrite from '../components/CardFrontWrite';
import StackSearch from '../components/StackSearch';
import HobbySearch from '../components/HobbySearch';

import { ColorStyle } from '../utils/systemDesign';
import { Grid, Text } from '../elements';

const CardEdit = () => {
  // 새로고침 감지시 발생하는 이벤트
  onbeforeunload = function (e) {
    e.preventDefault();
    //let dialogText = 'Dialog text here';
    //e.returnValue = dialogText;
    return 0;
  };

  return (
    <div style={{ paddingTop: '88px' }}>
      <Grid>
        <Grid>
          <CardFrontWrite />
        </Grid>
        <Grid>
          <StackDiv>
            <TagDiv>
              <Text bold32>스택/툴</Text>
            </TagDiv>
            <Grid>
              <StackSearch />
            </Grid>
          </StackDiv>
          <TagDiv>
            <Text bold32>관심사</Text>
          </TagDiv>
          <Grid>
            <HobbySearch />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default CardEdit;

const TagDiv = styled.div`
  margin: 80px 0px 53px 165px;
`;

const StackDiv = styled.div`
  width: 1110px
  border-bottom: 1px solid ${ColorStyle.BackGround300};
`;
