/* eslint-disable */
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ColorStyle, FontFamily, Opacity } from '../utils/systemDesign';
import { IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled, { keyframes } from 'styled-components';
import { loadCardFrontDB, loadCurrentCardDB, loading } from '../features/cards/actions';
import { MemoizedCardFront } from '../components/CardFront';
import SearchBar from '../components/SearchBar';
import { Text } from '../elements';
import { ReactComponent as TitleBgSvg } from '../svgs/TitleBG.svg';
import { ReactComponent as SquareShadow } from '../svgs/Reflex.svg';
import { ReactComponent as SquareLeft } from '../svgs/ShapeLeft.svg';
import { ReactComponent as SquareRight } from '../svgs/ShapeRight.svg';
import { ReactComponent as RefreshSvg } from '../svgs/Refresh.svg';
import { ReactComponent as ArrowTopLightSvg } from '../svgs/ArrowTopLight.svg';
import { getToken } from '../utils/auth';
import {LoginAlert }from '../utils/alert';
import { ReactComponent as LoginAlertSvg } from '../svgs/LoginAlert.svg';
import { ReactComponent as ResizeSvg } from '../svgs/Resize.svg';
import { ReactComponent as LogoSvg } from '../svgs/Logo.svg';

const CardList = () => {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.cards);
  const isSearching = useSelector((state) => state.cards.isSearching);
  const isLoading = useSelector((state) => state.cards.isLoading);
  const token = getToken();
  const params = useParams();
  console.log('렌더링 몇번 되는거니?');
  // const isAuthorized = useSelector((state) => state.user.isAuthorized);

  console.log(params);
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  React.useEffect(async () => {
    if (params.userId) {
      if (!token) {
        const { isConfirmed, isDismissed, dismiss } = await LoginAlert.fire({
          title: (
            <>
              <LoginAlertSvg />
              <div style={{ marginTop: '32px', marginBottom: '16px' }}>
                <Text bold24>회원이신가요?</Text>
              </div>
              <Text regular16>로그인을 먼저 해주세요</Text>
            </>
          ),
        });
        if (dismiss === 'backdrop') {
          return;
        }
        if (isConfirmed) {
          history.push('/login');
        } else if (isDismissed) {
          history.push('/signup');
        }
        return null;
      } else {
        dispatch(loading(true))
        await dispatch(loadCurrentCardDB(parseInt(params.userId)));
      }
    }
  }, []);
  React.useEffect(() => {
    if (cardList.allIds.length !== 0) {
      return;
    }

    if (!isSearching) {
      console.log('이게 문제야?');
      dispatch(loadCardFrontDB());
    }
  }, [isSearching]);

  if (window.matchMedia('(max-width: 1440px)').matches) {
    return (
      <Wrapper>
        <ContentWrapper>
          <LogoSvg />
          <Text color="white" bold20>
            모바일을 지원하지 않습니다
            <br />
            PC에서 Contap을 접속해 보세요
          </Text>
          <ResizeSvg />
        </ContentWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrap>
      <div className="SquareShadow">
        <SquareShadow />
      </div>
      <div className="SquareLeft">
        <SquareLeft />
      </div>
      <div className="SquareRight">
        <SquareRight />
      </div>
      <TitleWrap />
      <div className="title">
        <Text bold48> Just Tap!</Text>
        <Text regular20> Contap에서는 함께 성장할 수 있어요</Text>
      </div>
      <SearchBarWrap>
        <SearchBar />
      </SearchBarWrap>
      <TextWrap>
        <div>
          <Text bold32> 동료를 찾고 있나요?</Text>
          <Text bold32> Tap! 해보세요</Text>
        </div>
      </TextWrap>
      <RefreshWrapper>
        <RefreshSvg />
        <button
          type="button"
          onClick={() => {
            dispatch(loadCardFrontDB());
          }}
        >
          카드 섞기
        </button>
      </RefreshWrapper>
      <CardListWrap>
        {cardList.allIds.map((userId) => {
          console.log('카드 프론트 뿌려줌 =======>', userId);
          return <MemoizedCardFront key={userId} userId={userId} />;
        })}
      </CardListWrap>
      {cardList.allIds.length > 9 && (
        <IconButton className="floatingBtn" onClick={scrollTop}>
          <ArrowTopLightSvg />
        </IconButton>
      )}
    </Wrap>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 9999;
  background-color: ${ColorStyle.BackGround};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: absolute;
  top: 0px;
`;

const ContentWrapper = styled.div`
  width: 360px;
  height: 564px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

// =========size check 스타일링

const upDown = keyframes`
  0% {
    top: 45px;
  }
  25% {
    top: 35px;
  }
  50% {
    top: 20px;
    /* right : 600px; */
  }
  75% {
    top: 35px;
    /* right : 600px; */
  }
  100% {
    top: 45px;
    
  }
`;

const downUp = keyframes`
 0% {
    top: 245px;
  }
  25% {
    top: 255px;
  }
  50% {
    top: 270px;
    /* right : 600px; */
  }
  75% {
    top: 255px;
    /* right : 600px; */
  }
  100% {
    top: 245px;
    
  }
`;

const Wrap = styled.div`
  width: 100%;
  padding-top: 76px;
  padding-bottom: 112px;
  position: relative;

  .SquareLeft {
    position: absolute;
    top: 80px;
    left: 130px;
    z-index: 1;
    animation: ${upDown} 5s infinite linear alternate;
  }
  .SquareShadow {
    position: absolute;
    top: 268px;
    left: 130px;
    z-index: 1;
    animation: ${downUp} 5s infinite linear alternate;
  }
  .SquareRight {
    position: absolute;
    top: 32px;
    right: 130px;
    z-index: 1;
    animation: ${upDown} 7s infinite linear alternate;
  }
  .title {
    position: relative;
    top: -100px;
    text-align: center;
    p {
      margin-bottom: 24px;
    }
  }

  .floatingBtn {
    width: 64px;
    height: 64px;
    background-color: ${ColorStyle.Gray100 + Opacity[25]};
    position: sticky;
    bottom: 80px;
    margin-left: 1300px;
    &:hover {
      background-color: ${ColorStyle.Gray500 + Opacity[25]};
    }
  }
`;

const mainBack = keyframes`
 0% {
  background-position:0% 50%;
  filter: blur(140px);
  }
  25% {
    background-position:25% 75%;
  filter: blur(120px);
  }
  50% {
    background-position:100% 50%;
  filter: blur(100px);
    /* right : 600px; */
  }
  75% {
    background-position:25% 75%;
  filter: blur(120px);
    /* right : 600px; */
  }
  100% {
    background-position:0% 50%;
  filter: blur(140px);
    
  }
`;

const TitleWrap = styled.div`
  position: relative;
  text-align: center;

  background: conic-gradient(
    from 88.92deg at 47.81% 59.2%,
    #db83e9 -16.52deg,
    #844aef 62.85deg,
    #1fb8cd 95.04deg,
    #1edbd7 115.28deg,
    #4ceeb6 132.84deg,
    #db83e9 343.48deg,
    #844aef 422.85deg
  );
  background-size: 200%;
  filter: blur(140px);
  height: 100px;
  animation: ${mainBack} 17s infinite linear alternate;
`;

const SearchBarWrap = styled.div`
  text-align: center;
  margin: -70px 0px 90px 0px;
`;

const TextWrap = styled.div`
  div {
    text-align: center;
    p {
      margin: 8px 0px;
    }
  }
`;

const RefreshWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-right: 165px;
  margin-top: 28px;
  margin-bottom: 18px;

  button {
    cursor: pointer;
    background-color: #0f0a1a;
    color: #a09bac;
    font-family: ${FontFamily};
    font-size: 20px;
    border: none;
  }
`;

// const FlexWrapper = styled.div`
//   display: flex;
// `;

const CardListWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 1140px;
  justify-items: center;
  margin: auto;
`;
export default CardList;

// const Div = styled.div`
//   display: grid;
//   grid-gap: 64px;
//   grid-template-columns: repeat(3, minmax(auto, 1fr));
//   align-items: center;
//   // 최대넓이 설정
//   max-width: 1110px;
//   justify-content: space-around;
//   // 양 옆 여백 간격 통일 - 가운데 정렬
//   margin: auto;
// `;