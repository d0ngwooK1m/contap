/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import EditIcon from '@mui/icons-material/Edit';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useDispatch, useSelector } from 'react-redux';
import {
  updateCardDB,
  deleteCardDB,
  loadMyCardDB,
} from '../features/cards/actions';

import { Grid, Input } from '../elements';
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

  React.useEffect(() => {
    dispatch(loadMyCardDB());
  }, []);

  if (click) {
    return (
      <Grid
        width="1110px"
        height="537px"
        borderRadius="16px"
        border="1px solid #8c4dff"
        margin="40px auto"
        padding="60px 48px 0px 48px"
        bg="#1d1d22"
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
        <MainBox
          value={desc}
          textarea
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <TagBox
          value={tagsStr}
          onChange={(e) => {
            setTagsStr(e.target.value);
          }}
        />
        <span style={{ position: 'absolute', top: '127%', left: '24%' }}>
          <Flag />
        </span>
        <LinkBox
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
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
          <EditBtn style={display} onClick={editCardBack} cursor="pointer" />
          <DeleteBtn
            style={display}
            onClick={deleteCardBack}
            cursor="pointer"
          />
        </IconDiv>
        <ProjectDiv>
          <TitleText>{cardList[cardId].title}</TitleText>
          <MainText>{cardList[cardId].content}</MainText>
          <TagText>{cardList[cardId].tagsStr}</TagText>
          <LinkText>
            <span style={{ marginRight: '24px', verticalAlign: 'middle' }}>
              <Link />
            </span>
            {cardList[cardId].link}
          </LinkText>
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
  width: 1007px 
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
`;

const TitleBox = styled.input`
  width: 587px;
  height: 41px;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 700;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround300};
  border-bottom: 1px solid ${ColorStyle.Gray300};
  border-right: none;
  &:focus {
    outline: none;
  }
  margin-bottom: 40px;
`;

const MainBox = styled.textarea`
  width: 960px;
  height: 100px;
  padding: 24px;
  background-color: ${ColorStyle.Gray300};
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  border: none;
  border-radius: 12px;
  &:focus {
    outline: none;
`;

const TagBox = styled.input`
  margin-bottom: 24px;
  padding-left: 60px;
  margin-top: 56px;
  background-color: ${ColorStyle.Gray300};
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

const LinkBox = styled.input`
  width: 1007px;
  height: 50px;
  background-color: ${ColorStyle.Gray300};
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
  width: 10%;
  border: 1px solid ${'#8c4dff' + Opacity[70]};
  border-radius: 8px;
  background-color: ${'#8c4dff' + Opacity[70]};
  text-align: center;
`;

const LinkText = styled.p`
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.PrimaryPurple};
  margin: 0px 0px 64px 48px;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const Btn = styled.button`
  width: 80px;
  // position: fixed;
  // top: 16vh;
  // left: 47vw;
`;
