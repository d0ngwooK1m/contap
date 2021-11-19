/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { history } from '../features/configureStore';

import { Grid } from '../elements';
// import { ReactComponent as DoodleDots } from '../svgs/DoodleDots.svg';
import { ReactComponent as Effects } from '../svgs/Effects.svg';
import { ReactComponent as UpdateBtn } from '../svgs/UpdateBtn.svg';
import BasicProfile from '../assets/image/Profile.svg';
import {
  FontFamily,
  FontScale,
  ColorStyle,
  Opacity,
} from '../utils/systemDesign';
import TagList from './TagList';

const CardProfile = () => {
  const cardList = useSelector((state) => state.cards.current);
  console.log(cardList);
  const stackTag = cardList.hashTagsString
    ?.split('_')[0]
    ?.split('@')
    .slice(1, 2);
  // const tag = concat('#').stackTag;
  // const stackTag = '#' + tag;
  console.log('앞면 태그확인====>', stackTag);
  const hobbyTag = cardList.hashTagsString
    ?.split('_')[1]
    ?.split('@')
    .slice(1, 4);
  console.log('앞면 관심사 태그확인====>', hobbyTag);

  return (
    <Grid
      padding="66px 0px 114px 0px"
      bg={ColorStyle.BackGround300 + Opacity[40]}
    >
      <TitleText>{cardList.userName}님의 프로필</TitleText>
      <Box>
        <DotDiv>
          <Effects />
        </DotDiv>
        <ProfileDiv>
          <Div>
            <Grid margin="32px" width="124px" height="112px">
              <Img src={cardList.profile ? cardList.profile : BasicProfile} />
            </Grid>
            <Grid width="40%" margin="56px 0px 0px 0px">
              <NameText>{cardList.userName}</NameText>
              <StackText>#{stackTag}</StackText>
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
          <HobbyText>관심사</HobbyText>
          <HobbyDiv>
            {/* <HobbyDiv>{hobbyTag[0]}</HobbyDiv>
          <TagDiv>{hobbyTag[1]}</TagDiv>
          <TagDiv>{hobbyTag[2]}</TagDiv> */}
            {hobbyTag?.map((hobby, idx) => {
              return hobby && <TagList key={idx} tag={hobby} />;
            })}
          </HobbyDiv>
        </ProfileDiv>
      </Box>
    </Grid>
  );
};

export default CardProfile;

const Box = styled.div`
  width: 800px;
  height: 308px;
  margin: 0px auto;
  position: relative;
  z-index: 3;
`;

const DotDiv = styled.div`
  position: absolute;
  left: -20%;
  top: -70%;
  z-index: -1;
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
    #5867ae,
    #4982a2,
    #41929b,
    #3e9699,
    #37a393,
    #29bd87,
    #73cba7,
    #78cca9,
    #94d1b5
  );
  z-index: 3;
  position: relative;
  // left: 450px;
  // top: 256px;
  box-shadow: 14px 30px 35px 4px ${'#0a0a0a' + Opacity[40]};
`;

const Div = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
  // z-index: 2;
`;

const TitleText = styled.p`
  font-size: ${FontScale.Header_32};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  text-align: center;
  font-weight: 700;
`;

const NameText = styled.p`
  font-size: ${FontScale.Header_32};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  margin-bottom: 22px;
  font-weight: 700;
`;

const StackText = styled.p`
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
  border: 1px solid ${ColorStyle.Gray100 + Opacity[25]};
  border-radius: 8px;
  object-fit: cover;
`;

// const TextDiv = styled.div`
//   position: absolute;
//   top: 20vh;
//   left: 42vw;
// `;

const HobbyText = styled.div`
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  margin: 0px 0px 12px 32px;
  font-weight: 700;
`;

const HobbyDiv = styled.div`
  display: flex;
  // justify-content: center;
  margin-left: 24px;
`;

const TagDiv = styled.div`
  width: 146px;
  height: 54px;
  line-height: 54px;
  margin-left: 16px;
  border-radius: 50px;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  font-weight: 400;
  text-align: center;
  background-color: ${ColorStyle.BackGround300 + Opacity[15]};
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
