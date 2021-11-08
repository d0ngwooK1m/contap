/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import EditIcon from '@mui/icons-material/Edit';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useDispatch, useSelector } from 'react-redux';
import { updateCardDB, deleteCardDB } from '../features/cards/actions';
import { Grid, Input } from '../elements';
import { ReactComponent as EditBtn } from '../svgs/EditBtn.svg';
import { ReactComponent as DeleteBtn } from '../svgs/DeleteBtn.svg';
import { ReactComponent as Link } from '../svgs/Link.svg';

import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';

const CardPortfolio = ({ cardId }) => {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.cards.byId);
  console.log(cardList);

  const [title, setTitle] = React.useState(cardList[cardId].title);
  const [desc, setDesc] = React.useState(cardList[cardId].content);
  const [tagsStr, setTagsStr] = React.useState(cardList[cardId].tagsStr);
  const [link, setLink] = React.useState(cardList[cardId].link);
  const content = {
    title,
    content: desc,
    tagsStr,
    link,
  };

  const [display, setDisplay] = React.useState({ display: 'none' });

  const [click, setClick] = React.useState(false);
  const editCardBack = () => setClick(!click);

  const deleteCardBack = () => {
    dispatch(deleteCardDB(cardId));
  };

  const edit = () => {
    dispatch(updateCardDB(cardId, content));
    setClick(!click);
  };

  if (click) {
    return (
      <Grid>
        <Btn onClick={edit}>작성완료</Btn>
        <Grid
          width="1110px"
          height="450px"
          borderRadius="16px"
          border="1px solid #dcdcdc"
          bgcolor="background.paper"
          margin="40px auto"
        >
          <Input
            is_submit
            value={title}
            _onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Input
            value={desc}
            textarea
            _onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <Input
            is_submit
            value={tagsStr}
            _onChange={(e) => {
              setTagsStr(e.target.value);
            }}
          />
          <Input
            is_submit
            value={link}
            _onChange={(e) => {
              setLink(e.target.value);
            }}
          />
        </Grid>
      </Grid>
    );
  }
  console.log(cardList[cardId]);
  return (
    <Grid>
      <Div
        onMouseEnter={() => {
          setDisplay({ display: 'block' });
        }}
        onMouseLeave={() => {
          setDisplay({ display: 'none' });
        }}
      >
        <IconDiv>
          <EditBtn style={display} onClick={editCardBack} />
          <DeleteBtn style={display} onClick={deleteCardBack} />
        </IconDiv>
        <Grid
          width="1110px"
          height="450px"
          borderRadius="16px"
          border="1px solid #a09bac"
          bg="#141422"
          margin="0px auto 40px auto"
        >
          <TitleText>{cardList[cardId].title}</TitleText>
          <MainText>{cardList[cardId].content}</MainText>
          <TagText>{cardList[cardId].tagsStr}</TagText>
          <LinkText>
            <span style={{ marginRight: '24px', verticalAlign: 'middle' }}>
              <Link />
            </span>
            {cardList[cardId].link}
          </LinkText>
        </Grid>
      </Div>
    </Grid>
  );
};

CardPortfolio.propTypes = {
  cardId: PropTypes.number.isRequired,
};

export default CardPortfolio;

const Div = styled.div`
  width: 1110px;
  height: 490px;
  // border-radius: 16px;
  // border: 1px solid #dcdcdc;
  // bgcolor: background.paper;
  margin: 0px auto;
`;

// const TitleInput = styled.input`
//   width: 445px;
//   height: 30px;
//   color: ${ColorStyle.Gray500};
//   background-color: ${ColorStyle.BackGround100};
//   border-bottom: 1px solid ${ColorStyle.Gray100};
//   border-right: none;
//   &:focus {
//     outline: none;
//   }
// `;

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
  color: ${ColorStyle.Gray500};
  margin: 0px 0px 61px 48px;
`;

const TagText = styled.p`
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  margin: 0px 0px 28px 48px;
  width: 10%;
  border: 1px solid #8c4dff;
  border-radius: 8px;
  background-color: #8c4dff;
  text-align: center;
`;

const LinkText = styled.p`
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.PrimaryPurple};
  margin: 0px 0px 64px 48px;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Btn = styled.button`
  width: 80px;
  // position: fixed;
  // top: 16vh;
  // left: 47vw;
`;
