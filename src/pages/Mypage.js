import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import {
  loadMyCardDB,
  //  isSuccess
} from '../features/cards/actions';
// import { history } from '../features/configureStore';

import CardProfile from '../components/CardProfile';
import CardAdd from '../components/CardAdd';
import CardBackWrite from '../components/CardBackWrite';

import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';
import { Grid } from '../elements';

const Mypage = () => {
  const dispatch = useDispatch();
  const cardCount = useSelector((state) => state.cards.allIds);

  // const handleClick = useSelector((state) => state.cards.isSuccess);
  // console.log(handleClick);

  const [click, setClick] = React.useState(false);

  const closeClick = () => {
    setClick(false);
  };

  React.useEffect(() => {
    dispatch(loadMyCardDB());
  }, []);

  if (click) {
    return (
      <div style={{ paddingTop: '88px' }}>
        <Grid>
          <CardProfile />
        </Grid>
        <Grid width="100%" height="100%" bg="#0F0a1A">
          <Div>
            <TitleText>
              나의 프로젝트 <Count>{cardCount.length}</Count>
            </TitleText>
            <TextBtn
              onClick={() => {
                // dispatch(isSuccess(!handleClick));
                setClick(true);
              }}
            >
              + 프로젝트 추가하기
            </TextBtn>
          </Div>
          <Grid>
            <CardBackWrite onHide={closeClick} />
          </Grid>
          <Grid>
            <CardAdd />
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '88px' }}>
      <Grid>
        <CardProfile />
      </Grid>
      <Grid width="100%" height="100%" bg="#0F0a1A">
        <Div>
          <TitleText>
            나의 프로젝트 <Count>{cardCount.length}</Count>
          </TitleText>
          <TextBtn
            onClick={() => {
              // dispatch(isSuccess(!handleClick));
              setClick(true);
            }}
          >
            + 프로젝트 추가하기
          </TextBtn>
        </Div>
        <Grid>
          <CardAdd />
        </Grid>
      </Grid>
    </div>
  );
};

export default Mypage;

const Div = styled.div`
  width: 1110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
`;

const TitleText = styled.p`
  font-size: ${FontScale.Header_24};
  font-family: ${FontFamily};
  margin: 80px 0px 52px 0px;
  color: ${ColorStyle.Gray500};
  font-weight: 700;
`;

const Count = styled.span`
  font-size: ${FontScale.Header_24};
  font-family: ${FontFamily};
  // margin: 160px 0px 64px 0px;
  color: ${ColorStyle.PrimaryPurple};
  font-weight: 700;
`;

const TextBtn = styled.div`
  width: 15%;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  cursor: pointer;
  margin: 80px 0px 52px 0px;
  font-weight: 700;
  z-index: 3;
  // position: fixed;
  // top: 16vh;
  // left: 47vw;
`;
