import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import { useHistory } from 'react-router';
import { BasicAlert } from '../utils/alert';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  ColorStyle,
  professionColor,
  professionHoverColor,
} from '../utils/systemDesign';
import { Text } from '../elements';
import {
  removeReceiveTapToAxios,
  removeGrabToAxios,
} from '../features/taps/actions';
import {
  closeNoneTalkRoomList,
  loadCurrentRoom,
} from '../features/chat/actions';
import { setTapAcceptNoti } from '../features/notice/actions';

const ContapModal = ({
  show,
  onHide,
  children,
  userCradInfo,
  category,
  select,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myName = useSelector((state) => state.user.userName);
  console.log(userCradInfo);
  console.log(select);
  // tap 수락 거절
  const rejectTap = async () => {
    dispatch(
      removeReceiveTapToAxios(
        'reject',
        { tagId: userCradInfo.tapId },
        userCradInfo.userId,
      ),
    );
    console.log('거절');
    onHide();
  };

  const acceptTap = async () => {
    dispatch(
      removeReceiveTapToAxios(
        'accept',
        { tagId: userCradInfo.tapId },
        userCradInfo.userId,
      ),
    );
    dispatch(setTapAcceptNoti(true));
    console.log('수락');
    onHide();
  };

  const openGrabTalk = async () => {
    await dispatch(closeNoneTalkRoomList());
    await dispatch(loadCurrentRoom(userCradInfo));
    history.replace('/grabtalk');
  };

  const color = professionColor(category);
  const hoverColor = professionHoverColor(category);

  const unGrab = async () => {
    onHide();
    const { isConfirmed } = await BasicAlert.fire({
      title: (
        <div style={{ textAlign: 'left' }}>
          <div style={{ marginTop: '5px' }}>
            <Text bold32 color={ColorStyle.Gray500}>
              {userCradInfo.userName}님과 그랩을 끊을까요?
            </Text>
          </div>
          <div style={{ marginTop: '48px' }}>
            <Text regular16 color={ColorStyle.Gray300}>
              그랩을 끊어도 <br />
              상대방에게 알림이 가지 않아요
            </Text>
          </div>
        </div>
      ),
    });
    if (isConfirmed) {
      dispatch(removeGrabToAxios(userCradInfo.userId));
    }
  };

  return (
    <div>
      <Modal
        open={show}
        onClose={onHide}
        BackdropProps={{
          style: {
            backgroundColor: '#000000BF',
          },
        }}
      >
        <Wrap>
          <Content select={select}>
            {select === 'ReceiveTap' && (
              <Text className="desc" color="#FFF" bold32>
                <span
                  style={{
                    color: `${color}`,
                  }}
                >
                  {userCradInfo.userName}
                </span>
                님이 Tap!했어요
              </Text>
            )}
            <Card>{children}</Card>
            <hr />
            {select === 'ReceiveTap' && (
              <>
                <Text regular20>To.{myName}님</Text>
                <MessageBox>
                  <Text id="message" regular16>
                    {userCradInfo.msg}
                  </Text>
                </MessageBox>
                <ButtonBox color={color} hoverColor={hoverColor}>
                  <button
                    type="button"
                    className="refusetBtn"
                    onClick={rejectTap}
                  >
                    <Text bold20 color={ColorStyle.Gray500}>
                      거절
                    </Text>
                  </button>
                  <button
                    type="button"
                    className="acceptBtn"
                    onClick={acceptTap}
                  >
                    <Text
                      bold20
                      color={
                        category === '디자이너'
                          ? ColorStyle.BackGround300
                          : ColorStyle.Gray500
                      }
                    >
                      수락
                    </Text>
                  </button>
                </ButtonBox>
              </>
            )}
            {select === 'GrabList' && (
              <>
                <GrabButtonBox color={color} hoverColor={hoverColor}>
                  <button
                    type="button"
                    className="messageBtn"
                    onClick={openGrabTalk}
                  >
                    <Text
                      bold20
                      color={
                        category === '디자이너'
                          ? ColorStyle.BackGround300
                          : ColorStyle.Gray500
                      }
                    >
                      메세지 보내기
                    </Text>
                  </button>
                  <button type="button" className="unGrabBtn" onClick={unGrab}>
                    <Text bold20 color="#FFF">
                      그랩 끊기
                    </Text>
                  </button>
                </GrabButtonBox>
              </>
            )}
          </Content>
        </Wrap>
      </Modal>
    </div>
  );
};

const upDown = keyframes`
  0% {
    right: -600px;
  }
  25% {
    right: -450px;
  }
  50% {
    right: -300px;
    /* right : 600px; */
  }
  75% {
    right: -150px;
    /* right : 600px; */
  }
  100% {
    right: 0px;
    
  }
`;

const Wrap = styled.div`
  width: 610px;
  position: relative;
  right: 0px;
  display: block;
  float: right;
  height: 100vh;
  background-color: ${ColorStyle.BackGround100};
  animation: ${upDown} 0.3s linear alternate;
`;

const Content = styled.div`
  /* background-color: ${ColorStyle.BackGround100}; */
  background-color: ${ColorStyle.BackGround100};
  width: fit-content;
  max-width: 350px;
  margin: ${({ select }) =>
    select === 'GrabList' ? '158px 0px 0px 65px' : '62px 0px 0px 65px'};

  hr {
    margin: 30px 0px;
    border: 1px solid ${ColorStyle.Gray100};
  }
`;

const Card = styled.div`
  margin: 48px 0px 0px 0px;
`;

const MessageBox = styled.div`
  height: 200px;
  margin-top: 30px;
  border: 1px solid ${ColorStyle.Gray100};
  word-break: break-all;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 20px;
`;

const ButtonBox = styled.div`
  margin: 30px 0px 0px 0px;
  display: flex;
  justify-content: space-between;

  button {
    width: 160px;
    height: 50px;
    border-radius: 100px;
    cursor: pointer;
  }

  .acceptBtn {
    background-color: ${({ color }) => color};
    box-sizing: border-box;
    border: 1px solid ${({ color }) => color};
    &:hover {
      background-color: ${({ hoverColor }) => hoverColor};
      border: 2px solid ${({ hoverColor }) => hoverColor};
    }
  }

  .refusetBtn {
    background-color: ${ColorStyle.BackGround100};
    box-sizing: border-box;
    border: 1px solid ${({ color }) => color};
    &:hover {
      background-color: ${ColorStyle.BackGround300};
      border: 2px solid ${({ hoverColor }) => hoverColor};
    }
  }
`;

const GrabButtonBox = styled.div`
  margin: 30px 0px 0px 0px;
  display: flex;
  flex-direction: column;

  button {
    width: 350px;
    height: 50px;
    border-radius: 100px;
    cursor: pointer;
    margin: 0px 0px 22px 0px;
  }

  .messageBtn {
    background-color: ${({ color }) => color};
    border: 2px solid ${({ color }) => color};
    box-sizing: border-box;
    &:hover {
      background-color: ${({ hoverColor }) => hoverColor};
      border: 2px solid ${({ hoverColor }) => hoverColor};
    }
  }

  .unGrabBtn {
    background-color: ${ColorStyle.BackGround100};
    box-sizing: border-box;
    border: 1px solid ${({ color }) => color};
    &:hover {
      background-color: ${ColorStyle.BackGround300};
      border: 2px solid ${({ hoverColor }) => hoverColor};
    }
  }
`;

ContapModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.any,
  userCradInfo: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  select: PropTypes.string,
};

ContapModal.defaultProps = {
  children: false,
  select: null,
};

export default ContapModal;
