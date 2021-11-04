/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { setPreview, editCardProfileDB } from '../features/cards/actions';

import { Grid, Button, Text, Input, Image } from '../elements';

const CardFrontWrite = () => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.cards.preview);
  // const front = useSelector((state) => state.cards.byId);
  // console.log(front);
  const userInfo = useSelector((state) => state.cards.current);
  console.log(userInfo);
  const [userName, setUserName] = React.useState(userInfo.userName);
  const [category, setCategory] = React.useState('0');

  const handleRadioChange = (e) => {
    setCategory(e.target.value);
  };

  // React.useEffect(() => {
  //   dispatch(setPreview(userInfo.profile));
  // }, []);

  // const nickNameCheck = () => {};

  // const hashTagIds = [
  //   {
  //     hashTagIds: 1,
  //   },
  // ];

  // 파일 미리보기 (오류 해결 코드)
  // const filePreview = () => {
  //   const reader = new FileReader();
  //   const file = fileInput.current.files[0];
  //   console.log(file);
  //   if (file === undefined) {
  //     dispatch(setPreview(null));
  //   } else {
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       //  console.log(reader.result);
  //       dispatch(setPreview(reader.result));
  //     };
  //   }
  // };
  const fileInput = React.useRef();

  const [fileData, setFileData] = React.useState(null);
  console.log(fileData);

  const filePreview = (e) => {
    const reader = new FileReader();

    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      //  console.log(reader.result);
      dispatch(setPreview(reader.result));
    };

    setFileData(e.target.files[0]);
    // e.target.value = '';
  };

  const fileUploadHandler = () => {
    const file = fileInput.current.files[0];
    console.log(file);
    const formData = new FormData();
    // if (file === undefined) {
    //   formData.append('profile', userInfo.profile);
    // } else {
    //   formData.append('profile', file);
    // }
    formData.append('userName', userName);
    //formData.append('hashTagIds', hashTagIds);
    formData.append('hashTagsStr', '@spring@');
    formData.append('field', category);
    if (fileData) {
      formData.append('profile', fileData);
    }

    console.log('formData', formData);

    dispatch(editCardProfileDB(formData));
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
          {/* <input type="file" file={newFile} id="fileUpload" onChange={handle} /> */}
        </Grid>
        <TextDiv>
          <Input
            // place={userInfo.userName}
            value={userName}
            is_submit
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </TextDiv>
        <Category>
          <label htmlFor="category">
            <input
              type="radio"
              id="0"
              name="0"
              value="0"
              checked={category === '0'}
              onChange={handleRadioChange}
            />
            백엔드
          </label>
          <label htmlFor="category">
            <input
              type="radio"
              id="1"
              name="1"
              value="1"
              checked={category === '1'}
              onChange={handleRadioChange}
            />
            프론트엔드
          </label>
          <label htmlFor="category">
            <input
              type="radio"
              id="2"
              name="2"
              value="2"
              checked={category === '2'}
              onChange={handleRadioChange}
            />
            디자인
          </label>
        </Category>
      </Div>
      <AddBtn onClick={fileUploadHandler}>작성완료</AddBtn>
      {/* <Btn onClick={nickNameCheck}>중복체크</Btn> */}
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

const Category = styled.div`
  position: absolute;
  top: 23vh;
  left: 43vw;
`;

const AddBtn = styled.button`
  width: 80px;
  position: absolute;
  top: 16vh;
  left: 70vw;
`;

// const Btn = styled.button`
//   width: 80px;
//   position: absolute;
//   top: 16vh;
//   left: 58vw;
// `;
