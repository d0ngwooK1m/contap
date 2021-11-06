/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { setPreview, editCardProfileDB } from '../features/cards/actions';

import { Grid, Text, Input, Image } from '../elements';

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

  const fileInput = React.useRef();

  const [fileData, setFileData] = React.useState(null);
  console.log(fileData);

  // 파일 미리보기 (오류 해결 코드)
  const filePreview = (e) => {
    const reader = new FileReader();
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
      setFileData(e.target.files[0]);
    }
  };

  // 기존 파일 미리보기
  // const filePreview = (e) => {
  //   const reader = new FileReader();
  //   const file = fileInput.current.files[0];
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     //  console.log(reader.result);
  //     dispatch(setPreview(reader.result));
  //   };
  //   setFileData(e.target.files[0]);
  //   // e.target.value = '';
  // };

  const fileUploadHandler = () => {
    const file = fileInput.current.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('hashTagsStr', 'spring');
    formData.append('field', category);
    if (fileData) {
      formData.append('profile', fileData);
    }
    console.log('formData', formData);

    dispatch(editCardProfileDB(formData));
  };

  return (
    <Grid
      height="590px"
      borderRadius="16px"
      border="1px solid #dcdcdc"
      bgcolor="background.paper"
      margin="25px auto"
    >
      <Grid is_flex width="1110px" margin="75px auto">
        <Text>
          {userInfo.userName}님을 나타낼 수 있는 프로필을 만들어보세요
        </Text>
        <AddBtn onClick={fileUploadHandler}>작성완료</AddBtn>
      </Grid>
      <Div>
        <Grid margin="78px 0px 165px 0px" width="125px">
          <label htmlFor="fileUpload">
            <Img src={preview ? preview : userInfo.profile} />
          </label>
          <input
            type="file"
            ref={fileInput}
            id="fileUpload"
            onChange={filePreview}
          />
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
          <p>직무</p>
          <label htmlFor="category">
            <input
              type="radio"
              id="categoryId"
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
              id="categoryId"
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
              id="categoryId"
              name="2"
              value="2"
              checked={category === '2'}
              onChange={handleRadioChange}
            />
            디자인
          </label>
        </Category>
      </Div>
      <Grid is_flex width="1110px" margin="20px auto">
        <Text>스택/툴</Text>
        <Text>관심사</Text>
      </Grid>
    </Grid>
  );
};

export default CardFrontWrite;

const Div = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 1110px;
  height: 150px;
  margin: 0px auto;
`;

const Img = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0px;
  width: 182px;
  height: 164px;
  border-radius: 16px;
`;

const TextDiv = styled.div`
  position: absolute;
  top: 30vh;
  left: 43vw;
`;

const Category = styled.div`
  position: absolute;
  top: 37vh;
  left: 43vw;
`;

const AddBtn = styled.button`
  width: 80px;
  // position: absolute;
  // top: 16vh;
  // left: 70vw;
`;

// const Btn = styled.button`
//   width: 80px;
//   position: absolute;
//   top: 16vh;
//   left: 58vw;
// `;
