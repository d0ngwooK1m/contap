import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { history } from '../features/configureStore';

import { Grid, Text } from '../elements';

const CardProfile = () => {
  const cardList = useSelector((state) => state.cards.current);
  console.log(cardList);

  return (
    <Grid
      width="350px"
      height="200px"
      borderRadius="16px"
      border="1px solid #dcdcdc"
      bgcolor="background.paper"
      margin="25px auto"
    >
      <Div>
        <Grid margin="20px" width="125px">
          <Img src={cardList.profile} />
        </Grid>
        <TextDiv>
          <Text>{cardList.userName}</Text>
        </TextDiv>
      </Div>
      <TDiv>관심사</TDiv>
      <Btn
        onClick={() => {
          history.push('/edit');
        }}
      >
        수정하기
      </Btn>
    </Grid>
  );
};

CardProfile.defaultProps = {
  profile:
    'http://file3.instiz.net/data/cached_img/upload/2019/12/09/17/c7dc4d6a28ec0d6079a6738c0e3fcc38.jpg',
};

export default CardProfile;

const Div = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Img = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0px;
  width: 123px;
`;

const TextDiv = styled.div`
  position: absolute;
  top: 15vh;
  left: 49vw;
`;

const TDiv = styled.div`
  position: absolute;
  top: 30vh;
  left: 33vw;
`;

const Btn = styled.button`
  width: 80px;
  position: absolute;
  top: 16vh;
  left: 53vw;
`;