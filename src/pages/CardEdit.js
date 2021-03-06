/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

import CardFrontWrite from '../components/CardFrontWrite';
// import StackSearch from '../components/StackSearch';
import StackSearch2 from '../components/StackSearch2';
// import HobbySearch from '../components/HobbySearch';
import HobbySearch2 from '../components/HobbySearch2';
import { useParams } from 'react-router-dom';

import { ColorStyle } from '../utils/systemDesign';
import { Grid, Text } from '../elements';

const CardEdit = (props) => {
  // 새로고침 감지시 발생하는 이벤트
  // onbeforeunload = function (e) {
  //   e.preventDefault();
  //   //let dialogText = 'Dialog text here';
  //   //e.returnValue = dialogText;
  //   return 0;
  // };
  const params = useParams();
  const userId = params.userId;
  const [maxMessage, setMaxMessage] = React.useState(false);

  return (
    <div style={{ paddingTop: '88px' }}>
      <Grid>
        <Grid>
          <CardFrontWrite userId={userId} setMaxMessage={setMaxMessage} />
        </Grid>
        <Grid>
          <TagDiv>
            <Text bold32>스택/툴</Text>
          </TagDiv>
          <Grid>
            <StackSearch2 />
          </Grid>
          <TagDiv>
            <Text bold32>관심사</Text>
          </TagDiv>
          <Grid>
            <HobbySearch2
              maxMessage={maxMessage}
              setMaxMessage={setMaxMessage}
            />
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

// const StackDiv = styled.div`
//   width: 1110px;
//   border-bottom: 1px solid ${ColorStyle.BackGround300};
// `;
