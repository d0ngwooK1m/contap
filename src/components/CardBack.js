/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Text } from '../elements';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import BasicProfile from '../assets/image/basicProfile.png';

const CardBack = ({
  card,
  userId,
  userName,
  profile,
  children,
  onTapForm,
  show,
}) => {
  console.log('=====> 카드!', card);
  console.log('=====> 유저!', userId);
  console.log('링크 확인 ===>', card.link);

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

  // const stopPropagation = (e) => {
  //   e.stopPropagation();
  // };
  return (
    <Wrap>
      <Card categoryColor={categoryColor()}>
          <div className="category">
            <Text
              regular16
              color={
                categoryColor() ? ColorStyle.Gray500 : ColorStyle.BackGround300
              }
            >
              {category()}
            </Text>
          </div>
          <div className="title">
            <Text bold24 color={ColorStyle.Gray500}>
              {card?.title}
            </Text>
            {card.link && <a className="link" href={card.link} target="_blank">
              <Text
                bold20
                color={
                  categoryColor()
                    ? ColorStyle.PrimaryPurple
                    : ColorStyle.PrimaryMint
                }
              >
                본문 보러가기
              </Text>
            </a>}
          </div>
          <Text regular20 color={ColorStyle.Gray500}>
            {card?.content}
          </Text>
          <CardTapForm categoryColor={categoryColor()} isTapForm={show}>
            <ImageBox src={profile || BasicProfile} />
            <div className="userName">
              <Text regular16 color={ColorStyle.Gray500}>
                {userName}
              </Text>
            </div>
            <hr />
            <button type="button" onClick={onTapForm}>
              <Text
                bold20
                color={
                  categoryColor()
                    ? ColorStyle.Gray500
                    : ColorStyle.BackGround300
                }
              >
                {show ? '취소' : 'Tap?'}
              </Text>
            </button>
          </CardTapForm>
      </Card>
      {children}
    </Wrap>
  );
};

CardBack.propTypes = {
  card: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  profile: PropTypes.string,
  children: PropTypes.any,
};

CardBack.defaultProps = {
  children: false,
  profile: null,
};

const Wrap = styled.div`
  width: 100%;
`;

const Card = styled.div`
  background-color: ${ColorStyle.BackGround300};
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
  padding: 48px;
  z-index: 1;

  .category {
    width: max-content;
    margin-bottom: 30px;
    padding: 8px 12px;
    text-align: center;
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
  width: 652px;
  bottom: 48px;
  align-items: center;

  .userName {
    margin: 0px 20px;
    p {
      width: max-content;
    }
  }
  hr {
    width: 100%;
    border: 1px solid ${ColorStyle.Gray100+Opacity[50]};
  }

  button {
    position: relative;
    right: 0px;
    cursor: pointer;
    min-width: 130px;
    height: 44px;
    margin-left:25px;
    background-color: ${({ categoryColor, isTapForm }) =>
      isTapForm
        ? ColorStyle.Gray300
        : categoryColor
        ? ColorStyle.PrimaryPurple
        : ColorStyle.PrimaryMint};
    border-radius: 40px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border: 2px solid
      ${({ categoryColor, isTapForm }) =>
        isTapForm
          ? ColorStyle.Gray300
          : categoryColor
          ? ColorStyle.PrimaryPurple
          : ColorStyle.PrimaryMint};
    box-sizing: border-box;

    &:hover {
      background-color: ${({ categoryColor, isTapForm }) =>
        isTapForm ? ColorStyle.Gray300 : categoryColor ? '#6235B5' : '#33C68A'};
      border: 2px solid
        ${({ categoryColor, isTapForm }) =>
          isTapForm
            ? ColorStyle.Gray300
            : categoryColor
            ? '#6235B5'
            : '#33C68A'};
    }
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
