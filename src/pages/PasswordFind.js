/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

import { ColorStyle, FontScale, FontFamily } from '../utils/systemDesign';

import {
  backToPrev,
  emailAuth,
  authCheck,
  passwordCheck,
} from '../features/user/actions';

import Onboarding2Png from '../assets/image/onboarding2.png';
import SignImgPng from '../assets/image/signupimg.png';
import { ReactComponent as ExpandDownSvg } from '../svgs/ExpandDown.svg';
import { ReactComponent as ExpandOpenSvg } from '../svgs/ExpandOpen.svg';
import Timer from '../components/Timer';
import { Grid, Input, Button, Text } from '../elements';

const PasswordFind = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [authNumCheck, setAuthNumCheck] = React.useState(true);
  const [certificationNum, setCertificationNum] = React.useState('');
  const [emailDupCheck, setEmailDupCheck] = React.useState(true);
  const [reset, setReset] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [content, setContent] = React.useState(false);
  const isEmailChecked = useSelector((state) => state.user.isEmailChecked);
  const isAuthNumChecked = useSelector((state) => state.user.isAuthNumChecked);
  const checkedEmail = useSelector((state) => state.user.checkedEmail);
  const isPwcheckDone = useSelector((state) => state.user.isPwcheckDone);

  const baseURL = process.env.REACT_APP_SERVER_URI;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const sendEmailAuth = async (emailInfo) => {
    try {
      const res = await axios.post(`${baseURL}/email/send/password`, emailInfo);

      if (res.data.errorMessage === '존재하는 이메일입니다') {
        setEmailDupCheck(false);
        setEmailError('존재하는 이메일입니다');
      }

      if (res.data.result === 'success') {
        setEmailDupCheck(true);
        dispatch(emailAuth(emailInfo));
      }

      return res.data;
    } catch (error) {
      console.error(error);
      return error.Message;
    }
  };

  const pwcheckToServer = async (pwCheckInfo) => {
    try {
      const res = await axios.post(`${baseURL}/find/password`, pwCheckInfo);
      const { data } = res;

      if (data.result === 'fail') {
        if (data.errorMessage === null) {
          setErrorMessage('잘못된 정보가 있습니다');
        } else if (data.errorMessage === '비밀번호가 맞지 않습니다') {
          setErrorMessage('비밀번호가 일치하지 않습니다');
        } else {
          setErrorMessage(data.errorMessage);
        }
        return data;
      }

      dispatch(passwordCheck());

      return data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  const sendAuthInfo = async (authInfo) => {
    try {
      const res = await axios.post(`${baseURL}/email/confirm`, authInfo);
      const { data } = res;

      if (data.errorMessage === '인증번호가 일치하지 않습니다') {
        return setAuthNumCheck(false);
      }

      setAuthNumCheck(true);
      dispatch(authCheck());
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  return (
    <div>
      {isPwcheckDone ? (
        <div>
          <GotoLoginWrap>
            <img src={SignImgPng} width="380px" height="380px" />
            <MarginWrapper7>
              <Text color="white" bold48>
                비밀번호 찾기 완료!
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
      ) : (
        <SignupWrapper>
          <LeftWrapper>
            <Link
              onClick={() => {
                history.push('/');
              }}
            />
            <SvgWrapper>
              <img src={Onboarding2Png} width="531px" height="754px" />
            </SvgWrapper>
          </LeftWrapper>
          <RightWrapper>
            <FormWrapper>
              {isEmailChecked && isAuthNumChecked ? (
                <div>
                  <Title>
                    <Text color={ColorStyle.Gray500} bold32>
                      비밀번호 찾기
                    </Text>
                  </Title>
                  <Text color={ColorStyle.Gray500} regular20>
                    <span>{checkedEmail}</span>&nbsp;으로
                    <br /> 비밀번호 찾기를 진행합니다
                  </Text>
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit(async (info) => {
                      await setErrorMessage('');
                      const pwCheckInfo = {
                        email: checkedEmail,
                        newPw: info.pw,
                        newPwCheck: info.pwCheck,
                      };
                      pwcheckToServer(pwCheckInfo);
                    })}
                  >
                    <br />

                    <MarginWrapper5>
                      <InputWrapper>
                        <StyledInput
                          type="password"
                          placeholder="6자리 이상으로 입력해 주세요"
                          {...register('pw', {
                            required: '비밀번호를 입력해주세요',
                            maxLength: {
                              value: 20,
                              message: '비밀번호는 6~20자리로 해주세요',
                            },
                            minLength: {
                              value: 6,
                              message: '비밀번호는 6~20자리로 해주세요',
                            },
                          })}
                        />
                        <StyledLabel>새로운 비밀번호 설정</StyledLabel>
                      </InputWrapper>
                      {errors.pw && (
                        <ErrorMessage>{errors.pw.message}</ErrorMessage>
                      )}
                    </MarginWrapper5>

                    <br />
                    {watch('pw') !== undefined && watch('pw')?.length >= 6 && (
                      <div>
                        <InputWrapper>
                          <StyledInput
                            type="password"
                            placeholder="비밀번호를 한 번 더 입력해 주세요"
                            {...register('pwCheck', {
                              required: '비밀번호를 입력해주세요',
                              maxLength: {
                                value: 20,
                                message: '비밀번호는 6~20자리로 해주세요',
                              },
                              minLength: {
                                value: 6,
                                message: '비밀번호는 6~20자리로 해주세요',
                              },
                            })}
                          />
                          <StyledLabel>새로운 비밀번호 확인</StyledLabel>
                        </InputWrapper>
                        {errors.pwCheck && (
                          <ErrorMessage>{errors.pwCheck.message}</ErrorMessage>
                        )}
                        {!errors.userName &&
                          !errors.pw &&
                          !errors.pwCheck &&
                          errorMessage !== '' && (
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                          )}
                      </div>
                    )}

                    {watch('pw')?.length >= 6 &&
                    watch('pwCheck')?.length < 6 ? (
                      <MarginWrapper6>
                        <NotWorkingInput type="submit" readOnly value="다음" />
                      </MarginWrapper6>
                    ) : watch('pw')?.length >= 6 &&
                      watch('pwCheck')?.length >= 6 ? (
                      <MarginWrapper6>
                        <SubmitInput type="submit" value="다음" />
                      </MarginWrapper6>
                    ) : null}
                  </form>
                </div>
              ) : !isEmailChecked ? (
                <div>
                  <Title>
                    <Text color={ColorStyle.Gray500} bold32>
                      이메일 인증
                    </Text>
                  </Title>
                  <Text color={ColorStyle.Gray500} regular20>
                    반갑습니다!
                    <br />
                    비밀번호 찾기를 위해 이메일을 먼저 인증해 주세요
                  </Text>
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit((emailInfo) => {
                      sendEmailAuth(emailInfo);
                    })}
                  >
                    <MarginWrapper>
                      <InputWrapper>
                        <StyledInput
                          type="text"
                          {...register('email', {
                            required: '이메일을 입력해주세요',
                            pattern: {
                              value:
                                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                              message: '이메일 양식에 맞지 않습니다',
                            },
                          })}
                        />
                        <StyledLabel>이메일</StyledLabel>
                      </InputWrapper>
                      {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                      )}
                    </MarginWrapper>
                    <br />
                    <SubmitInput type="submit" value="이메일 확인" />
                  </form>
                </div>
              ) : (
                <EmailAuthWrapper>
                  <Title>
                    <Text color={ColorStyle.Gray500} bold32>
                      이메일 인증
                    </Text>
                  </Title>
                  <Text color={ColorStyle.Gray500} regular20>
                    <span>{checkedEmail}</span>&nbsp;으로
                    <br />
                    메일 발송 후 도착까지 시간이 걸릴 수 있어요
                  </Text>

                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit(() => {
                      const authInfo = {
                        email: checkedEmail,
                        certificationNumber: certificationNum,
                      };
                      sendAuthInfo(authInfo);
                    })}
                  >
                    <MarginWrapper>
                      <CounterWrapper>
                        <Timer mm={3} ss={0} reset={reset} />
                      </CounterWrapper>
                      <RelativeInputWrapper>
                        <InputWrapper>
                          <StyledInput
                            type="text"
                            {...register('certificationNumber', {
                              required: '인증번호를 입력해주세요',
                              pattern: {
                                value: /^([0-9]{6})$/,
                                message: '인증번호가 올바르지 않습니다',
                              },
                            })}
                            value={certificationNum}
                            onChange={(e) => {
                              setCertificationNum(e.target.value);
                            }}
                          />
                          <StyledLabel>인증번호</StyledLabel>
                        </InputWrapper>
                      </RelativeInputWrapper>
                      {errors.certificationNumber && (
                        <ErrorMessage>
                          {errors.certificationNumber.message}
                        </ErrorMessage>
                      )}
                      {!errors.certificationNumber && !authNumCheck && (
                        <ErrorMessage>
                          인증번호가 일치하지 않습니다
                        </ErrorMessage>
                      )}
                    </MarginWrapper>
                    <MarginWrapper2>
                      <SubmitInput type="submit" value="인증번호 확인하기" />
                    </MarginWrapper2>
                    <BackToPrevBtn
                      onClick={async () => {
                        await dispatch(backToPrev());
                      }}
                    >
                      돌아가기
                    </BackToPrevBtn>
                  </form>
                  <MoreWrapper
                    onClick={() => {
                      if (content) {
                        setContent(false);
                      } else {
                        setContent(true);
                      }
                    }}
                  >
                    {!content ? (
                      <EmailWrapper>
                        <div
                          style={{
                            marginRight: '10px',
                          }}
                        >
                          <ExpandDownSvg />
                        </div>
                        <Text color={ColorStyle.Gray300} regular16>
                          이메일을 받지 못하셨나요?
                        </Text>
                      </EmailWrapper>
                    ) : (
                      <EmailWrapper>
                        <div
                          style={{
                            marginRight: '10px',
                          }}
                        >
                          <ExpandOpenSvg />
                        </div>
                        <Text color={ColorStyle.Gray300} regular16>
                          이메일을 받지 못하셨나요?
                        </Text>
                      </EmailWrapper>
                    )}
                  </MoreWrapper>
                  {content && (
                    <MoreContent>
                      <Text color={ColorStyle.Gray500} regular16>
                        1. 발송된 이메일은 3분 동안 유효해요.
                        <br />
                        메일이 도착할때 까지 약간의 시간이 걸릴수도 있어요
                        <br />
                        2. 혹시 스팸메일함을 확인해보셨나요?
                      </Text>
                      <MarginWrapper3>
                        <Text color={ColorStyle.Gray500} regular16>
                          그래도 받지 못하셨다면
                          <br />
                          이메일 다시 보내기를 요청해주세요
                        </Text>
                      </MarginWrapper3>
                      <BackToPrevBtn
                        onClick={() => {
                          const emailInfo = {
                            email: checkedEmail,
                          };
                          sendEmailAuth(emailInfo);
                          if (reset) {
                            setReset(false);
                          } else {
                            setReset(true);
                          }
                        }}
                      >
                        이메일 다시 보내기
                      </BackToPrevBtn>
                    </MoreContent>
                  )}
                </EmailAuthWrapper>
              )}
            </FormWrapper>
          </RightWrapper>
        </SignupWrapper>
      )}
    </div>
  );
};

export default PasswordFind;

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

const Link = styled.div`
  width: 125px;
  height: 36px;
  position: absolute;
  top: 160px;
  left: 33%;
  cursor: pointer;
  z-index: 1000;
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

const EmailAuthWrapper = styled.div`
  position: relative;
`;

const Title = styled.div`
  margin: 160px 0px 44px 0px;
`;

const CounterWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 200px;
`;

const RelativeInputWrapper = styled.div``;

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround};
  border-bottom: 1px solid ${ColorStyle.Gray300};
  font-size: 16px;
  font-family: ${FontFamily};
  border-right: none;
  border-top: none;
  border-left: none;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${ColorStyle.PrimaryPurple};
    + label {
      color: ${ColorStyle.PrimaryPurple};
    }
  }
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${ColorStyle.BackGround} inset !important;
    -webkit-text-fill-color: ${ColorStyle.Gray500} !important;
  }
`;

const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
`;

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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const StyledLabel = styled.label`
  color: ${ColorStyle.Gray300};
`;

const SubmitInput = styled.input`
  width: 100%;
  height: 60px;
  color: white;
  font-family: ${FontFamily};
  font-size: ${FontScale.Body1_20};
  font-weight: bold;
  border-radius: 30px;
  background-color: ${ColorStyle.PrimaryPurple};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${ColorStyle.HoverPurple};
    transition: 0.3s;
  }
`;

const NotWorkingInput = styled.input`
  width: 100%;
  height: 60px;
  color: white;
  font-family: ${FontFamily};
  font-size: ${FontScale.Body1_20};
  font-weight: bold;
  border-radius: 30px;
  background-color: ${ColorStyle.Gray300};
  border: none;
`;

const BackToPrevBtn = styled.button`
  width: 100%;
  height: 60px;
  color: white;
  font-family: ${FontFamily};
  font-size: ${FontScale.Body1_20};
  font-weight: bold;
  border-radius: 30px;
  background-color: ${ColorStyle.BackGround};
  border: 1px solid ${ColorStyle.PrimaryPurple};
  cursor: pointer;
  &:hover {
    background-color: ${ColorStyle.BackGround300};
    transition: 0.3s;
  }
`;

const MarginWrapper = styled.div`
  margin: 44px 0px 54px 0px;
`;

const MarginWrapper2 = styled.div`
  margin: 0px 0px 16px 0px;
`;
const MarginWrapper3 = styled.div`
  margin: 32px 0px 40px 0px;
`;

const MarginWrapper4 = styled.div`
  margin: 44px 0px 0px 0px;
`;

const MarginWrapper5 = styled.div`
  margin: 28px 0px 28px 0px;
`;

const MarginWrapper6 = styled.div`
  margin: 60px 0px 0px 0px;
`;

const MarginWrapper7 = styled.div`
  margin: 72px 0px 40px 0px;
`;

const MarginWrapper8 = styled.div`
  margin: 40px 0px 72px 0px;
`;

const MoreWrapper = styled.div`
  margin: 72px 0px 16px 0px;
  cursor: pointer;
`;

const MoreContent = styled.div`
  width: 90%;
  height: fit-content;
  background-color: ${ColorStyle.BackGround300};
  padding: 30px;
`;

const ErrorMessage = styled.p`
  color: ${ColorStyle.Error};
  margin: 10px 0px;
`;
