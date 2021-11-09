import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { history } from '../features/configureStore';

import { Grid } from '../elements';
import { ReactComponent as DoodleDots } from '../svgs/DoodleDots.svg';
import { ReactComponent as UpdateBtn } from '../svgs/UpdateBtn.svg';
import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';

const CardProfile = () => {
  const cardList = useSelector((state) => state.cards.current);
  console.log(cardList);

  return (
    <Grid>
      <TitleText>{cardList.userName}님의 프로필</TitleText>
      <DotDiv>
        <DoodleDots />
      </DotDiv>
      <ProfileDiv>
        <Div>
          <Grid margin="32px" width="125px" height="112px">
            <Img src={cardList.profile} />
          </Grid>
          <Grid width="40%" margin="56px 0px 0px 0px">
            <NameText>{cardList.userName}</NameText>
            <InterestText>#자바스크립트</InterestText>
          </Grid>
          <BtnDiv>
            <UpdateBtn
              cursor="pointer"
              onClick={() => {
                history.push('/edit');
              }}
            />
          </BtnDiv>
        </Div>
        <StackText>관심사</StackText>
      </ProfileDiv>
    </Grid>
  );
};

CardProfile.defaultProps = {
  profile:
    'http://file3.instiz.net/data/cached_img/upload/2019/12/09/17/c7dc4d6a28ec0d6079a6738c0e3fcc38.jpg',
};

export default CardProfile;

const DotDiv = styled.div`
  position: absolute;
  left: 450px;
  top: 30%;
`;
const ProfileDiv = styled.div`
  width: 540px;
  height: 308px;
  border-radius: 16px;
  margin: 62px auto 114px auto;
  background: linear-gradient(
    -45deg,
    #7e22ce,
    #7434c6,
    #6451b9,
    #5b62b1,
    #4982a2,
    #41929b,
    #3e9699,
    #37a393,
    #29bd87,
    #73cba7,
    #94d1b5
  );
  // position: absolute;
  // z-index: 1;
`;

const Div = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const TitleText = styled.p`
  font-size: ${FontScale.Header_32};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  text-align: center;
  margin-top: 66px;
  font-weight: 700;
`;

const NameText = styled.p`
  font-size: ${FontScale.Header_32};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  margin-bottom: 22px;
  font-weight: 700;
`;

const InterestText = styled.p`
  font-size: ${FontScale.Header_24};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  // margin: 160px 0px 64px 0px;
  font-weight: 700;
`;

const Img = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 112px;
  border-radius: 8px;
`;

// const TextDiv = styled.div`
//   position: absolute;
//   top: 20vh;
//   left: 42vw;
// `;

const StackText = styled.div`
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  margin: 0px 0px 12px 32px;
  font-weight: 700;
`;

const BtnDiv = styled.div`
  width: 20%;
  // cursor: pointer;
  margin: 22px 26px 0px 0px;
`;

// const Btn = styled.button`
//   width: 80px;
//   position: absolute;
//   top: 21vh;
//   left: 53vw;
// `;
