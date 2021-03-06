/* eslint-disable */
import React from 'react';
// import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { ColorStyle, FontFamily, Opacity } from '../utils/systemDesign';
import { IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled, { keyframes } from 'styled-components';
import {
  loadCardFrontDB,
  loadCurrentCardDB,
  loading,
} from '../features/cards/actions';
import { MemoizedCardFront } from '../components/CardFront';
import SearchBar from '../components/SearchBar';
import { Text } from '../elements';
import { ReactComponent as TitleBgSvg } from '../svgs/TitleBG.svg';
// import { ReactComponent as SquareShadow } from '../svgs/Reflex.svg';
import Reflex from '../svgs/Reflex.png';
import { ReactComponent as SquareLeft } from '../svgs/ShapeLeft.svg';
// import { ReactComponent as SquareRight } from '../svgs/ShapeRight.svg';
import SquareRight from '../svgs/ShapeRight.png';
import { ReactComponent as RefreshSvg } from '../svgs/Refresh.svg';
import { ReactComponent as ArrowTopLightSvg } from '../svgs/ArrowTopLight.svg';
import { getToken } from '../utils/auth';
import { LoginAlert } from '../utils/alert';
import LoginAlertPng from '../assets/image/LoginAlertPng.png';
import Close from '../svgs/Close.svg';
import searchFailMain from '../assets/image/searchFailMain.png';
import MetaTag from '../components/MetaTag';

const CardList = () => {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.cards);
  const isSearching = useSelector((state) => state.cards.isSearching);
  const isLoading = useSelector((state) => state.cards.isLoading);
  const selectCategory = useSelector((state) => state.cards.selectCategory);
  const token = getToken();
  const params = useParams();
  // const isAuthorized = useSelector((state) => state.user.isAuthorized);

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
              <img src={LoginAlertPng} width="249px" height="171px" />
              <div style={{ marginTop: '32px', marginBottom: '16px' }}>
                <Text bold24>???????????????????</Text>
              </div>
              <Text regular16>???????????? ?????? ????????????</Text>
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
        dispatch(loading(true));
        await dispatch(loadCurrentCardDB(parseInt(params.userId)));
      }
    }
  }, []);
  React.useEffect(() => {
    if (cardList.allIds.length !== 0) {
      return;
    }

    if (!isSearching) {
      dispatch(loadCardFrontDB());
    }
  }, [isSearching]);

  const clearCategory = async () => {
    await dispatch(loadCardFrontDB());
  };

  return (
    <Wrap>
      <BackGroundTop />
      <BackGroundLow />
      <BackGroundCover />
      <div className="title">
        <Text bold48> Just Tap!</Text>
        <Text regular20> Contap????????? ?????? ????????? ??? ?????????</Text>
      </div>
      <SearchBarWrap>
        <div className="SquareShadow">
          <img src={Reflex} width="168px" height="169px" />
        </div>
        <div className="SquareLeft">
          <SquareLeft />
        </div>
        <div className="SquareRight">
          <img src={SquareRight} width="168px" height="169px" />
        </div>
        <SearchBar />
      </SearchBarWrap>
      <TextWrap>
        <div>
          <Text bold32> ????????? ?????? ??????????</Text>
          <Text bold32> Tap! ????????????</Text>
        </div>
      </TextWrap>
      <div
        style={{
          width: '1140px',
          margin: 'auto',
          marginTop: '34px',
        }}
      >
        <div>
          <RefreshWrapper selectCategory={selectCategory}>
            {selectCategory !== '' && (
              <div className="selectCategory">
                <button type="button" onClick={clearCategory}>
                  <div style={{ display: 'flex' }}>
                    <Text regular16>{selectCategory} &nbsp;</Text>
                    <img src={Close} width="17px" height="17px" />
                  </div>
                </button>
              </div>
            )}
          </RefreshWrapper>
          {/* <div className='refreshBtn' >
            <RefreshSvg />
            <button
              type="button"
              onClick={() => {
                dispatch(loadCardFrontDB());
              }}
            >
              ?????? ??????
            </button>
          </div> */}
        </div>
        <CardListWrap>
          {selectCategory !== '' && cardList.allIds.length === 0 && (
            <CardForm>
              <img src={searchFailMain} width="74px" height="74px" />
              <Text regular16>
                ????????? ????????? ????????? ???? <br />
                ?????? ???????????? ???????????? ????????? ?????????!
              </Text>
            </CardForm>
          )}

          {cardList.allIds.map((userId) => {
            return <MemoizedCardFront key={userId} userId={userId} />;
          })}
        </CardListWrap>
      </div>

      <IconButton
        className="floatingBtn"
        onClick={() => {
          window.open('https://forms.gle/UjFii44xz7J62rNLA');
        }}
      >
        <Text bold32>????</Text>
      </IconButton>
    </Wrap>
  );
};

// =========size check ????????????

const Wrap = styled.div`
  width: 100%;
  padding-top: 76px;
  padding-bottom: 112px;
  /* position: relative; */

  .title {
    position: relative;
    top: -100px;
    margin-top: 78px;
    text-align: center;
    p {
      margin-bottom: 24px;
    }
  }

  .floatingBtn {
    width: 64px;
    height: 64px;
    background-color: ${ColorStyle.Gray300 + Opacity[25]};
    position: fixed;
    bottom: 60px;
    margin-left: 1300px;
    z-index: 9999999;
    &:hover {
      background-color: ${ColorStyle.Gray500 + Opacity[25]};
    }
  }

  .refreshBtn{
    position: relative;
  margin-bottom: 18px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: right;
  button {
    background-color: #0f0a1a;
    cursor: pointer;
    color: #a09bac;
    font-family: ${FontFamily};
    font-size: 20px;
    border: none;
    z-index: 9999999;
  }
  }
`;

const mainBackTop = keyframes`
 0% {
  background-position:0% 50%;
  }
  25% {
    background-position:25% 75%;
  }
  50% {
    background-position:100% 50%;
    /* right : 600px; */
  }
  75% {
    background-position:25% 75%;
    /* right : 600px; */
  }
  100% {
    background-position:0% 50%;
    
  }
`;

const mainBackLow = keyframes`
  0% {
  background-position:0% 50%;
  }
  25% {
    background-position:25% 75%;
  }
  50% {
    background-position:100% 50%;
    /* right : 600px; */
  }
  75% {
    background-position:25% 75%;
    /* right : 600px; */
  }
  100% {
    background-position:0% 50%;
    
  }
`;

const BackGroundTop = styled.div`
  position: absolute;
  width: 1260.73px;
  height: 310.66px;
  left: 320.88px;
  top: -242.96px;

  background: conic-gradient(
    from 88.92deg at 47.81% 59.2%,
    #db83e9 -7.16deg,
    #b64aef 62.85deg,
    #1fb8cd 95.04deg,
    #1edbd7 115.28deg,
    #4ceeb6 139.09deg,
    #9bb3d2 257.22deg,
    #db83e9 352.84deg,
    #b64aef 422.85deg
  );
  opacity: 0.7;
  background-size: 200%;
  /* opacity: 0.6; */
  filter: blur(80px);
  transform: matrix(0.98, 0.19, -0.19, 0.98, 0, 0);
  animation: ${mainBackTop} 17s infinite linear alternate;
`;

const BackGroundLow = styled.div`
  position: absolute;
  top: 258px;
  left: 0px;
  width: 50%;
  height: 35px;
  background: conic-gradient(
    from 88.92deg at 47.81% 59.2%,
    #4ceeb6 -7.19deg,
    #db83e9 88.69deg,
    #b64aef 122.16deg,
    #1fb8cd 258.1deg,
    #9bb3d2 294.72deg,
    #1edbd7 352.77deg,
    #4ceeb6 352.81deg,
    #db83e9 448.69deg
  );
  background-size: 200%;
  /* opacity: 0.8; */
  filter: blur(90px);
  transform: matrix(-1, 0, 0, -1, 0, 0);
  animation: ${mainBackLow} 20s infinite linear alternate-reverse;
`;

const BackGroundCover = styled.div`
  position: absolute;
  /* top: -88px; */
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100vw;
  max-width: 1920px;
  height: 410px;
  /* background-color: papayawhip; */
  background: rgba(15, 10, 26, 0.4);
`;

const upDownRight = keyframes`
  0% {
    top: -175px;
  }
  25% {
    top: -185px;
  }
  50% {
    top: -200px;
    /* right : 600px; */
  }
  75% {
    top: -185px;
    /* right : 600px; */
  }
  100% {
    top: -175px;
    
  }
`;

const upDownLeft = keyframes`
  0% {
    top: -28px;
  }
  25% {
    top: -38px;
  }
  50% {
    top: -52px;
    /* right : 600px; */
  }
  75% {
    top: -38px;
    /* right : 600px; */
  }
  100% {
    top: -28px;
    
  }
`;

const downUp = keyframes`
 0% {
    top: 108px;
  }
  25% {
    top: 118px;
  }
  50% {
    top: 133px;
    /* right : 600px; */
  }
  75% {
    top: 118px;
    /* right : 600px; */
  }
  100% {
    top: 108px;
    
  }
`;

const SearchBarWrap = styled.div`
  position: relative;
  text-align: center;
  margin: -70px 0px 90px 0px;
  .SquareLeft {
    position: absolute;
    top: -28px;
    left: 130px;
    z-index: 1;
    animation: ${upDownLeft} 4s infinite linear alternate;
  }
  .SquareShadow {
    position: absolute;
    top: 108px;
    left: 130px;
    z-index: 1;
    animation: ${downUp} 4s infinite linear alternate;
  }
  .SquareRight {
    position: absolute;
    top: -185px;
    right: 140px;
    z-index: 1;
    animation: ${upDownRight} 4s infinite linear alternate;
  }
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
  position: relative;
  margin-bottom: 18px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  .selectCategory {
    z-index: 1;

    /* position: relative;
    bottom: -48px; */
    padding-left: 15px;
    button {
      width: max-content;
      padding: 6px 12px;
      text-align: center;
      border-radius: 8px;
      P {
        padding-top: 3px;
      }
      img {
        padding-top: 4px;
      }
      background-color: ${({ selectCategory }) =>
        selectCategory === '????????? ?????????' ||
        selectCategory === '??????????????? ?????????' ||
        selectCategory === '????????????'
          ? ColorStyle.PrimaryPurple
          : ColorStyle.BackGround300};
      &:hover {
        background-color: ${({ selectCategory }) =>
          selectCategory === '????????? ?????????' ||
          selectCategory === '??????????????? ?????????' ||
          selectCategory === '????????????'
            ? ColorStyle.HoverPurple
            : ColorStyle.Gray300 + Opacity[25]};
      }
    }
  }

  button {
    background-color: #0f0a1a;
    cursor: pointer;
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
  min-height: 232px;
`;

const CardForm = styled.div`
  margin-left: 400px;
  text-align: center;
  padding: 32px 52px;
  position: relative;
  width: 350px;
  height: 200px;
  border-radius: 16px;
  box-sizing: border-box;
  margin-bottom: 32px;
  border: 1px solid ${ColorStyle.Gray100 + Opacity[50]};
  background-color: ${ColorStyle.BackGround100};
  p {
    margin-top: 20px;
  }
`;

export default CardList;

// const Div = styled.div`
//   display: grid;
//   grid-gap: 64px;
//   grid-template-columns: repeat(3, minmax(auto, 1fr));
//   align-items: center;
//   // ???????????? ??????
//   max-width: 1110px;
//   justify-content: space-around;
//   // ??? ??? ?????? ?????? ?????? - ????????? ??????
//   margin: auto;
// `;
