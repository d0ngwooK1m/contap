/* eslint-disable */
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ColorStyle, FontFamily, Opacity } from '../utils/systemDesign';
import { IconButton } from '@mui/material';

import styled , {keyframes} from 'styled-components';
import { loadCardFrontDB } from '../features/cards/actions';
import { MemoizedCardFront } from '../components/CardFront';
import SearchBar from '../components/SearchBar';
import { Text } from '../elements';
import { ReactComponent as TitleBgSvg } from '../svgs/TitleBG.svg';
import { ReactComponent as SquareShadow } from '../svgs/Reflex.svg';
import { ReactComponent as SquareLeft } from '../svgs/ShapeLeft.svg';
import { ReactComponent as SquareRight } from '../svgs/ShapeRight.svg';
import { ReactComponent as RefreshSvg } from '../svgs/Refresh.svg';
import { ReactComponent as ArrowTopLightSvg } from '../svgs/ArrowTopLight.svg'

const CardList = () => {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.cards);
  const isSearching = useSelector((state) => state.cards.isSearching);
  // const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  React.useEffect(async () => {
    if (cardList.allIds.length !== 0) {
      return;
    }
    if (!isSearching) {
      dispatch(loadCardFrontDB());
    }
  }, [isSearching]);

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
        <Text regular20> 내가 찾던 동료를 Tap! 해서 만나보세요</Text>
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
          return <MemoizedCardFront key={userId} userId={userId} />;
        })}
      </CardListWrap>
      <IconButton className='floatingBtn' onClick={scrollTop} >
        <ArrowTopLightSvg/>
      </IconButton>
    </Wrap>
  );
};

const upDown = keyframes`
  0% {
    top: 60px;
  }
  25% {
    top: 40px;
  }
  50% {
    top: 20px;
    /* right : 600px; */
  }
  75% {
    top: 40px;
    /* right : 600px; */
  }
  100% {
    top: 60px;
    
  }
`;

const downUp = keyframes`
 0% {
    top: 240px;
  }
  25% {
    top: 260px;
  }
  50% {
    top: 280px;
    /* right : 600px; */
  }
  75% {
    top: 260px;
    /* right : 600px; */
  }
  100% {
    top: 240px;
    
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

  .floatingBtn{
    width: 64px;
    height: 64px;
    background-color: ${ColorStyle.Gray100+Opacity[25]};
    position: sticky;
    bottom: 80px;
    margin-left: 1300px;
    &:hover{
    background-color: ${ColorStyle.Gray500+Opacity[25]};
    }
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
  filter: blur(140px);
  height: 100px;
`;

const SearchBarWrap = styled.div`
  text-align: center;
  margin: -70px 0px 50px 0px;
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
  display: flex;
  width: 1140px;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
  padding-left: 30px;
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
