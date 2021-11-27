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

import { ReactComponent as AddBtn } from '../svgs/AddBtn.svg';
import BasicProfile from '../assets/image/Profile.svg';
import { history } from '../features/configureStore';

import {
  FontFamily,
  FontScale,
  ColorStyle,
  Opacity,
} from '../utils/systemDesign';
import { Grid, Text } from '../elements';

const CardFrontWrite = ({ setMaxMessage }) => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.cards.preview);
  const front = useSelector((state) => state.cards.byId);
  const userInfo = useSelector((state) => state.cards.current);

  const [userName, setUserName] = React.useState(
    // () => JSON.parse(localStorage.getItem('nick')) ||
    userInfo.userName,
  );
  const [category, setCategory] = React.useState(
    // () => JSON.parse(localStorage.getItem('category')) ||
    userInfo.field,
  );
  // const [hobbyTag, setHobbyTag] = React.useState(() => {
  //   JSON.parse(localStorage.getItem('tag')) ||
  //     userInfo.hashTagsString?.split('_')[1]?.split('@').slice(1, 4);
  // });
  // console.log('유저 닉네임 확인===>', userName);
  // console.log('dsadsadsa', hobbyTag);

  const stackTag = userInfo.hashTagsString?.split('_')[0]?.split('@')[1];
  // .slice(1, 2);

  const hobbyTag = userInfo.hashTagsString
    ?.split('_')[1]
    ?.split('@')
    .slice(1, 4);
  for (let i = 0; i < hobbyTag?.length; i++) {
    if (hobbyTag[i] === '') {
      hobbyTag.pop();
    }
  }

  const stackText = '나의 스택';
  const hobbyText1 = '관심사1';
  const hobbyText2 = '관심사2';
  const hobbyText3 = '관심사3';

  //let test = userInfo.hashTagsString?.split('_')[1]?.split('@').slice(1, 4);
  //test = JSON.parse(localStorage.getItem('tag'));

  // const ddd = '';
  // const abc = hobbyTag.filter(ddd);
  // console.log('앞면 관심사 스플릿 태그확인====>', abc);

  React.useEffect(() => {
    // if (stackTag?.length !== 0 && stackTag[0] !== '') {
    //   dispatch(updateStack(stackTag));
    // }
    // if (hobbyTag?.length !== 0 && hobbyTag[hobbyTag?.length - 1] !== '') {
    //   dispatch(updateHobby(hobbyTag));
    // }
    dispatch(updateStack(stackTag));
    dispatch(updateHobby(hobbyTag));
  }, [userInfo]);

  // if (stackTag !== undefined) {
  //   dispatch(updateStack(stackTag[0]));
  // }
  // if (hobbyTag !== undefined) {
  //   dispatch(updateAllHobby(hobbyTag));
  // }

  let stack = useSelector((state) => state.cards.stack);
  let hobby = useSelector((state) => state.cards.hobby);

  if (stack.length === 1) {
    if (stack[0] === '') {
      stack = [];
    }
  }

  if (hobby.length === 1) {
    if (hobby[0] === '' || hobby[0] === undefined) {
      hobby = [];
    }
  } else if (hobby.length === 2) {
    if (typeof hobby[0] === undefined) {
      hobby.shift();
    }
  }
  // if (stack === '') {
  //   stack = [];
  // }
  // if (hobbyTag === undefined) {
  //   // for (let i = 0; i < hobbyTag.length; i++) {
  //   // if (hobbyTag[i] === '') {
  //   //   hobbyTag.pop();
  //   // }
  //   hobby = [];
  //   // }
  // }

  // const handleRadioChange = (e) => {
  //   //e.target.checked;
  //   setCategory(e.target.value);
  //   console.log(e.target.value);
  // };

  const fileInput = React.useRef();

  const [fileData, setFileData] = React.useState(null);

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
    const formData = new FormData();
    formData.append('userName', userName);
    // console.log('입력 전 확인', stack, hobby);
    // if (stack.length !== 0 && hobby.length !== 0) {
    formData.append('hashTagsStr', stack + ',' + hobby);
    // } else if (stack.length === 0 && hobby.length !== 0) {
    //   formData.append('hashTagsStr', stack + ',' + hobby);
    // } else if (stack.length !== 0 && hobby.length === 0) {
    //   formData.append('hashTagsStr', stack + ',' + hobby);
    // } else {
    //   formData.append('hashTagsStr', stack + ',' + hobby);
    // }

    formData.append('field', category);
    if (fileData) {
      formData.append('profile', fileData);
    }

    dispatch(editCardProfileDB(formData));
    // localStorage.removeItem('nick');
    // localStorage.removeItem('category');
    localStorage.removeItem('tag');
  };

  // const cancel = () => {
  //   setFileData(null);
  // };

  React.useEffect(() => {
    // e.preventDefault();
    if (!userInfo.userName) {
      window.location.href = '/mypage';

      return;
    }

    // dispatch(loadMyCardDB());
    // localStorage.setItem('nick', JSON.stringify(userName));
    // localStorage.setItem('category', JSON.stringify(category));
    // localStorage.setItem('tag', JSON.stringify(hobbyTag));
  }, []);

  return (
    <Grid>
      <Grid
        height="540px"
        bg={ColorStyle.BackGround100 + Opacity[50]}
        margin="0px auto"
        padding="72px 0px 0px 0px"
      >
        <Grid is_flex width="1110px" margin="0px auto 88px auto">
          <Text bold24 color="#f5f3f8">
            {userInfo.userName}님을 나타낼 수 있는 프로필을 만들어보세요
          </Text>
          <Grid width="7%">
            <AddBtn cursor="pointer" onClick={addBtnClick} />
          </Grid>
        </Grid>
        <Div>
          <Grid margin="88px 72px 72px 0px" width="124px">
            <label htmlFor="fileUpload">
              <Img src={preview || userInfo.profile || BasicProfile} />
            </label>
            <input
              type="file"
              ref={fileInput}
              id="fileUpload"
              onChange={filePreview}
              hidden
            />
          </Grid>
          {/* <Grid _onClick={cancel}>취소</Grid> */}
          <Grid width="345px">
            <TitleBox
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="닉네임을 입력해 주세요"
            />
            <Grid width="501px" margin="46px 0px 0px 0px">
              <RadioWrap>
                <InputLabel
                  htmlFor="category"
                  // style={{
                  //   color: ColorStyle.Gray500,
                  //   fontSize: FontScale.Body1_20,
                  //   fontFamily: FontFamily,
                  //   fontWeight: 400,
                  //   marginRight: '32px',
                  // }}
                >
                  <RadioInput
                    type="radio"
                    id="categoryId"
                    name="field"
                    value="0"
                    checked={category === 0 ? true : false}
                    onChange={() => setCategory(0)}
                  />
                  백엔드
                </InputLabel>
              </RadioWrap>
              <RadioWrap>
                <InputLabel
                  htmlFor="category"
                  // style={{
                  //   color: ColorStyle.Gray500,
                  //   fontSize: FontScale.Body1_20,
                  //   fontFamily: FontFamily,
                  //   fontWeight: 400,
                  //   marginRight: '32px',
                  // }}
                >
                  <RadioInput
                    type="radio"
                    id="categoryId"
                    name="field"
                    value="1"
                    checked={category === 1 ? true : false}
                    onChange={() => setCategory(1)}
                    // style={{
                    //   marginRight: '16px',
                    // }}
                  />
                  프론트엔드
                </InputLabel>
              </RadioWrap>
              <RadioWrap>
                <InputLabel
                  htmlFor="category"
                  // style={{
                  //   color: ColorStyle.Gray500,
                  //   fontSize: FontScale.Body1_20,
                  //   fontFamily: FontFamily,
                  //   fontWeight: 400,
                  // }}
                >
                  <RadioInput
                    type="radio"
                    id="categoryId"
                    name="field"
                    value="2"
                    checked={category === 2 ? true : false}
                    onChange={() => setCategory(2)}
                    // style={{ marginRight: '16px' }}
                  />
                  디자인
                </InputLabel>
              </RadioWrap>
            </Grid>
          </Grid>
        </Div>
        <TagDiv>
          <Grid margin="0px 136px 0px 0px" width="60px">
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
            {stack.length === 0 || stack[0] === undefined ? (
              <BasicHashTag type="button">
                {console.log('stack is no')}
                {stackText}
              </BasicHashTag>
            ) : (
              <HashStackTag
                type="button"
                onClick={() => {
                  dispatch(deleteStack(stack));
                }}
              >
                {console.log('stack is exist')}
                {stack}
              </HashStackTag>
            )}
            {/* // {stack.length !== 0 && (
          //   // stack[0] !== '' &&
          //   <HashStackTag
          //     type="button"
          //     onClick={() => {
          //       dispatch(deleteStack(stack));
          //     }}
          //   >
          //     {console.log('stack is exist')}
          //     {stack}
          //   </HashStackTag>
          // )} */}
            {/* if(stack.length !== 0)
          { return(
            <HashStackTag
              type="button"
              onClick={() => {
                dispatch(deleteStack(stack));
              }}
            >
              {console.log('stack is exist')}
              {stack}
            </HashStackTag>
           ) }
          else if(stack.length === ""){<div> {stack}</div>}} */}
          </Grid>
          <Grid margin="0px 130px 0px 0px" width="100%">
            <Text bold20 color="#f5f3f8">
              관심사
            </Text>

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
            {/* {hobby.length === 0 || hobby[0] === undefined ? (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <BasicHashTag type="button">
                    {console.log('stack is no')}
                    {hobbyText1}
                  </BasicHashTag>
                  <BasicHashTag type="button">
                    {console.log('stack is no')}
                    {hobbyText2}
                  </BasicHashTag>
                  <BasicHashTag type="button">
                    {console.log('stack is no')}
                    {hobbyText3}
                  </BasicHashTag>
                </div>
              ) : ( */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <BasicHashTag>{hobbyText1}</BasicHashTag>
                <BasicHashTag>{hobbyText2}</BasicHashTag>
                <BasicHashTag>{hobbyText3}</BasicHashTag>
              </div>
              <HashTagDiv>
                {hobby.map((val) => {
                  return (
                    <HashTag
                      type="button"
                      onClick={() => {
                        dispatch(deleteHobby(val));
                        setMaxMessage(false);
                      }}
                      key={val}
                    >
                      {val}
                    </HashTag>
                  );
                })}
                {/* ) */}
              </HashTagDiv>
            </div>
          </Grid>
        </TagDiv>
      </Grid>
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
  height: 110px;
  margin: 0px auto;
`;

const Img = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0px;
  width: 124px;
  height: 112px;
  border: 1px solid ${ColorStyle.Gray100 + Opacity[25]};
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
`;

const TitleBox = styled.input`
  width: 345px;
  height: 36px;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 700;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround100 + Opacity[50]};
  border-bottom: 1px solid ${ColorStyle.Gray300};
  border-right: none;
  border-left: none;
  border-top: none;
  &:focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: ${ColorStyle.Gray100};
  }
`;

// const RadioWrap = styled.div`
//   display: inline-block;
//   position: relative;
//   padding: 0 6px;
//   margin: 10px 0;
// `;

// const InputLabel = styled.label`
//   color: ${ColorStyle.Gray500};
//   font-size: ${FontScale.Body1_20};
//   font-family: ${FontFamily};
//   font-weight: 400;
//   margin-right: 32px;
//   &:before {
//     content: ' ';
//     display: inline-block;
//     position: relative;
//     top: 5px;
//     margin: 0 5px 0 0;
//     width: 22px;
//     height: 22px;
//     border-radius: 100%;
//     background-color: ${ColorStyle.Gray300 + Opacity[30]};
//   }
// `;

// const RadioInput = styled.input`
//   display: none;
//   // position: absolute;
//   // appearance: none;
//   // width: 22px;
//   // height: 22px;
//   // border-radius: 100%;
//   // margin-right: 16px;
//   // background-color: ${ColorStyle.Gray300 + Opacity[30]};
//   // background: ${ColorStyle.PrimaryPurple};

//   &:checked + ${InputLabel}:after {
//     display: block;
//     content: '';
//     position: absolute;
//     top: 1px;
//     left: 5px;
//     width: 11.85px;
//     height: 11.85px;
//     background: ${ColorStyle.PrimaryPurple};
//     border-radius: 100%;
//     // box-shadow: inset 0px 0px 10px rgba(0,0,0,0.3);
//   }
//   // &:checked {
//   //   // width: 11.85px;
//   //   // height: 11.85px;
//   //   background: ${ColorStyle.PrimaryPurple};
//   // }
// `;

const RadioWrap = styled.div`
  display: inline-flex;
  align-items: center;
`;

const InputLabel = styled.label`
  color: ${ColorStyle.Gray500};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  margin-right: 32px;
`;

const RadioInput = styled.input`
  cursor: pointer;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 100%;
  margin-right: 16px;
  background-color: ${ColorStyle.Gray300 + Opacity[30]};
  // background: ${ColorStyle.PrimaryPurple};

  &:checked {
    // width: 11.85px;
    // height: 11.85px;
    background: ${ColorStyle.PrimaryPurple};
    border: 5px solid #4b4950;
  }
`;

const TagDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  width: 1110px;
  margin: 20px auto;
  padding: 72px 0px 0px 0px;
  flex-wrap: nowrap;
`;

const BasicHashTag = styled.div`
  width: 146px;
  height: 48px;
  margin-top: 20px;
  margin-right: 20px;
  border-radius: 50px;
  border: 1px solid ${'#4d4759' + Opacity[40]};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray100};
  font-weight: 400;
  text-align: center;
  line-height: 48px;
  background: ${ColorStyle.BackGround};
`;

const HashStackTag = styled.div`
  width: 148px;
  height: 48px;
  margin-top: 20px;
  margin-right: 16px;
  border-radius: 50px;
  background: #723cd4;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  font-weight: 400;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  &:hover {
    background-color: #6235b5;
    transition: 0.3s;
  }
`;

const HashTag = styled.div`
  // display: flex;
  // justify-content: start;
  // flex-direction: row;
  width: 148px;
  height: 48px;
  margin-top: 20px;
  margin-right: 20px;
  border-radius: 50px;
  background: #723cd4;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  font-weight: 400;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  &:hover {
    background-color: #6235b5;
    transition: 0.3s;
  }
`;

const HashTagDiv = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
  position: absolute;
  top: 3%;
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
