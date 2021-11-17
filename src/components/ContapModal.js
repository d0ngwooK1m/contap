import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { ColorStyle } from '../utils/systemDesign';
import { Text } from '../elements';
import { removeReceiveTapToAxios } from '../features/taps/actions';

const ContapModal = ({
  show,
  onHide,
  children,
  userCradInfo,
  category,
  select,
}) => {
  const dispatch = useDispatch();
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
    console.log('수락');
    onHide();
  };
  return (
    <div>
      <Modal open={show} onClose={onHide}>
        <Wrap>
          <Content>
            {select === 'ReceiveTap' && (
              <Text color="#FFF" bold32>
                <span
                  style={{
                    color: `${
                      category
                        ? ColorStyle.PrimaryPurple
                        : ColorStyle.PrimaryMint
                    }`,
                  }}
                >
                  {userCradInfo.userName}
                </span>
                님이 탭!했어요
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
                <ButtonBox category={category}>
                  <button
                    type="button"
                    className="refusetBtn"
                    onClick={rejectTap}
                  >
                    <Text bold20 color="#FFF">
                      거절
                    </Text>
                  </button>
                  <button
                    type="button"
                    className="acceptBtn"
                    onClick={acceptTap}
                  >
                    <Text bold20 color="#FFF">
                      수락
                    </Text>
                  </button>
                </ButtonBox>
              </>
            )}
          </Content>
        </Wrap>
      </Modal>
    </div>
  );
};

const Wrap = styled.div`
  width: 610px;
  display: block;
  float: right;
  height: 100vh;
  background-color: ${ColorStyle.BackGround100};
`;

const Content = styled.div`
  /* background-color: ${ColorStyle.BackGround100}; */
  background-color: ${ColorStyle.BackGround100};
  width: fit-content;
  max-width: 350px;
  margin: 90px 0px 0px 65px;

  hr {
    margin: 40px 0px;
    border: 1px solid ${ColorStyle.Gray100};
  }
`;

const Card = styled.div`
  margin: 30px 0px 0px 0px;
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
    background-color: ${({ category }) =>
      category ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint};
    box-sizing: border-box;
    border: 1px solid ${ColorStyle.PrimaryPurple};
  }

  .refusetBtn {
    background-color: ${ColorStyle.BackGround100};
    box-sizing: border-box;
    border: 1px solid
      ${({ category }) =>
        category ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint};
  }
`;

ContapModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.any,
  userCradInfo: PropTypes.object.isRequired,
  category: PropTypes.bool.isRequired,
  select: PropTypes.string,
};

ContapModal.defaultProps = {
  children: false,
  select: null,
};

export default ContapModal;
