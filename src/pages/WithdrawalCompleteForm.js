/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
// import { useHistory } from 'react-router';
import { ColorStyle } from '../utils/systemDesign';
import { Text } from '../elements';
// import { ReactComponent as WithdrawalSvg } from '../svgs/WithdrawalComplete.svg';
import WithdrawalPng from '../assets/image/WithdrawalComplete.png';

const WithdrawalCompleteForm = () => {
  // const history = useHistory();

  return (
    <Outer>
      <Wrapper>
        <Text color="white" bold32>
          회원탈퇴가 완료되었습니다
        </Text>
        <Text color="white" bold24>
          Contap을 이용해 주셔서 감사합니다
        </Text>
        <img src={WithdrawalPng} width="354px" height="354px" />
        <SubmitBtn
          type="button"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          <Text color="white" regular16>
            메인으로 돌아가기
          </Text>
        </SubmitBtn>
      </Wrapper>
    </Outer>
  );
};

const Outer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    153.56deg,
    #8c4dff 0%,
    rgba(29, 29, 34, 0.5) 30%
  ); ;
`;

const Wrapper = styled.div`
  width: 445px;
  height: 684px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const SubmitBtn = styled.button`
  width: 445px;
  height: 60px;
  border-radius: 30px;
  background-color: ${ColorStyle.PrimaryPurple};
  &:hover {
    background-color: ${ColorStyle.HoverPurple};
    transition: 0.3s;
  }
  border: none;
  cursor: pointer;
`;

export default WithdrawalCompleteForm;
