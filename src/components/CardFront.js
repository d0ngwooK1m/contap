/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { loadCurrentCardDB } from '../features/cards/actions';
import CardFrontContap from './CardFrontContap';
import HashTag from './HashTag';
import { ReactComponent as FrontProfileSvg } from '../svgs/FrontProfile.svg';
import { ReactComponent as LoginAlertSvg } from '../svgs/LoginAlert.svg';
import { useLocation, useHistory, useParams } from 'react-router-dom';

import CardModal from './CardModal';
import ContapModal from './ContapModal';
import { Text } from '../elements';
import {
  ColorStyle,
  Opacity,
  professionColor,
  category,
  professionHoverColor,
} from '../utils/systemDesign';
import { getToken } from '../utils/auth';
import {LoginAlert} from '../utils/alert';
// import T from '../api/tokenInstance';

const CardFront = ({ userId, contap, select }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const currentUserId =
    parseInt(params.userId) === userId ? parseInt(params.userId) : userId;
  console.log('파람 유저 아이디 =====>', params.userId);

  const front = useSelector((state) =>
    contap ? state.taps.byId : state.cards.byId,
  );

  const isLogin = useSelector((state) => state.user.isAuthorized);
  const token = getToken();

  const [showModal, setShowMadal] = React.useState(
    parseInt(params.userId) === currentUserId ? true : false,
  );

  const [sideModal, setSideModal] = React.useState(false);

  // Modal Handler
  const showCardBackModal = async () => {
    if (!isLogin || !token) {
      const {dismiss, isConfirmed,isDismissed } = await LoginAlert.fire({
        title: (
          <>
            <LoginAlertSvg />
            <div style={{ marginTop: '32px', marginBottom: '16px' }}>
              <Text bold24>회원이신가요?</Text>
            </div>
            <Text regular16>로그인을 먼저 해주세요</Text>
          </>
        ),
      });
      if (dismiss === 'backdrop') {
        return;
      }
      if (isConfirmed) {
        history.push('/login');
      } else if (isDismissed) {
        history.push('/signup');
      }
      return null;
    }
    if (!showModal) {
      await dispatch(loadCurrentCardDB(currentUserId));
    }
    setShowMadal(true);
    if (location.pathname === '/') {
      history.push(`/card/${currentUserId}`);
    }
    // await T.POST('/main/posttap', { userId});
  };
  const closeModal = () => {
    if (params.userId !== null && location.pathname !== '/contap') {
      history.push('/');
    }

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

  const stackHashTags = front[currentUserId].hashTags
    ?.split('_')[0]
    ?.split('@')
    .slice(1, 2);
  const interestHashTags = front[currentUserId].hashTags
    ?.split('_')[1]
    ?.split('@')
    .slice(1, 4);

  const cat = category(front[currentUserId].field);
  const color = professionColor(cat);
  const hashColor = professionColor(cat, 70);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <CardForm
      onClick={showCardBackModal}
      color={color}
      category={cat}
      hashColor={hashColor}
    >
      <div onClick={stopPropagation} aria-hidden="true">
        {!contap && showModal && (
          <CardModal
            show={showModal}
            onHide={closeModal}
            userId={currentUserId}
            userName={front[userId].userName}
            profile={front[userId].profile}
            category={cat}
          />
        )}
        {contap && showModal && (
          <ContapModal
            className="contapModal"
            show={showModal}
            onHide={closeModal}
            userCradInfo={front[currentUserId]}
            category={cat}
            select={select}
          >
            <CardFrontContap onModal={handleSideModal} userId={currentUserId} />
          </ContapModal>
        )}
        {sideModal && (
          <CardModal
            show={sideModal}
            onHide={closeSideModal}
            userId={currentUserId}
            userName={front[currentUserId].userName}
            profile={front[currentUserId].profile}
            category={cat}
            contap
          />
        )}
      </div>
      <div style={{ display: 'flex' }}>
        {front[currentUserId].newFriend && select !== 'SendTap' && (
          <NotiBadge className="NotiBadge" />
        )}
        {front[currentUserId].profile ? (
          <ImageBox className="imageBox" src={front[currentUserId].profile} />
        ) : (
          <div className="basicProfile">
            <FrontProfileSvg />
          </div>
        )}
        <div className="userInfo">
          <div className="userName">
            <Text color="#F5F3F8" regular20>
              {front[currentUserId] ? front[currentUserId].userName : null}
            </Text>
          </div>
          <Text color={color} regular20>
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
            stack && (
              <HashTag
                key={idx}
                tag={stack}
                hashColor={hashColor}
                category={cat}
              />
            )
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
  position: relative;
  width: 350px;
  height: 200px;
  border-radius: 16px;
  box-sizing: border-box;
  margin-bottom: 32px;
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
  .basicProfile {
    height: 72px;
    width: 80px;
    margin: 22px;

    border: 1px solid ${ColorStyle.Gray100 + Opacity[25]};
    border-radius: 8px;
  }

  &:hover {
    cursor: pointer;
    border: 3px solid ${({ color }) => color};
    background-color: ${({ category }) =>
      category === '디자이너'
        ? ColorStyle.BackGround100
        : ColorStyle.BackGround300};

    .NotiBadge {
      margin: -2px -2px 0px 0px;
    }

    .imageBox {
      margin: 20px;
    }
    .hash {
      margin: 14px 0px -2px 14px;
      div {
        background-color: ${({ hashColor }) => hashColor};
      }
    }
    .basicProfile {
      margin: 20px;
    }
    .userInfo {
      margin: 30px -2px 0px 2px;
    }

    .interest {
      margin: 2px 0px -2px 20px;
    }
  }
`;

const NotiBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 12px;
  height: 12px;
  border-radius: 20px;
  background-color: ${ColorStyle.Error};
`;

const ImageBox = styled.div`
  height: 72px;
  width: 80px;
  margin: 22px;
  border: 1px solid ${ColorStyle.Gray100 + Opacity[25]};

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid ${ColorStyle.Gray100};
`;

const Hash = styled.div`
  display: flex;
  margin: 12px 0px 0px 16px;
`;
