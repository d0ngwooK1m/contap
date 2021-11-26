/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { updateCardDB, deleteCardDB } from '../features/cards/actions';
import { DeleteAlert } from '../utils/alert';

import { Grid, Text } from '../elements';
import { ReactComponent as EditBtn } from '../svgs/EditBtn.svg';
import { ReactComponent as DeleteBtn } from '../svgs/DeleteBtn.svg';
import { ReactComponent as TagIcon } from '../svgs/TagIcon.svg';
import { ReactComponent as Link } from '../svgs/Link.svg';
import { ReactComponent as AddBtn } from '../svgs/AddBtn.svg';
import {
  FontFamily,
  FontScale,
  ColorStyle,
  Opacity,
} from '../utils/systemDesign';

const CardPortfolio = ({ cardId }) => {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.cards.backCard);
  console.log(cardList);

  const [title, setTitle] = React.useState(cardList[cardId].title);
  const [desc, setDesc] = React.useState(cardList[cardId].content);
  const [tagsStr, setTagsStr] = React.useState(cardList[cardId].tagsStr);
  const [link, setLink] = React.useState(cardList[cardId].link);

  // onMouse
  // const [display, setDisplay] = React.useState({ display: 'none' });

  const [click, setClick] = React.useState(false);
  const editCardBack = () => setClick(!click);

  const deleteCardBack = async () => {
    const { isConfirmed } = await DeleteAlert.fire({
      title: (
        <div style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '74px' }}>
            <Text bold32 color={ColorStyle.Gray500}>
              카드를 삭제할까요?
            </Text>
          </div>
        </div>
      ),
    });
    if (isConfirmed) {
      dispatch(deleteCardDB(cardId));
    }
  };

  const edit = () => {
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
        text: '카드 내용과 관련된 분야를 작성해주세요',
      });

      return false;
    }

    let editLink = link.trim();
    if (editLink !== undefined && editLink.indexOf('//') === -1) {
      editLink = '//' + editLink;
      console.log(editLink);
    }
    const content = {
      title,
      content: desc,
      tagsStr,
      link: editLink,
    };

    dispatch(updateCardDB(cardId, content));
    setClick(!click);
  };

  const url = cardList[cardId].link?.split('//')[1];
  console.log('앞면 링크 확인====>', url);
  // let url = cardList[cardId].link;
  // if (url !== undefined && url?.indexOf('http') === -1) {
  //   // 링크가 만약 http를 포함하지 않는다면(-1은 문자열이 없을때 리턴되는 값이다) 링크앞에 //붙여줌
  //   url = '//' + url;
  // }
  // console.log('url===>', url);
  // console.log(cardList[cardId].link);

  if (click) {
    return (
      <Grid
        width="1110px"
        height="509px"
        borderRadius="16px"
        border="1px solid #8c4dff"
        margin="48px auto"
        padding="48px 48px 0px 48px"
        bg="#141422"
      >
        <EditDiv>
          <TitleBox
            type="text"
            value={title}
            maxLength="50"
            placeholder="프로젝트 제목"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Grid width="8%">
            <AddBtn cursor="pointer" onClick={edit} />
          </Grid>
        </EditDiv>
        <MainDiv>
          <MainBox
            type="text"
            value={desc}
            placeholder="프로젝트를 공유하고 간략하게 기록할 수 있어요 &#13;&#10;프로젝트에서 특별히 공들인 점이나 핵심 내용을 중심으로 작성하면 효과적이에요"
            textarea
            maxLength="200"
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
            value={tagsStr}
            placeholder="프로젝트에서 담당했던 일을 태그에 적어주세요"
            onChange={(e) => {
              setTagsStr(e.target.value);
            }}
          />
          <div style={{ position: 'absolute', top: '52%', left: '2%' }}>
            <TagIcon />
          </div>
        </TagDiv>
        <LinkDiv>
          <LinkBox
            value={link}
            placeholder="더 자세한 내용은 링크로 추가해 보세요 예시) Github 링크, 블로그 링크, 포트폴리오 링크"
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <div style={{ position: 'absolute', top: '34%', left: '2%' }}>
            <Link />
          </div>
        </LinkDiv>
      </Grid>
    );
  }

  return (
    <Grid>
      <Div
      // // onMouse
      // onMouseEnter={() => {
      //   setDisplay({ display: 'block' });
      // }}
      // onMouseLeave={() => {
      //   setDisplay({ display: 'none' });
      // }}
      >
        <ProjectDiv>
          <Grid is_flex>
            <TitleText>{cardList[cardId].title}</TitleText>
            <IconDiv className="iconDiv">
              <EditBtn
                onClick={editCardBack}
                cursor="pointer"
                className="editBtn"
              />
              <DeleteBtn
                onClick={deleteCardBack}
                cursor="pointer"
                className="deleteBtn"
              />
            </IconDiv>
          </Grid>
          <MainText>{cardList[cardId].content}</MainText>
          <div
            style={{
              marginLeft: '48px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <TagIcon />
            <TagText>{cardList[cardId].tagsStr}</TagText>
          </div>
          <LinkText href={cardList[cardId].link} target="_blank">
            <div
              style={{
                marginRight: '20px',
                position: 'relative',
              }}
            >
              <Link />
            </div>
            {url}
          </LinkText>
          {/* <a href={cardList[cardId].link} target="_blank">
            <span style={{ marginRight: '24px', verticalAlign: 'middle' }}>
              <Link />
            </span>
            {cardList[cardId].link}
          </a> */}
        </ProjectDiv>
      </Div>
    </Grid>
  );
};

CardPortfolio.propTypes = {
  cardId: PropTypes.number.isRequired,
};

export default CardPortfolio;

const EditDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 1007px;
  margin: 0px auto;
`;

const Div = styled.div`
  width: 1110px;
  height: 370px;
  margin: 0px auto 48px auto;
`;

const ProjectDiv = styled.div`
  width: 1110px;
  height: 370px;
  border-radius: 16px;
  border: 1px solid ${'#4d4759' + Opacity[50]};
  background-color: ${ColorStyle.BackGround100};
  margin: 0px auto 48px auto;
  &:hover {
    border: 1px solid ${ColorStyle.PrimaryPurple};
    background: ${'#a09bac' + Opacity[15]};
    transition: 0.3s;

    .iconDiv {
      display: flex;
    }
    .editBtn {
      margin-right: 36px;
      width: 64px;
    }
    .deleteBtn {
      width: 64px;
    }
  }
`;

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
  margin-bottom: 24px;
  padding-left: 60px;
  margin-top: 40px;
  background-color: ${ColorStyle.Gray100 + Opacity[15]};
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

const TitleText = styled.p`
  font-size: ${FontScale.Header_24};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  // border-bottom: 1px solid ${ColorStyle.Gray100};
  padding: 14px 0px;
  width: 587px;
  margin: 48px 0px 36px 48px;
  font-weight: 700;
`;

const MainText = styled.p`
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  white-space: pre-line;
  margin: 0px 48px 48px 48px;
`;

const TagText = styled.div`
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  margin-left: 20px;
  padding: 7px 10px;
  border: 1px solid ${'#8c4dff' + Opacity[70]};
  border-radius: 8px;
  background-color: ${'#8c4dff' + Opacity[70]};
  text-align: center;
`;

const LinkText = styled.a`
  display: flex;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.PrimaryPurple};
  margin: 0px 0px 48px 48px;
  padding-top: 20px;
  text-decoration: none;
`;

// const TextDiv = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const IconDiv = styled.div`
  display: none;
  justify-content: space-around;
  margin-right: 32px;
`;
