/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { history } from '../features/configureStore';

import { Grid } from '../elements';
import { ReactComponent as DoodleDots } from '../svgs/DoodleDots.svg';
import { ReactComponent as CardEffect } from '../svgs/CardEffect.svg';
// import { ReactComponent as Effects } from '../svgs/Effects.svg';
import { ReactComponent as UpdateBtn } from '../svgs/UpdateBtn.svg';
import BasicProfile from '../assets/image/CardProfile.svg';
import {
  FontFamily,
  FontScale,
  ColorStyle,
  Opacity,
} from '../utils/systemDesign';
import TagList from './TagList';

const CardProfile = () => {
  const cardList = useSelector((state) => state.cards.current);

  // const copy = cardList.slice();

  const stackTag = cardList?.hashTagsString?.split('_')[0]?.split('@')[1];
  // .slice(1, 2);
  // const tag = concat('#').stackTag;
  // const stackTag = '#' + tag;
  console.log('카드리스트====>', cardList);
  console.log('앞면 태그1 확인====>', stackTag);
  console.log('앞면 태그확인====>', stackTag ? stackTag[0] === '' : null);
  // if (stackTag.length === 1) {
  //   if (stackTag[0] === '') {
  //     stackTag = [];
  //   }
  // }

  const hobbyTag = cardList?.hashTagsString
    ?.split('_')[1]
    ?.split('@')
    ?.slice(1, 4);
  console.log('앞면 관심사 태그확인====>', hobbyTag);
  console.log('앞면 관심사1 태그확인====>', hobbyTag === '');
  console.log(
    '앞면 관심사 길이 확인====>',
    hobbyTag ? hobbyTag.length === 0 : null,
  );

  // if (hobbyTag.length === 1 && hobbyTag === '') {
  //   hobbyTag = [];
  // }

  return (
    <Grid padding="66px 0px 114px 0px" bg={ColorStyle.BackGround}>
      <TitleText>{cardList.userName}님의 프로필</TitleText>

      <Box>
        <DotDiv>
          <DoodleDots />
          <div style={{ position: 'absolute', top: '-70%', left: '3%' }}>
            <CardEffect />
          </div>
        </DotDiv>
        <ProfileDiv>
          <Div>
            <Grid margin="32px 32px 38px 32px" width="124px" height="112px">
              <Img src={cardList.profile ? cardList.profile : BasicProfile} />
            </Grid>
            <Grid width="40%" margin="56px 0px 0px 0px">
              <NameText>{cardList.userName}</NameText>
              <StackText>
                {stackTag === '' ? (
                  '# 나의 스택'
                ) : (
                  <StackEditText>#{stackTag}</StackEditText>
                )}
              </StackText>
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

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginLeft: '32px',
            }}
          >
            <BasicHashTag />
            <BasicHashTag />
            <BasicHashTag />
          </div>
          <HobbyDiv>
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
  width: 540px;
  height: 308px;
  margin: 0px auto;
  position: relative;
  z-index: 3;
  // background: conic-gradient(
  //   from 88.92deg at 47.81% 59.2%,
  //   #9230df -16.52deg,
  //   #3f94e2 62.85deg,
  //   #23d28b 95.04deg,
  //   #3bacdb 115.28deg,
  //   #aa63e2 132.84deg,
  //   #e153c2 343.48deg
  // );
  // filter: blur(140px);
`;

// const Effect = styled.div`
//   position: relative;
//   width: 800px;
//   top: 50%
//   background: conic-gradient(
//     from 90deg at 50% 50%,
//     #e153c2 -15.52deg,
//     #9230df 45.42deg,
//     #3f94e2 125.96deg,
//     #23d28b 230.98deg,
//     #3bacdb 274.1deg,
//     #aa63e2 313.48deg,
//     #e153c2 344.48deg,
//     #9230df 405.42deg
//   );
//   filter: blur(90px);
//   z-index: -10;
//   text-align: center;
// `;

const DotDiv = styled.div`
  position: absolute;
  left: -43%;
  top: 3%;
  z-index: -1;
`;

const ProfileDiv = styled.div`
  width: 540px;
  height: 308px;
  margin: 62px auto 114px auto;
  background: linear-gradient(
    108.12deg,
    #94d1b5 0%,
    #6cc9a4 9.58%,
    #47c294 18.4%,
    #29bd87 25.62%,
    #33aa90 34.8%,
    #3e9699 44.22%,
    #4982a2 53.95%,
    #546eab 63.57%,
    #6158b5 74.23%,
    #6a47bd 82.13%,
    #7238c4 89.19%,
    #7e22ce 100.01%
  );
  box-shadow: 14px 30px 35px 4px rgba(10, 10, 10, 0.4);
  border-radius: 16px;
  z-index: 100;
  position: relative;
  // box-shadow: 14px 30px 35px 4px ${'#0a0a0a' + Opacity[40]};
`;

const Div = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
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
  color: ${ColorStyle.Gray500 + Opacity[50]};
  // margin: 160px 0px 64px 0px;
  font-weight: 700;
`;

const StackEditText = styled.p`
  font-size: ${FontScale.Header_24};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  // margin: 160px 0px 64px 0px;
  font-weight: 700;
`;

const BasicHashTag = styled.div`
  width: 146px;
  height: 54px;
  margin-right: 16px;
  border-radius: 50px;
  border: 1px solid ${ColorStyle.Gray500 + Opacity[15]};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray100};
  font-weight: 400;
  text-align: center;
  line-height: 54px;
  background: ${ColorStyle.BackGround300 + Opacity[10]};
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
  position: absolute;
  top: 69%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  // justify-content: center;
  margin-left: 32px;
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
