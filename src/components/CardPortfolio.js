import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import EditIcon from '@mui/icons-material/Edit';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useDispatch, useSelector } from 'react-redux';
import { updateCardDB, deleteCardDB } from '../features/cards/actions';
import { Grid, Text, Input } from '../elements';
import { ReactComponent as EditBtn } from '../svgs/EditBtn.svg';
import { ReactComponent as DeleteBtn } from '../svgs/DeleteBtn.svg';

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
          border="1px solid #dcdcdc"
          bgcolor="background.paper"
          margin="0px auto 40px auto"
        >
          <Text>{cardList[cardId].title}</Text>
          <Text>{cardList[cardId].content}</Text>
          <Text>{cardList[cardId].tagsStr}</Text>
          <Text>{cardList[cardId].link}</Text>
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
