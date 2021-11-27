import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import T from '../api/tokenInstance';
import {
  ColorStyle,
  Opacity,
  professionColor,
  professionHoverColor,
} from '../utils/systemDesign';
import { Text } from '../elements';
// import { ColorStyle } from '../utils/systemDesign';
import { Toast } from '../utils/alert';
// import { ReactComponent as HandFingerThumb } from '../svgs/HandFingerThumb.svg';

const TapForm = ({ userId, category, onHide, userName }) => {
  const [message, setMessage] = React.useState('');
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const ERROR_BEFORE_SEND = '이미 상대에게 요청을 보낸 상태입니다.';
  const ERROR_BEFORE_FRIEND = '이미 친구 관계입니다.';

  const sendTap = async () => {
    const { data } = await T.POST('/main/posttap', { userId, msg: message });

    if (data.msg === ERROR_BEFORE_SEND) {
      onHide();
      Toast.fire({
        title: '이미 상대에게 요청을 보냈어요!',
      });
      return;
    }
    if (data.msg === ERROR_BEFORE_FRIEND) {
      onHide();
      Toast.fire({
        title: '이미 그랩 되었어요!',
      });
      return;
    }
    onHide();
    Toast.fire({
      title: (
        <Text regular20 color={ColorStyle.Gray500}>
          👏 {userName}님께 탭 성공!
        </Text>
      ),
    });
  };

  // {msg: '이미 상대에게 요청을 보낸 상태입니다.'}
  // {msg: '자신한테 탭요청하지못해요'}

  const color = professionColor(category);
  const hoverColor = professionHoverColor(category);

  return (
    <Wrap>
      <TextAreaWrap>
        <MessageTextarea
          type="text"
          id="textbox"
          value={message}
          maxLength="200"
          onChange={handleChange}
        />
        <div className="checkWords">
          <Text regular16>{message.length} / 200</Text>
        </div>
      </TextAreaWrap>
      <TapButton color={color} hoverColor={hoverColor}>
        <button type="button" onClick={sendTap}>
          <Text
            bold20
            color={
              category === '디자이너'
                ? ColorStyle.BackGround300
                : ColorStyle.Gray500
            }
          >
            Tap!
          </Text>
        </button>
      </TapButton>
    </Wrap>
  );
};

const sideModalOn = keyframes`
  0% {
    top: -300px;
  }
  25% {
    right: -230px;
  }
  50% {
    right: -180px;
    /* right : 600px; */
  }
  75% {
    right: -130px;
    /* right : 600px; */
  }
  100% {
    right: -80px;
    
  }
`;

const Wrap = styled.div`
  position: relative;
  top: -80px;
  left: -2px;
  background-color: ${ColorStyle.BackGround300};
  box-sizing: border-box;
  border: 1px solid ${ColorStyle.Gray100};
  width: 755px;
  height: 270px;
  margin: auto;
  z-index: 0;
  border-radius: 0px 0px 16px 16px;
  display: flex;
  flex-direction: column;
  animation: ${sideModalOn} 0.2s linear alternate;
`;

const TextAreaWrap = styled.div`
  position: relative;
  top: 15px;
  margin: auto 48px;
  height: 120px;
  background-color: red;
  border-radius: 10px;
  background-color: ${ColorStyle.Gray100 + Opacity[15]};

  .checkWords {
    position: relative;
    right: 15px;
    float: right;
  }
`;

const MessageTextarea = styled.textarea`
  overflow: hidden;
  background-color: #ffffff00;
  resize: none;
  padding: 10px;
  min-width: 637px;
  border-radius: 10px;
  min-height: 70px;
  border: 0px;
  :focus {
    outline: none;
  }

  color: ${ColorStyle.Gray500};
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 20px;
  line-height: 23px;
  font-weight: 400;
`;
const TapButton = styled.div`
  margin-right: 48px;
  button {
    position: relative;
    width: 130px;
    height: 44px;
    float: right;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    bottom: 20px;
    background-color: ${({ color }) => color};
    border: 2px solid ${({ color }) => color};
    box-sizing: border-box;
    border-radius: 40px;

    &:hover {
      background-color: ${({ hoverColor }) => hoverColor};
      border: 2px solid ${({ hoverColor }) => hoverColor};
    }
  }
`;

TapForm.propTypes = {
  userId: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default TapForm;
