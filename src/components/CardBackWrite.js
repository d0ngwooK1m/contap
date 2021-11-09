import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { createCardDB, isSuccess } from '../features/cards/actions';

import { Grid, Input } from '../elements';

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
      height="490px"
      borderRadius="16px"
      border="1px solid #dcdcdc"
      bgcolor="background.paper"
      margin="40px auto"
    >
      <Input
        place="프로젝트 제목"
        _onChange={(e) => {
          setTitle(e.target.value);
          // console.log(e.target.value);
        }}
      />
      <Input
        place="프로젝트 설명"
        textarea
        _onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
      <Input
        place="사용 기술"
        _onChange={(e) => {
          setTagsStr(e.target.value);
        }}
      />
      <Input
        place="링크"
        _onChange={(e) => {
          setLink(e.target.value);
        }}
      />
      <Btn onClick={addCardBack}>작성완료</Btn>
    </Grid>
  );
};

export default CardBackWrite;

const Btn = styled.button`
  width: 80px;
  // position: fixed;
  // top: 16vh;
  // left: 47vw;
`;
