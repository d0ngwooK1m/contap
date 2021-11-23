/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Text } from '../elements';
import { ColorStyle, Opacity, professionColor, category, professionHoverColor } from '../utils/systemDesign';
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

  console.log('필드', card);

  const profession = () => {
    if (card.field === 0) {
      return '백엔드 개발자';
    }
    if (card.field === 1) {
      return '프론트엔드 개발자';
    }
    return '디자이너';
  };

  const cat = category(card.field)
  const color = professionColor(cat)
  const OpacityColor = professionColor(cat,70)
  const hoverColor = professionHoverColor(cat)

  // const stopPropagation = (e) => {
  //   e.stopPropagation();
  // };
  return (
    <Wrap>
      <Card color={color} category={ cat} OpacityColor={OpacityColor} hoverColor={hoverColor}>
        <div className="category">
          <Text
            regular16
            color={
              cat === '디자이너'
                ? ColorStyle.BackGround300
                : ColorStyle.Gray500
            }
          >
            {card.hashTags}
          </Text>
        </div>
        <div className="title">
          <Text bold24 color={ColorStyle.Gray500}>
            {card?.title}
          </Text>
          {card.link && (
            <a className="link" href={card.link} target="_blank">
              <Text bold20 color={color}>
                본문 보러가기
              </Text>
            </a>
          )}
        </div>
        <Text regular20 color={ColorStyle.Gray500}>
          {card?.content}
        </Text>
        <CardTapForm
          color={color}
          hoverColor={hoverColor}
          isTapForm={show}
        >
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
                cat === '디자이너'
                  ? ColorStyle.BackGround300
                  : ColorStyle.Gray500
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
  border: 3px solid ${({ color }) => color};
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

    background-color: ${({ OpacityColor }) =>
      OpacityColor};
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
    border: 1px solid ${ColorStyle.Gray100 + Opacity[50]};
  }

  button {
    position: relative;
    right: 0px;
    cursor: pointer;
    min-width: 130px;
    height: 44px;
    margin-left: 25px;
    background-color: ${({ color, isTapForm }) =>
      isTapForm ? ColorStyle.Gray300 : color};

    border-radius: 40px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border: 2px solid
      ${({ color, isTapForm }) => isTapForm ? ColorStyle.Gray300 : color};
    box-sizing: border-box;

    &:hover {
      background-color: ${({ hoverColor, isTapForm }) =>
        isTapForm ? ColorStyle.Gray300 : hoverColor};
      border: 2px solid
        ${({ hoverColor, isTapForm }) => isTapForm ? ColorStyle.Gray300 : hoverColor};
    }
  }
`;
const ImageBox = styled.div`
  height: 40px;
  min-width: 40px;
  border: 1px solid ${ColorStyle.Gray100+Opacity[25]};

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-size: cover;
  border-radius: 8px;
`;

export default CardBack;
