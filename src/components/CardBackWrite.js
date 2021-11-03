import React from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { createCardDB } from '../features/cards/actions';

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

  const addCardBack = () => {
    dispatch(createCardDB(content));
  };

  return (
    <Grid
      width="960px"
      height="510px"
      borderRadius="16px"
      border="1px solid #dcdcdc"
      bgcolor="background.paper"
      margin="auto"
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
