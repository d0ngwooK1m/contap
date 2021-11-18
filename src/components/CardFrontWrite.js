/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from 'react-redux';
import {
  setPreview,
  editCardProfileDB,
  deleteStack,
  deleteHobby,
  updateStack,
  updateHobby,
  loadMyCardDB,
} from '../features/cards/actions';
// import { history } from '../features/configureStore';

import { ReactComponent as AddBtn } from '../svgs/AddBtn.svg';
import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';
import { Grid, Text } from '../elements';

const CardFrontWrite = () => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.cards.preview);
  const front = useSelector((state) => state.cards.byId);
  console.log(front);
  const userInfo = useSelector((state) => state.cards.current);
  console.log('카테고리 확인===>', userInfo.field);
  console.log('유저정보 확인===>', userInfo);
  // const user = useSelector((state) => state.user);
  // console.log('유저 확인===>', user);

  const [userName, setUserName] = React.useState(
    () => JSON.parse(localStorage.getItem('nick')) || userInfo.userName,
  );
  const [category, setCategory] = React.useState(
    () => JSON.parse(localStorage.getItem('category')) || userInfo.field,
  );
  console.log('유저 닉네임 확인===>', userName);
  // console.log(stack, hobby);
  // console.log('해쉬태그 리퀘스트 값====>', stack + ',' + hobby);
  const stackTag = userInfo.hashTagsString
    ?.split('_')[0]
    ?.split('@')
    .slice(1, 2);
  console.log('앞면 태그확인====>', stackTag);
  
  const hobbyTag = userInfo.hashTagsString
    ?.split('_')[1]
    ?.split('@')
    .slice(1, 4);
  console.log('앞면 관심사 태그확인====>', hobbyTag);
  

  React.useEffect(() => {
    // if (stackTag?.length !== 0 && stackTag[0] !== '') {
    //   dispatch(updateStack(stackTag));
    // }
    // if (hobbyTag?.length !== 0 && hobbyTag[hobbyTag?.length - 1] !== '') {
    //   dispatch(updateHobby(hobbyTag));
    // }
    dispatch(updateStack(stackTag));
    dispatch(updateHobby(hobbyTag));
  }, [userInfo])

  // if (stackTag !== undefined) {
  //   dispatch(updateStack(stackTag[0]));
  // }
  // if (hobbyTag !== undefined) {
  //   dispatch(updateAllHobby(hobbyTag));
  // }

  const stack = useSelector((state) => state.cards.stack);
  const hobby = useSelector((state) => state.cards.hobby);
  console.log('태그값 확인====>', stack);
  console.log('관심사 태그값 확인====>', hobby);
  console.log('해쉬태그 리퀘스트 값====>', stack + ',' + hobby);

  // const handleRadioChange = (e) => {
  //   //e.target.checked;
  //   setCategory(e.target.value);
  //   console.log(e.target.value);
  // };

  const fileInput = React.useRef();

  const [fileData, setFileData] = React.useState(null);
  console.log(fileData);

  // 파일 미리보기 (오류 해결 코드)
  const filePreview = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    console.log(file);
    if (file === undefined) {
      dispatch(setPreview(reader.result));
      setFileData(file);
    } else {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        //  console.log(reader.result);
        dispatch(setPreview(reader.result));
        setFileData(file);
      };
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

  const addBtnClick = () => {
    // 닉네임 유효성검사
    if (userName === undefined || userName === '') {
      Swal.fire({
        icon: 'error',
        title: '작성 실패',
        text: '닉네임을 입력해주세요',
      });
      return false;
    }

    const file = fileInput.current.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('userName', userName);
    if (stack.length !== 0 && hobby.length !== 0) {
      formData.append('hashTagsStr', stack + ',' + hobby);
    } else if (stack.length === 0 && hobby.length !== 0) {
      formData.append('hashTagsStr', stackTag + ',' + hobby);
    } else if (stack.length !== 0 && hobby.length === 0) {
      formData.append('hashTagsStr', stack + ',' + hobbyTag);
    } else {
      formData.append('hashTagsStr', stackTag + ',' + hobbyTag);
    }

    formData.append('field', category);
    if (fileData) {
      formData.append('profile', fileData);
    }
    console.log('formData', formData);

    dispatch(editCardProfileDB(formData));
    localStorage.removeItem('nick');
    localStorage.removeItem('category');
  };
  console.log(category);

  // React.useEffect(() => {
  //   if (userInfo === '') {
  //     history.goBack();

  //     return;
  //   }
  // }, []);
  React.useEffect(() => {
    // e.preventDefault();
    dispatch(loadMyCardDB());
    localStorage.setItem('nick', JSON.stringify(userName));
    localStorage.setItem('category', JSON.stringify(category));
  }, []);

  return (
    <Grid
      height="590px"
      bg="#1d1d22"
      margin="0px auto"
      padding="72px 0px 0px 0px"
    >
      <Grid is_flex width="1110px" margin="0px auto 72px auto">
        <Text bold32 color="#f5f3f8">
          {userInfo.userName}님을 나타낼 수 있는 프로필을 만들어보세요
        </Text>
        <Grid width="10%">
          <AddBtn cursor="pointer" onClick={addBtnClick} />
        </Grid>
      </Grid>
      <Div>
        <Grid margin="190px 103px 165px 0px" width="182px">
          <label htmlFor="fileUpload">
            <Img src={preview || userInfo.profile} />
          </label>
          <input
            type="file"
            ref={fileInput}
            id="fileUpload"
            onChange={filePreview}
            hidden
          />
        </Grid>
        <Grid width="345px">
          <TitleBox
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <Grid margin="54px 0px 18px 0px">
            <Text bold20 color="#f5f3f8">
              직무
            </Text>
          </Grid>
          <Grid width="501px">
            <label
              htmlFor="category"
              style={{
                color: ColorStyle.Gray500,
                fontSize: FontScale.Body1_20,
                fontFamily: FontFamily,
                fontWeight: 400,
                marginRight: '32px',
              }}
            >
              <input
                type="radio"
                id="categoryId"
                name="field"
                value="0"
                checked={category === 0 ? true : false}
                onChange={() => setCategory(0)}
                style={{ marginRight: '16px' }}
              />
              백엔드
            </label>
            <label
              htmlFor="category"
              style={{
                color: ColorStyle.Gray500,
                fontSize: FontScale.Body1_20,
                fontFamily: FontFamily,
                fontWeight: 400,
                marginRight: '32px',
              }}
            >
              <input
                type="radio"
                id="categoryId"
                name="field"
                value="1"
                checked={category === 1 ? true : false}
                onChange={() => setCategory(1)}
                style={{
                  marginRight: '16px',
                  backgroundColor: ColorStyle.PrimaryPurple,
                }}
              />
              프론트엔드
            </label>
            <label
              htmlFor="category"
              style={{
                color: ColorStyle.Gray500,
                fontSize: FontScale.Body1_20,
                fontFamily: FontFamily,
                fontWeight: 400,
              }}
            >
              <input
                type="radio"
                id="categoryId"
                name="field"
                value="2"
                checked={category === 2 ? true : false}
                onChange={() => setCategory(2)}
                style={{ marginRight: '16px' }}
              />
              디자인
            </label>
          </Grid>
        </Grid>
      </Div>
      <TagDiv>
        <Grid margin="0px 130px 0px 0px" width="60px">
          <Text bold20 color="#f5f3f8">
            스택/툴
          </Text>
          {/* {stack.length !== 0 ? (
            <HashStackTag
              type="button"
              onClick={() => {
                dispatch(deleteStack(stack));
              }}
            >
              {console.log('stack is exist')}
              {stack}
            </HashStackTag>
          ) : (
            <HashStackTag
              type="button"
              onClick={() => {
                console.log('ddd');
                dispatch(deleteStack(stackTag));
              }}
            >
              {stackTag}
            </HashStackTag>
          )} */}
          {stack.length !== 0 &&
            <HashStackTag
              type="button"
              onClick={() => {
                dispatch(deleteStack(stack));
              }}
            >
              {console.log('stack is exist')}
              {stack}
            </HashStackTag>
          }
        </Grid>
        <Grid margin="0px 130px 0px 0px" width="100%">
          <Text bold20 color="#f5f3f8">
            관심사
          </Text>
          <HashTagDiv>
            {/* {hobby.length !== 0
              ? hobby.map((val) => {
                  {
                    console.log(val);
                  }
                  return (
                    <HashTag
                      type="button"
                      onClick={() => {
                        dispatch(deleteHobby(val));
                      }}
                      key={val}
                    >
                      {val}
                    </HashTag>
                  );
                })
              : hobbyTag?.map((val) => {
                  {
                    console.log(val);
                  }
                  return (
                    <HashTag
                      type="button"
                      onClick={() => {
                        dispatch(deleteHobby(val));
                      }}
                      key={val}
                    >
                      {val}
                    </HashTag>
                  );
                })} */}
            {
              hobby.length !== 0 &&
              hobby.map((val) => {
                {
                  console.log(val);
                }
                return (
                  <HashTag
                    type="button"
                    onClick={() => {
                      dispatch(deleteHobby(val));
                    }}
                    key={val}
                  >
                    {val}
                  </HashTag>
                );
              })
            }
          </HashTagDiv>
        </Grid>
      </TagDiv>
    </Grid>
  );
};

export default CardFrontWrite;

const Div = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
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
  border-radius: 8px;
  object-fit: cover;
`;

const TitleBox = styled.input`
  width: 345px;
  height: 38px;
  font-size: ${FontScale.Header_24};
  font-family: ${FontFamily};
  font-weight: 700;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround300};
  border-bottom: 1px solid ${ColorStyle.Gray300};
  border-right: none;
  border-left: none;
  border-top: none;
  &:focus {
    outline: none;
  }
`;

const TagDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 1110px;
  margin: 20px auto;
  padding: 78px 0px 0px 0px;
  flex-wrap: nowrap;
`;

const HashStackTag = styled.div`
  width: 146px;
  height: 54px;
  margin: 18px 0px;
  border-radius: 50px;
  border: 1px solid ${ColorStyle.PrimaryPurple};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  font-weight: 400;
  text-align: center;
  line-height: 54px;
  cursor: pointer;
`;

const HashTag = styled.div`
  // display: flex;
  // justify-content: start;
  // flex-direction: row;
  width: 146px;
  height: 54px;
  margin: 18px 8px;
  border-radius: 50px;
  border: 1px solid ${ColorStyle.PrimaryPurple};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  font-weight: 400;
  text-align: center;
  line-height: 54px;
  cursor: pointer;
`;

const HashTagDiv = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
  // width: 146px;
  // height: 54px;
  // margin: 10px;
  // border-radius: 50px;
  // border: 1px solid ${ColorStyle.PrimaryPurple};
  // font-size: ${FontScale.Body1_20};
  // font-family: ${FontFamily};
  // color: ${ColorStyle.Gray500};
  // font-weight: 400;
  // text-align: center;
  // line-height: 54px;
`;

// const TextDiv = styled.div`
//   position: absolute;
//   top: 30vh;
//   left: 43vw;
// `;

// const Category = styled.div`
//   position: absolute;
//   top: 37vh;
//   left: 43vw;
// `;

// const AddBtn = styled.button`
//   width: 80px;
//   // position: absolute;
//   // top: 16vh;
//   // left: 70vw;
// `;

// const FieldInput = styled.input`
//   font-size: ${FontScale.Body1_20};
//   font-family: ${FontFamily};
//   font-weight: 400;
//   color: ${ColorStyle.Gray500};
//   // margin: 0px 0px 61px 48px;
// `;

// const Btn = styled.button`
//   width: 80px;
//   position: absolute;
//   top: 16vh;
//   left: 58vw;
// `;
