/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { setPreview, createCardDB } from '../features/cards/actions';

import { Grid, Button, Text, Input, Image } from '../elements';

const CardFrontWrite = () => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.cards.preview);
  // const front = useSelector((state) => state.cards.byId);
  // console.log(front);
  const userInfo = useSelector((state) => state.cards.current);
  console.log(userInfo);
  console.log(userInfo.userName);

  const hashTagIds = [
    {
<<<<<<< HEAD
      id: 1,
      name: '지오캐싱',
      type: 1,
    }

  ]

 
  const fileInput = React.useRef('');
  console.log(fileInput);
  const [newFile, setNewFile] = React.useState('')

  console.log(newFile)

  const handle = (e) => {
    setNewFile(e.target.file)
  }
=======
      hashTagIds: 1,
    },
  ];
>>>>>>> master


  // 파일 미리보기
  const filePreview = () => {
    const reader = new FileReader();
<<<<<<< HEAD
    const file = fileInput.current.files[0]
    file ? reader.readAsDataURL(file) : null;
    reader.onloadend = () => {
      //  console.log(reader.result);
      dispatch(setPreview(reader.result));
    };
=======
    const file = fileInput.current.files[0];
    console.log(file);
    if (file === undefined) {
      dispatch(setPreview(null));
    } else {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        //  console.log(reader.result);
        dispatch(setPreview(reader.result));
      };
    }
>>>>>>> master
  };

  const fileUploadHandler = () => {
    const file = fileInput.current.files[0] ? fileInput.current.files[0] : null;
    // console.log('file', file);
    const formData = new FormData();
    file ? formData.append('profile', file) : null;
    formData.append('userName', '이아롱');
<<<<<<< HEAD
    formData.append('hashTags', JSON.stringify(hashTags));
=======
    formData.append('hashTagIds', hashTagIds);
    formData.append('hashTagsStr', '@spring@');
>>>>>>> master

    console.log('formData', formData);

    for (var key of formData.keys()) {

      console.log(key);
    
    }
    
    for (var value of formData.values()) {
    
      console.log(value);
    
    }

    // const token = localStorage.getItem("token");
    // console.log(token);
    dispatch(createCardDB(formData));
  };

  return (
    <Grid
      width="966px"
      height="230px"
      borderRadius="16px"
      border="1px solid #dcdcdc"
      bgcolor="background.paper"
      margin="25px auto"
    >
      <Div>
        <Grid margin="20px" width="125px">
          <label htmlFor="fileUpload">
            <Img src={preview ? preview : userInfo.profile} />
          </label>
          <input
            type="file"
            ref={fileInput}
            id="fileUpload"
            onChange={filePreview}
          />
          <input
            type="file"
            file={newFile}
            id="fileUpload"
            onChange={handle}
          />
        </Grid>
        <TextDiv>
          <Input value={userInfo.userName} is_submit />
        </TextDiv>
      </Div>
      <Btn onClick={fileUploadHandler}>작성완료</Btn>
    </Grid>
  );
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
  width: 256px;
  height: 180px;
`;

const TextDiv = styled.div`
  position: absolute;
  top: 15vh;
  left: 43vw;
`;

const Btn = styled.button`
  width: 80px;
  position: absolute;
  top: 16vh;
  left: 70vw;
`;
