/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import HashTag from './HashTag';
import TapForm from './TapForm';
import { useSelector } from 'react-redux';
import { Text } from '../elements';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import BasicProfile from '../assets/image/basicProfile.png';

const CardBack = ({ card, userId, userName, profile }) => {
  const contapCheck = useSelector((state) => state.taps.allIds);
  console.log('=====> 카드!', card);
  console.log('=====> 유저!', userId);
  const [tapFormState, setTapFormState] = React.useState(false);

  // 0 = 백엔드, 1 = 프론트엔드, 2 = 디자이너
  const category = () => {
    if (card.field === 0) {
      return '백엔드 개발자';
    }
    if (card.field === 1) {
      return '프론트엔드 개발자';
    }
    return '디자이너';
  };

  console.log('필드', card);

  const categoryColor = () => {
    if (card.field < 2) {
      return true;
    }
    return false;
  };

  const handleTapForm = () => {
    setTapFormState(!tapFormState);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <Wrap>
      <Card categoryColor={categoryColor()}>
        <div style={{ padding: '48px' }}>
          <div className="category">
            <Text
              regular16
              color={
                categoryColor() ? ColorStyle.Gray500 : ColorStyle.PrimaryPurple
              }
            >
              {category()}
            </Text>
          </div>
          <div className="title">
            <Text bold24 color={ColorStyle.BackGround300}>
              {card?.title}
            </Text>
            <a className="link" href="https://www.naver.com">
              <Text
                regular20
                color={
                  categoryColor()
                    ? ColorStyle.PrimaryPurple
                    : ColorStyle.PrimaryMint
                }
              >
                본문 보러가기
              </Text>
            </a>
          </div>
          <Text regular20 color={ColorStyle.Gray100}>
            {card?.content}
          </Text>
          <CardTapForm categoryColor={categoryColor()}>
            <ImageBox src={profile ? profile : BasicProfile} />
            <div className="userName">
              <Text regular16 color={ColorStyle.BackGround300}>
                {userName}
              </Text>
            </div>
            <hr />
            <button onClick={handleTapForm}>
              <Text bold20 color={ColorStyle.Gray300}>
                Tap?
              </Text>
            </button>
          </CardTapForm>
        </div>
        {tapFormState && <TapForm userId={userId} />}
      </Card>
    </Wrap>
  );
};

CardBack.propTypes = {
  card: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
};

const Wrap = styled.div`
  width: 100%;
`;

const Card = styled.div`
  background-color: #f0ecf9;
  /* background-color: ${ColorStyle.BackGround100}; */
  position: relative;
  left: 10px;
  width: 755px;
  height: 400px;
  margin: 40px 60px;
  border: 3px solid
    ${({ categoryColor }) =>
      categoryColor ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint};
  box-sizing: border-box;
  border-radius: 16px;

  .category {
    width: max-content;
    margin-bottom: 30px;
    padding: 0px 15px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 8px;

    background-color: ${({ categoryColor }) =>
      categoryColor
        ? ColorStyle.PrimaryPurple + Opacity[70]
        : ColorStyle.PrimaryMint + Opacity[70]};
  }

  .title {
    margin: 0px 0px 28px 0px;
    display: flex;

    .link {
      :link {
        text-decoration: none;
      }
      :visited {
        text-decoration: none;
      }
      position: absolute;
      right: 56px;
    }
  }
`;

const CardTapForm = styled.div`
  display: flex;
  position: absolute;
  bottom: 50px;
  left: 48px;
  align-items: center;

  .userName {
    margin: 0px 20px;
    p {
      width: max-content;
    }
  }
  hr {
    width: 380px;
    border: 1px solid ${ColorStyle.Gray300};
  }

  button {
    cursor: pointer;
    min-width: 130px;
    height: 44px;
    margin-left: 25px;
    background-color: ${ColorStyle.Gray500};
    border-radius: 40px;
    border: 2px solid
      ${({ categoryColor }) =>
        categoryColor ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint};
    box-sizing: border-box;
  }
`;

const ImageBox = styled.div`
  height: 40px;
  min-width: 40px;

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
`;

export default CardBack;
