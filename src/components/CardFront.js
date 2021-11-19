/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { loadCurrentCardDB } from '../features/cards/actions';
import CardFrontContap from './CardFrontContap';
import HashTag from './HashTag';
import BasicProfile from '../assets/image/basicProfile.png';

import CardModal from './CardModal';
import ContapModal from './ContapModal';
import { Text } from '../elements';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import { getToken } from '../utils/auth';

const CardFront = ({ userId, contap, select}) => {
  const dispatch = useDispatch();
  const front = useSelector((state) =>
    contap ? state.taps.byId : state.cards.byId,
  );
  const isLogin = useSelector((state) => state.user.isAuthorized);
  const token = getToken();
  const [showModal, setShowMadal] = React.useState(false);
  const [sideModal, setSideModal] = React.useState(false);

  console.log(select)
  const MySwal = withReactContent(Swal);
  console.log('카드프론트 프로필', front[userId].profile);
  // Modal Handler
  const showCardBackModal = async () => {
    if (!isLogin || !token) {
      await MySwal.fire({
        title: <strong>로그인을 해주세요!</strong>,
        icon: 'error',
        footer: '<a href="/login">로그인 하러 가기!</a>',
      });
      return null;
    }
    if (!showModal) {
      await dispatch(loadCurrentCardDB(userId));
    }
    setShowMadal(true);
  };

  const closeModal = () => {
    setShowMadal(false);
  };

  // Side Modal Handler
  const handleSideModal = () => {
    setShowMadal(false);
    setSideModal(true);
  };

  const closeSideModal = () => {
    setSideModal(false);
    setShowMadal(true);
  };

  const stackHashTags = front[userId].hashTags
    ?.split('_')[0]
    ?.split('@')
    .slice(1, 2);
  const interestHashTags = front[userId].hashTags
    ?.split('_')[1]
    ?.split('@')
    .slice(1, 4);

  // 0 = 백엔드, 1 = 프론트엔드, 2 = 디자이너
  const category = () => {
    if (front[userId].field < 2) {
      return true;
    }
    return false;
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <CardForm onClick={showCardBackModal} category={category()}>
      <div onClick={stopPropagation} aria-hidden="true">
        {!contap && showModal && (
          <CardModal
            show={showModal}
            onHide={closeModal}
            userId={userId}
            userName={front[userId].userName}
            profile={front[userId].profile}
            category={category()}
          />
        )}
        {contap && showModal && (
          <ContapModal
            className="contapModal"
            show={showModal}
            onHide={closeModal}
            userCradInfo={front[userId]}
            category={category()}
            select={select}
          >
            <CardFrontContap onModal={handleSideModal} userId={userId} />
          </ContapModal>
        )}
        {sideModal && (
          <CardModal
            show={sideModal}
            onHide={closeSideModal}
            userId={userId}
            userName={front[userId].userName}
            profile={front[userId].profile}
            category={category()}
            contap
          />
        )}
      </div>
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

CardFront.propTypes = {
  userId: PropTypes.number.isRequired,
  select: PropTypes.string,
  contap: PropTypes.bool,
  grab: PropTypes.bool,
};

CardFront.defaultProps = {
  select: null,
  contap: false,
  grab: false,
};

export const MemoizedCardFront = React.memo(CardFront);
// export default CardFront;

const CardForm = styled.div`
  width: 350px;
  height: 200px;
  border-radius: 16px;
  box-sizing: border-box;
  margin: 22px 15px;
  border: 1px solid ${ColorStyle.Gray100 + Opacity[50]};
  background-color: ${ColorStyle.BackGround100};

  .userInfo {
    margin: 40px 0px 0px 0px;
  }
  .userName {
    margin: 0px 0px 15px 0px;
  }

  .interest {
    margin: 0px 22px;
  }

  &:hover {
    cursor: pointer;
    border: 3px solid
      ${({ category }) =>
        category ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint};

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
      margin: 38px -2px 0px 2px;
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
