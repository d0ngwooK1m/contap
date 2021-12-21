// /* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import SignImgPng from '../assets/image/signupimg.png';
import { Text } from '../elements';
import { ColorStyle, FontScale } from '../utils/systemDesign';

const SignupComplete = () => {
  const history = useHistory();

  return (
    <div>
      <GotoLoginWrap>
        <img alt="signup" src={SignImgPng} width="380px" height="380px" />
        <MarginWrapper7>
          <Text color="white" bold48>
            회원가입 완료!
          </Text>
        </MarginWrapper7>
        <MarginWrapper8>
          <Text color="white" bold32>
            환영합니다! <br /> 이제 로그인 해서 Contap을 탐색해보세요
          </Text>
        </MarginWrapper8>
        <GotoLoginBtn
          onClick={() => {
            history.push('/login');
          }}
        >
          로그인하기
        </GotoLoginBtn>
      </GotoLoginWrap>
    </div>
  );
};

const GotoLoginWrap = styled.div`
  width: 530px;
  height: 100vh;
  display: flex;
  margin: auto;
  padding: 150px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MarginWrapper7 = styled.div`
  margin: 72px 0px 40px 0px;
`;

const MarginWrapper8 = styled.div`
  margin: 40px 0px 72px 0px;
`;

const GotoLoginBtn = styled.button`
  width: 100%;
  min-height: 60px;
  flex-shrink: 0;
  color: white;
  font-size: ${FontScale.Body1_20};
  border-radius: 30px;
  background-color: ${ColorStyle.PrimaryPurple};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${ColorStyle.HoverPurple};
    transition: 0.3s;
  }
`;

export default SignupComplete;
