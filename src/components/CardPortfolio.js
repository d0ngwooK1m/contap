/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { updateCardDB, deleteCardDB } from '../features/cards/actions';
import BasicAlert from '../utils/deleteAlert';

import { Grid, Text } from '../elements';
import { ReactComponent as EditBtn } from '../svgs/EditBtn.svg';
import { ReactComponent as DeleteBtn } from '../svgs/DeleteBtn.svg';
import { ReactComponent as Link } from '../svgs/Link.svg';
import { ReactComponent as AddBtn } from '../svgs/AddBtn.svg';
import { ReactComponent as Flag } from '../svgs/Flag.svg';
import {
  FontFamily,
  FontScale,
  ColorStyle,
  Opacity,
} from '../utils/systemDesign';

const CardPortfolio = ({ cardId }) => {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.cards.byId);
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
    const { isConfirmed } = await BasicAlert.fire({
      title: (
        <div style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '108px' }}>
            <Text bold32 color={ColorStyle.BackGround300}>
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
    if (title.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '작성 실패',
        text: '프로젝트 제목을 작성해주세요',
      });

      return false;
    }
    if (desc.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '작성 실패',
        text: '프로젝트 설명을 작성해주세요',
      });

      return false;
    }
    if (tagsStr.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '작성 실패',
        text: '사용 기술을 작성해주세요',
      });

      return false;
    }
    let editLink = link;
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
        height="537px"
        borderRadius="16px"
        border="1px solid #8c4dff"
        margin="40px auto"
        padding="60px 48px 0px 48px"
        bg="#141422"
      >
        <EditDiv>
          <TitleBox
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Grid width="10%">
            <AddBtn cursor="pointer" onClick={edit} />
          </Grid>
        </EditDiv>
        <MainDiv>
          <MainBox
            type="text"
            value={desc}
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
            onChange={(e) => {
              setTagsStr(e.target.value);
            }}
          />
          <div style={{ position: 'absolute', top: '50%', left: '1%' }}>
            <Flag />
          </div>
        </TagDiv>
        <LinkDiv>
          <LinkBox
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <div style={{ position: 'absolute', top: '20%', left: '1%' }}>
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
              <EditBtn onClick={editCardBack} cursor="pointer" width="38%" />
              <DeleteBtn
                onClick={deleteCardBack}
                cursor="pointer"
                width="38%"
              />
            </IconDiv>
          </Grid>
          <MainText>{cardList[cardId].content}</MainText>
          <TagText>{cardList[cardId].tagsStr}</TagText>
          <LinkText href={cardList[cardId].link} target="_blank">
            <span style={{ marginRight: '24px', verticalAlign: 'middle' }}>
              <Link />
            </span>
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
  height: 490px;
  margin: 0px auto;
`;

const ProjectDiv = styled.div`
  width: 1110px;
  height: 450px;
  border-radius: 16px;
  border: 1px solid ${'#4d4759' + Opacity[50]};
  background-color: ${ColorStyle.BackGround100};
  margin: 0px auto 40px auto;
  &:hover {
    border: 1px solid ${ColorStyle.PrimaryPurple};
    background: ${'#a09bac' + Opacity[15]};

    .iconDiv {
      display: flex;
    }
  }
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
`;

const LinkDiv = styled.div`
  position: relative;
`;

const LinkBox = styled.input`
  width: 947px;
  height: 50px;
  padding-left: 60px;
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
`;

const TitleText = styled.p`
  font-size: ${FontScale.Header_24};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  border-bottom: 1px solid ${ColorStyle.Gray100};
  padding: 14px 0px;
  width: 587px;
  margin: 64px 0px 40px 48px;
  font-weight: 700;
`;

const MainText = styled.p`
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  margin: 0px 48px 61px 48px;
`;

const TagText = styled.p`
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  margin: 0px 0px 28px 48px;
  padding: 7px 10px;
  display: inline-block;
  // width: 10%;
  border: 1px solid ${'#8c4dff' + Opacity[70]};
  border-radius: 8px;
  background-color: ${'#8c4dff' + Opacity[70]};
  text-align: center;
`;

const LinkText = styled.a`
  display: block;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.PrimaryPurple};
  margin: 0px 0px 64px 48px;
  text-decoration: none;
`;

// const TextDiv = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const IconDiv = styled.div`
  display: none;
  justify-content: space-around;
  margin-right: 48px;
`;
