import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { createCardDB, isSuccess } from '../features/cards/actions';

import { ReactComponent as AddBtn } from '../svgs/AddBtn.svg';
import { ReactComponent as Flag } from '../svgs/Flag.svg';
import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';
import { Grid } from '../elements';

const CardBackWrite = () => {
  const dispatch = useDispatch();

  // 입력 값 저장
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [tagsStr, setTagsStr] = React.useState('');
  const [link, setLink] = React.useState('');

  const content = {
    title,
    content: desc,
    tagsStr,
    link,
  };

  // const [click, setClick] = React.useState(propsClick.false);

  const handleClick = useSelector((state) => state.cards.isSuccess);
  console.log(handleClick);
  const addCardBack = () => {
    dispatch(createCardDB(content));

    dispatch(isSuccess(!handleClick));
  };

  return (
    <Grid
      width="1110px"
      height="537px"
      borderRadius="16px"
      border="1px solid #8c4dff"
      margin="40px auto"
      padding="60px 48px 0px 48px"
      bg="#1d1d22"
    >
      <Div>
        <TitleBox
          type="text"
          placeholder="프로젝트 제목"
          onChange={(e) => {
            setTitle(e.target.value);
            // console.log(e.target.value);
          }}
        />
        <Grid width="10%">
          <AddBtn cursor="pointer" onClick={addCardBack} />
        </Grid>
      </Div>
      <Grid>
        <MainBox
          placeholder="프로젝트 설명"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <TagBox
          placeholder="사용 기술"
          onChange={(e) => {
            setTagsStr(e.target.value);
          }}
        />
        <span style={{ position: 'absolute', top: '127%', left: '24%' }}>
          <Flag />
        </span>
        <LinkBox
          placeholder="링크"
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        {/* <Btn onClick={addCardBack}>작성완료</Btn> */}
      </Grid>
    </Grid>
  );
};

export default CardBackWrite;

// const Btn = styled.button`
//   width: 80px;
//   // position: fixed;
//   // top: 16vh;
//   // left: 47vw;
// `;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 1007px 
  margin: 0px auto;
`;

const TitleBox = styled.input`
  width: 587px;
  height: 41px;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 700;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround300};
  border-bottom: 1px solid ${ColorStyle.Gray300};
  border-right: none;
  &:focus {
    outline: none;
  }
  margin-bottom: 40px;
`;

const MainBox = styled.textarea`
  width: 960px;
  height: 100px;
  padding: 24px;
  background-color: ${ColorStyle.Gray300};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  border: none;
  border-radius: 12px;
  &:focus {
    outline: none;
`;

const TagBox = styled.input`
  margin-bottom: 24px;
  padding-left: 60px;
  margin-top: 56px;
  background-color: ${ColorStyle.Gray300};
  width: 947px;
  height: 50px;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  border: none;
  border-radius: 12px;
  &:focus {
    outline: none;
  }
`;

const LinkBox = styled.input`
  width: 1007px;
  height: 50px;
  background-color: ${ColorStyle.Gray300};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.PrimaryPurple};
  border: none;
  border-radius: 12px;
  &:focus {
    outline: none;
  }
`;
