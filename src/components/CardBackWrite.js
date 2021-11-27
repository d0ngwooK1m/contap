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
// import { ReactComponent as AddBtn } from '../svgs/AddBtn.svg';
// import { ReactComponent as DisAddBtn } from '../svgs/DisAddBtn.svg';
import { ReactComponent as TagIcon } from '../svgs/TagIcon.svg';
import { ReactComponent as InfoLight } from '../svgs/InfoLight.svg';
import { ReactComponent as CloseBtn } from '../svgs/CloseBtn.svg';

import {
  FontFamily,
  FontScale,
  ColorStyle,
  Opacity,
  category,
} from '../utils/systemDesign';
import { Grid, Text } from '../elements';

const CardBackWrite = ({ onHide }) => {
  const dispatch = useDispatch();

  const cardCount = useSelector((state) => state.cards.backCardIdx);

  // 입력 값 저장
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [tagsStr, setTagsStr] = React.useState('');
  const [link, setLink] = React.useState('');

  // const handleClick = useSelector((state) => state.cards.isSuccess);
  // console.log(handleClick);

  // const [disabled, setDisabled] = React.useState(false);

  // const checkValid = () => {
  //   title !== '' && desc !== '' && tagsStr !== ''
  //     ? setDisabled(true)
  //     : setDisabled(false);
  // };

  const disabled = title !== '' && desc !== '' && tagsStr !== '';

  const addCardBack = () => {
    if (cardCount.length === 10) {
      Swal.fire({
        icon: 'error',
        title: '작성 실패',
        text: '카드는 10개까지만 작성 가능합니다!',
      });

      return false;
    }
    if (title.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: '작성 실패',
        text: '프로젝트 제목을 작성해주세요',
      });

      return false;
    }
    if (desc.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: '작성 실패',
        text: '프로젝트 설명을 작성해주세요',
      });

      return false;
    }
    if (tagsStr.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: '작성 실패',
        text: '프로젝트에서 담당했던 일을 작성해주세요',
      });

      return false;
    }

    let url = link.trim();
    console.log(url);
    if (url !== undefined && url.indexOf('http') === -1) {
      // 링크가 만약 http를 포함하지 않는다면(-1은 문자열이 없을때 리턴되는 값이다) 링크앞에 //붙여줌
      url = '//' + url;
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
    <div>
      {!disabled && (
        <div style={{ display: 'flex', margin: '0px 0px 12px 165px' }}>
          <div style={{ marginRight: '16px' }}>
            <InfoLight />
          </div>
          <Text regular20 color={ColorStyle.PrimaryPurple}>
            다른 사람이 Tap! 할 수 있게 제목, 소개글, 태그를 작성해서 프로젝트를
            소개 해보세요
          </Text>
        </div>
      )}
      <Grid
        width="1110px"
        height="509px"
        borderRadius="16px"
        border="1px solid #8c4dff"
        margin="0px auto"
        padding="43px 48px 0px 48px"
        bg="#141422"
      >
        <Div>
          <TitleBox
            type="text"
            placeholder="프로젝트 제목"
            maxLength="50"
            onChange={(e) => {
              setTitle(e.target.value);
              // console.log(e.target.value);
            }}
            // onKeyUp={checkValid}
          />

          {/* <DisAddBtn className="disAddBtn" />
            <AddBtn className="addBtn" cursor="pointer"/> */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <AddBtn
              // className={disabled ? 'addBtn' : 'disAddBtn'}
              // type="button"
              onClick={addCardBack}
              disabled={disabled}
            >
              <Text
                bold20
                color={disabled ? ColorStyle.PrimaryPurple : ColorStyle.Gray300}
              >
                작성 완료
              </Text>
            </AddBtn>
            <div
              onClick={() => {
                onHide();
              }}
            >
              <CloseBtn cursor="pointer" />
            </div>
          </div>
        </Div>
        <Grid>
          <MainDiv>
            <MainBox
              type="text"
              value={desc}
              placeholder="프로젝트를 공유하고 간략하게 기록할 수 있어요 &#13;&#10;프로젝트에서 특별히 공들인 점이나 핵심 내용을 중심으로 작성하면 효과적이에요"
              maxLength="200"
              // onKeyUp={checkValid}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
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
              placeholder="프로젝트에서 담당했던 일을 태그에 적어주세요"
              // onKeyUp={checkValid}
              maxLength="50"
              onChange={(e) => {
                setTagsStr(e.target.value);
              }}
            />
            <div style={{ position: 'absolute', top: '63%', left: '2%' }}>
              <TagIcon />
            </div>
          </TagDiv>
          <LinkDiv>
            <LinkBox
              type="text"
              placeholder="더 자세한 내용은 링크로 추가해 보세요 예시) Github 링크, 블로그 링크, 포트폴리오 링크"
              // onKeyUp={checkValid}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <div style={{ position: 'absolute', top: '55%', left: '2%' }}>
              <Link />
            </div>
          </LinkDiv>
        </Grid>
      </Grid>
    </div>
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

const AddBtn = styled.div`
  width: 111px;
  height: 50px;
  border-radius: 30px;
  border: 1px solid
    ${({ disabled }) =>
      disabled ? ColorStyle.PrimaryPurple : ColorStyle.Gray300};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 700;
  margin-right: 36px;
  margin-bottom: 40px;
  background: ${ColorStyle.BackGround300};
  p {
    cursor: pointer;
    text-align: center;
    line-height: 50px;
  }
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? ColorStyle.PrimaryPurple : ColorStyle.BackGround300};
    border: 1px solid
      ${({ disabled }) =>
        disabled ? ColorStyle.PrimaryPurple : ColorStyle.Gray300};
    transition: 0.3s;
    p {
      color: ${({ disabled }) =>
        disabled ? ColorStyle.Gray500 : ColorStyle.Gray300};
    }
  }
  /* .disAddBtn {
    color: ${ColorStyle.Gray300};
  }
  .addBtn {
    color: ${ColorStyle.PrimaryPurple};
  } */
`;

// const WriteBtn = styled.div`
//   width: '8%';
//   opacity: ${disabled} ? 0.25 : 1;
//   pointer-events: ${disabled}? none : initial;
// `;

const TitleBox = styled.input`
  width: 587px;
  height: 41px;
  font-size: ${FontScale.Header_24};
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
    color: ${ColorStyle.Gray300};
    font-size: ${FontScale.Header_24};
  }
`;

const MainDiv = styled.div`
  position: relative;
`;

const MainBox = styled.textarea`
  width: 960px;
  height: 100px;
  padding: 24px;
  background-color: ${ColorStyle.Gray100 + Opacity[10]};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  border: 1px solid ${ColorStyle.Gray100 + Opacity[60]};
  border-radius: 12px;
  &:focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: ${ColorStyle.Gray300};
    font-size: ${FontScale.Body1_20};
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
  margin-top: 40px;
  background-color: ${ColorStyle.Gray100 + Opacity[10]};
  width: 947px;
  height: 50px;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  border: 1px solid ${ColorStyle.Gray100 + Opacity[60]};
  border-radius: 12px;
  &:focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: ${ColorStyle.Gray300};
    font-size: ${FontScale.Body1_20};
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
  background-color: ${ColorStyle.Gray100 + Opacity[10]};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.PrimaryPurple};
  border: 1px solid ${ColorStyle.BackGround100};
  border-radius: 12px;
  &:focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: ${ColorStyle.Gray300};
    font-size: ${FontScale.Body1_20};
  }
`;
