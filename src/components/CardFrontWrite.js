/*eslint-disable*/
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { setPreview, createCardDB } from '../features/cards/actions';

import SettingsIcon from '@mui/icons-material/Settings';
import { Grid, Button, Text, Input, Image } from '../elements';

const CardFrontWrite = (id) => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.cards.preview);
  // const front = useSelector((state) => state.cards.byId);
  // console.log(front);

  const hashTags = [
    {
      hashTagId: 1,
      name: '지오캐싱',
      type: 1,
    },
  ];

  const fileInput = React.useRef();
  // console.log(fileInput);

  // 파일 미리보기
  const filePreview = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      //  console.log(reader.result);
      dispatch(setPreview(reader.result));
    };
  };

  const fileUploadHandler = () => {
    const file = fileInput.current.files[0];
    // console.log('file', file);
    const formData = new FormData();
    formData.append('profile', file);
    formData.append('userName', '이아롱');
    formData.append('hashTags', hashTags);

    console.log('formData', formData);

    // const token = localStorage.getItem("token");
    // console.log(token);
    dispatch(createCardDB(formData));
  };

  // const edit = false;
  // if (edit) {
  return (
    <Grid
      width="960px"
      height="250px"
      borderRadius="16px"
      border="1px solid #dcdcdc"
      bgcolor="background.paper"
      margin="25px auto"
    >
      <Div>
        <Grid width="150px" margin="20px">
          <label htmlFor="fileUpload">
            <Img
              src={preview ? preview : 'http://via.placeholder.com/400x300'}
            />
          </label>
          <input
            type="file"
            ref={fileInput}
            id="fileUpload"
            onChange={filePreview}
          />
        </Grid>
        <TextDiv>
          <Text>이아롱</Text>
        </TextDiv>
      </Div>
      <IconDiv>
        <SettingsIcon fontSize="small" cursor="pointer" />
      </IconDiv>
      <Btn onClick={fileUploadHandler}>설정완료</Btn>
    </Grid>
  );
  // }
  // return (
  //   <Grid
  //     width="960px"
  //     height="250px"
  //     borderRadius="16px"
  //     border="1px solid #dcdcdc"
  //     bgcolor="background.paper"
  //     margin="25px auto"
  //   >
  //     <Div>
  //       <Grid width="150px" margin="20px">
  //         <Img src={'http://via.placeholder.com/400x300'} />
  //       </Grid>
  //       <TextDiv>
  //         <Text>이아롱</Text>
  //       </TextDiv>
  //     </Div>
  //     <IconDiv
  //       onclick={() => {
  //         edit = true;
  //       }}
  //       cursor="pointer"
  //     >
  //       <SettingsIcon fontSize="small" />
  //     </IconDiv>
  //     <Btn onClick={fileUploadHandler}>설정완료</Btn>
  //   </Grid>
  // );
};

export default CardFrontWrite;

const Div = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Img = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0px;
  width: 200px;
`;

const TextDiv = styled.div`
  position: absolute;
  top: 15vh;
  left: 35vw;
`;

const IconDiv = styled.div`
  position: absolute;
  top: 16vh;
  left: 39vw;
`;

const Btn = styled.button`
  width: 80px;
  position: absolute;
  top: 16vh;
  left: 41vw;
`;
