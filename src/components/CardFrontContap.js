/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import BasicProfile from '../assets/image/basicProfile.png';
import { ColorStyle, Opacity } from '../utils/systemDesign';

import { Text } from '../elements';
import HashTag from './HashTag';

const CardFrontContap = ({ userId, onModal }) => {
  const front = useSelector((state) => state.taps.byId);

  const stackHashTags = front[userId].hashTags
    ?.split('_')[0]
    ?.split('@')
    .slice(1, 2);
  const interestHashTags = front[userId].hashTags
    ?.split('_')[1]
    ?.split('@')
    .slice(1, 4);

  // const stopPropagation = (e) => {
  //   e.stopPropagation();
  // };

  // 0 = 백엔드, 1 = 프론트엔드, 2 = 디자이너
  const category = () => {
    if (front[userId].field < 2) {
      return true;
    }
    return false;
  };

  return (
    <CardForm onClick={onModal} category={category()}>
      <div style={{ display: 'flex' }}>
        <ImageBox
          className="imageBox"
          src={front[userId].profile ? front[userId].profile : BasicProfile}
        />
        <div className="userInfo">
          <div className="userName">
            <Text color="#F5F3F8" regular20>
              {front[userId] ? front[userId].userName : null}
            </Text>
          </div>
          <Text
            color={
              category() ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint
            }
            regular20
          >
            # {stackHashTags}
          </Text>
        </div>
      </div>
      <div className="interest">
        <Text regular16>관심사</Text>
      </div>
      <Hash className="hash">
        {interestHashTags?.map((stack, idx) => {
          return (
            stack && <HashTag key={idx} tag={stack} category={category()} />
          );
        })}
      </Hash>
    </CardForm>
  );
};

CardFrontContap.propTypes = {
  userId: PropTypes.number.isRequired,
  onModal: PropTypes.func.isRequired,
};

export default CardFrontContap;

const CardForm = styled.div`
  width: 350px;
  height: 200px;
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid ${ColorStyle.Gray100 + Opacity[50]};
  background-color: ${ColorStyle.BackGround100};

  .userInfo {
    margin: 32px 0px 0px 0px;
  }
  .userName {
    margin: 0px 0px 10px 0px;
  }

  .interest {
    margin: 0px 22px;
  }

  &:hover {
    cursor: pointer;
    border: 3px solid
      ${({ category }) =>
        category ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint};
    background-color: ${({ category }) =>
      category ? ColorStyle.BackGround300 : ColorStyle.BackGround100};
    .imageBox {
      margin: 20px;
    }
    .hash {
      margin: 14px 0px -2px 14px;
      div {
        background-color: ${({ category }) =>
          category
            ? ColorStyle.PrimaryPurple + Opacity[70]
            : ColorStyle.PrimaryMint + Opacity[70]};
      }
    }
    .userInfo {
      margin: 30px -2px 0px 2px;
    }

    .interest {
      margin: 2px 0px -2px 20px;
    }
  }
`;

const ImageBox = styled.div`
  height: 72px;
  width: 80px;
  margin: 22px;

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid ${ColorStyle.Gray100};
`;

const Hash = styled.div`
  display: flex;
  margin: 12px 0px 0px 16px;
`;
