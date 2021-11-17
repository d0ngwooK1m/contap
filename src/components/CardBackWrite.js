/*eslint-disable*/
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import {
  createCardDB,
  // isSuccess
} from '../features/cards/actions';
// import { useForm } from 'react-hook-form';

import { ReactComponent as Link } from '../svgs/Link.svg';
import { ReactComponent as AddBtn } from '../svgs/AddBtn.svg';
import { ReactComponent as Flag } from '../svgs/Flag.svg';

import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';
import { Grid, Text } from '../elements';

const CardBackWrite = ({ onHide }) => {
  const dispatch = useDispatch();
  // const { register } = useForm();

  // 입력 값 저장
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [tagsStr, setTagsStr] = React.useState('');
  const [link, setLink] = React.useState('');

  // const handleClick = useSelector((state) => state.cards.isSuccess);
  // console.log(handleClick);

  const addCardBack = (e) => {
    if (title.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '작성 실패',
        text: '프로젝트 제목을 작성해주세요',
      });
      // alert('프로젝트 제목을 작성해주세요');
      return false;
    }
    if (desc.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '작성 실패',
        text: '프로젝트 설명을 작성해주세요',
      });
      // alert('프로젝트 설명을 작성해주세요');
      return false;
    }
    if (tagsStr.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '작성 실패',
        text: '사용 기술을 작성해주세요',
      });
      // alert('사용 기술을 작성해주세요');
      return false;
    }
    let url = link;
    if (url !== undefined && url.indexOf('http') === -1) {
      // 링크가 만약 http를 포함하지 않는다면(-1은 문자열이 없을때 리턴되는 값이다) 링크앞에 //붙여줌
      url = '//' + url;
      console.log(url);
    }
    const content = {
      title,
      content: desc,
      tagsStr,
      link: url,
    };
    dispatch(createCardDB(content));
    onHide();
    // dispatch(isSuccess(!handleClick));
  };

  return (
    <Grid
      width="1110px"
      height="537px"
      borderRadius="16px"
      border="1px solid #8c4dff"
      margin="40px auto"
      padding="60px 48px 0px 48px"
      bg="#141422"
    >
      <Div>
        <TitleBox
          type="text"
          placeholder="프로젝트 제목"
          onChange={(e) => {
            setTitle(e.target.value);
            // console.log(e.target.value);
          }}
          // {...register('title', {
          //   requirerd: '제목을 입력해주세요',
          //   minLength: {
          //     value: 1,
          //     message: '제목이 공백입니다.',
          //   },
          // })}
        />
        <Grid width="10%">
          <AddBtn cursor="pointer" onClick={addCardBack} />
        </Grid>
      </Div>
      <Grid>
        <MainDiv>
          <MainBox
            type="text"
            value={desc}
            placeholder="프로젝트 설명"
            maxLength="200"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            // {...register('content', { requirerd: true })}
            // ref={register({ requirerd: true })}
          />
          <LengthDiv>
            <Text regular14 color={ColorStyle.Gray300}>
              {desc.length} / 200
            </Text>
          </LengthDiv>
        </MainDiv>
        <TagDiv>
          <TagBox
            type="text"
            placeholder="사용 기술"
            onChange={(e) => {
              setTagsStr(e.target.value);
            }}
            // {...register('tag', { requirerd: true })}
          />
          <div style={{ position: 'absolute', top: '60%', left: '1%' }}>
            <Flag />
          </div>
        </TagDiv>
        <LinkDiv>
          <LinkBox
            type="text"
            placeholder="링크"
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <div style={{ position: 'absolute', top: '45%', left: '1%' }}>
            <Link />
          </div>
        </LinkDiv>
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
  width: 1007px;
  margin: 0px auto;
`;

const TitleBox = styled.input`
  width: 587px;
  height: 41px;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 700;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround100};
  border-bottom: 1px solid ${ColorStyle.Gray300};
  border-right: none;
  border-left: none;
  border-top: none;
  &:focus {
    outline: none;
  }
  margin-bottom: 40px;
  ::-webkit-input-placeholder {
    color: ${ColorStyle.Gray500};
  }
`;

const MainDiv = styled.div`
  position: relative;
`;

const MainBox = styled.textarea`
  width: 960px;
  height: 100px;
  padding: 24px;
  background-color: ${ColorStyle.BackGround300};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  border: none;
  border-radius: 12px;
  &:focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: ${ColorStyle.Gray500};
  }
  resize: none;
`;

const LengthDiv = styled.div`
  position: absolute;
  top: 75%;
  right: 3%;
`;

const TagDiv = styled.div`
  position: relative;
`;

const TagBox = styled.input`
  padding-left: 60px;
  margin-top: 56px;
  background-color: ${ColorStyle.BackGround300};
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
  ::-webkit-input-placeholder {
    color: ${ColorStyle.Gray500};
  }
`;

const LinkDiv = styled.div`
  position: relative;
`;

const LinkBox = styled.input`
  width: 947px;
  height: 50px;
  padding-left: 60px;
  margin-top: 24px;
  background-color: ${ColorStyle.BackGround300};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.PrimaryPurple};
  border: none;
  border-radius: 12px;
  &:focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: ${ColorStyle.PrimaryPurple};
  }
`;
