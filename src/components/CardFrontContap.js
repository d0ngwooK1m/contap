/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ColorStyle, Opacity, category, professionColor, professionHoverColor } from '../utils/systemDesign';
import { ReactComponent as FrontProfileSvg } from '../svgs/FrontProfile.svg';

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

    const cat = category(front[userId].field);
    const color = professionColor(cat);
    const hashColor = professionColor(cat, 70);

  return (
    <CardForm onClick={onModal} color={color} category={cat} hashColor={hashColor}>
      <div style={{ display: 'flex' }}>
      {front[userId].profile ? (
          <ImageBox className="imageBox" src={front[userId].profile} />
        ) : (
          <div className="basicProfile">
            <FrontProfileSvg />
          </div>
        )}
        <div className="userInfo">
          <div className="userName">
            <Text color="#F5F3F8" regular20>
              {front[userId] ? front[userId].userName : null}
            </Text>
          </div>
          <Text
            color={
              color
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
  .basicProfile{
    height: 72px;
  width: 80px;
  margin: 22px;

  border: 1px solid ${ColorStyle.Gray100+Opacity[25]};
  border-radius: 8px;
  }

  &:hover {
    cursor: pointer;
    border: 3px solid
      ${({ color }) =>
        color};
    background-color:${({ category }) =>
      category === '디자이너'
        ? ColorStyle.BackGround100
        : ColorStyle.BackGround300};
    .imageBox {
      margin: 20px;
    }
    .hash {
      margin: 14px 0px -2px 14px;
      div {
        background-color:  ${({ hashColor }) => hashColor};
      }
    }
    .userInfo {
      margin: 30px -2px 0px 2px;
    }
    .basicProfile{
  margin: 20px;
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
  border: 1px solid ${ColorStyle.Gray100+Opacity[25]};

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
