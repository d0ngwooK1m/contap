// /* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ColorStyle } from '../utils/systemDesign';
import Onboarding2Png from '../assets/image/onboarding2.png';
import SignupComplete from '../components/SignupComplete';
import SignupLastInput from '../components/SignupLastInput';
import EmailCheck from '../components/EmailCheck';
import EmailAuth from '../components/EmailAuth';

const Signup = () => {
  const history = useHistory();
  const isEmailChecked = useSelector((state) => state.user.isEmailChecked);
  const isAuthNumChecked = useSelector((state) => state.user.isAuthNumChecked);
  const isSignupDone = useSelector((state) => state.user.isSignupDone);

  const PageChanger = () => {
    if (isEmailChecked && isAuthNumChecked) {
      return <SignupLastInput />;
    }
    if (!isEmailChecked) {
      return <EmailCheck />;
    }
    return <EmailAuth />;
  };

  return (
    <div>
      {isSignupDone ? (
        <SignupComplete />
      ) : (
        <SignupWrapper>
          <LeftWrapper>
            <LinkToSomeWhere
              onClick={() => {
                history.push('/');
              }}
            />
            <SvgWrapper>
              <img
                alt="onboard2"
                src={Onboarding2Png}
                width="531px"
                height="754px"
              />
            </SvgWrapper>
            {/* <Onboard2Svg /> */}
          </LeftWrapper>
          <RightWrapper>
            <FormWrapper>
              <PageChanger />
            </FormWrapper>
          </RightWrapper>
        </SignupWrapper>
      )}
    </div>
  );
};

const SignupWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  min-width: 1152px;
  background-color: ${ColorStyle.BackGround};
  display: flex;
`;

const LeftWrapper = styled.div`
  width: 50%;
  height: 1080px;
  background: linear-gradient(153.56deg, #8c4dff 0%, rgba(29, 29, 34, 0) 25%);
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
`;

const LinkToSomeWhere = styled.button`
  width: 125px;
  height: 36px;
  position: absolute;
  top: 160px;
  left: 33%;
  cursor: pointer;
  z-index: 1000;
  display: hidden;
`;

const SvgWrapper = styled.div`
  width: 540px;
  height: fit-content;
  position: absolute;
  right: 39px;
  top: 160px;
`;

const RightWrapper = styled.div`
  width: 50%;
  height: 1080px;
  background-color: ${ColorStyle.BackGround};
  color: ${ColorStyle.Gray500};
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.div`
  width: 445px;
`;

export default Signup;
