/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
// import { stepContentClasses } from '@mui/material';
import axios from 'axios';
import { ColorStyle, FontScale, Opacity, FontFamily } from '../utils/systemDesign';
import {
  backToPrev,
  emailAuth,
  authCheck,
  signupDone,
} from '../features/user/actions';
import { Grid, Input, Button, Text } from '../elements';
import Timer from '../components/Timer';
import { ReactComponent as Onboard2Svg } from '../svgs/onboarding2.svg';
import { ReactComponent as SignImgSvg } from '../svgs/SignupImg.svg';
import { ReactComponent as ExpandDownSvg } from '../svgs/ExpandDown.svg';
import { ReactComponent as ExpandOpenSvg } from '../svgs/ExpandOpen.svg';

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const [isAuth, setIsAuth] = React.useState(false);
  // const [authNum, setAuthNum] = React.useState();
  const [content, setContent] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [certificationNum, setCertificationNum] = React.useState('');
  const [emailDupCheck, setEmailDupCheck] = React.useState(true);
  const [authNumCheck, setAuthNumCheck] = React.useState(true);
  const isEmailChecked = useSelector((state) => state.user.isEmailChecked);
  const isAuthNumChecked = useSelector((state) => state.user.isAuthNumChecked);
  const checkedEmail = useSelector((state) => state.user.checkedEmail);
  const isSignupDone = useSelector((state) => state.user.isSignupDone);
  console.log(isEmailChecked, isAuthNumChecked);

  const baseURL = process.env.REACT_APP_SERVER_URI;

  const sendEmailAuth = async (emailInfo) => {
    try {
      console.log(emailInfo);
      const res = await axios.post(`${baseURL}/email/send`, emailInfo);
      const { data } = res;
      console.log(data);

      if (data.errorMessage === '이미 사용 중인 이메일 입니다.') {
        return setEmailDupCheck(false);
      }

      setEmailDupCheck(true);
      dispatch(emailAuth(emailInfo));

      return data;
    } catch (error) {
      console.log(error);
      return error.Message;
    }
  };

  const sendAuthInfo = async (authInfo) => {
    try {
      console.log(authInfo);
      const res = await axios.post(`${baseURL}/email/confirm`, authInfo);
      const { data } = res;
      console.log('====== 안되는곳',data);

      if (data.errorMessage === '인증번호가 일치하지 않습니다.') {
        return setAuthNumCheck(false);
      }

      setAuthNumCheck(true);
      dispatch(authCheck());
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  const signupToServer = async (signupInfo) => {
    try {
      console.log(baseURL);
      console.log(signupInfo);
      const res = await axios.post(`${baseURL}/user/signup`, signupInfo);
      const { data } = res;
      console.log(data);

      // if (data.result === 'fail') {
      //   console.log(data);
      //   Swal.fire({
      //     icon: 'error',
      //     title: '실패',
      //     text: `${data.errorMessage}`,
      //   });

      // if (data.errorMessage) {
      //   return setSignup(data.errorMessage);
      // }

      if (data.result === 'fail') {
        console.log(data);
        if (data.errorMessage === null) {
          setErrorMessage('잘못된 정보가 있습니다. 다시 확인해주세요.');
        } else {
          setErrorMessage(data.errorMessage);
        }
        return data;
      }

      dispatch(signupDone());

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  return (
    <div>
      {isSignupDone ? (
        <div>
          <GotoLoginWrap>
            <SignImgSvg />
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
      ) : (
        <SignupWrapper>
          <LeftWrapper>
            <Link
              onClick={() => {
                history.push('/');
              }}
            />
            <SvgWrapper>
              <Onboard2Svg />
            </SvgWrapper>
            {/* <Onboard2Svg /> */}
          </LeftWrapper>
          <RightWrapper>
            <FormWrapper>
              {isEmailChecked && isAuthNumChecked ? (
                <div>
                  <Title>
                    <Text color={ColorStyle.Gray500} bold32>
                      회원가입
                    </Text>
                  </Title>
                  <Text color={ColorStyle.Gray500} regular20>
                    <span>{checkedEmail}</span>&nbsp;으로
                    <br /> 컨탭 가입을 진행합니다
                  </Text>
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit(async (info) => {
                      await setErrorMessage('');
                      console.log(info);
                      const signupInfo = {
                        email: checkedEmail,
                        pw: info.pw,
                        pwCheck: info.pwCheck,
                        userName: info.userName,
                      };
                      // await dispatch(signupToServer(signupInfo));
                      signupToServer(signupInfo);
                    })}
                  >
                    <br />
                    <MarginWrapper4>
                      <InputWrapper>
                        <StyledInput
                          type="text"
                          // placeholder="중복되지 않는 닉네임을 입력해주세요"
                          {...register('userName', {
                            required: '닉네임을 입력해주세요',
                          })}
                        />
                        <StyledLabel>
                          {/* <Text color={ColorStyle.Gray300} regular20>
                          
                        </Text> */}
                          닉네임
                        </StyledLabel>
                      </InputWrapper>
                      {errors.userName && (
                        <ErrorMessage>{errors.userName.message}</ErrorMessage>
                      )}
                    </MarginWrapper4>
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
                              message: '비밀번호는 최대 20자입니다',
                            },
                            minLength: {
                              value: 6,
                              message: '비밀번호는 최소 6자 이상입니다',
                            },
                          })}
                        />
                        <StyledLabel>
                          {/* <Text color={ColorStyle.Gray300} regular20>
                          
                        </Text> */}
                          비밀번호
                        </StyledLabel>
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
                                message: '비밀번호는 최대 20자입니다',
                              },
                              minLength: {
                                value: 6,
                                message: '비밀번호는 최소 6자 이상입니다',
                              },
                            })}
                          />
                          <StyledLabel>
                            {/* <Text color={ColorStyle.Gray300} regular20>
                          
                        </Text> */}
                            비밀번호 확인
                          </StyledLabel>
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

                    {/* {console.log(watch('pw').length, watch('pwCheck').length)} */}
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
                    Contap 가입 전에 이메일을 먼저 인증해 주세요
                  </Text>
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit((emailInfo) => {
                      console.log(emailInfo);
                      // await dispatch(sendEmailAuth(emailInfo));
                      sendEmailAuth(emailInfo);
                    })}
                  >
                    <MarginWrapper>
                      <InputWrapper>
                        <StyledInput
                          type="text"
                          // placeholder="이메일을 입력해주세요"
                          {...register('email', {
                            required: '이메일을 입력해주세요',
                            pattern: {
                              value:
                                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                              message: '이메일 양식에 맞지 않습니다',
                            },
                          })}
                        />
                        <StyledLabel>
                          {/* <Text color={ColorStyle.Gray300} regular20>
                            
                          </Text> */}
                          이메일
                        </StyledLabel>
                      </InputWrapper>
                      {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                      )}
                      {!errors.email && !emailDupCheck && (
                        <ErrorMessage>
                          이미 사용 중인 이메일 입니다.
                        </ErrorMessage>
                      )}
                    </MarginWrapper>
                    <br />
                    <SubmitInput type="submit" value="이메일 확인" />
                  </form>
                </div>
              ) : (
                <div>
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
                      // console.log(numInfo);
                      const authInfo = {
                        email: checkedEmail,
                        certificationNumber: certificationNum,
                      };
                      console.log(authInfo);
                      // await dispatch(sendAuthInfo(authInfo));
                      sendAuthInfo(authInfo);
                    })}
                  >
                    <MarginWrapper>
                      <CounterWrapper>
                        {/* <Text color={ColorStyle.Gray500} regular20>
                          <Timer mm={3} ss={0} />        
                        </Text>         */}
                        <Timer mm={3} ss={0} />
                      </CounterWrapper>
                      <RelativeInputWrapper>
                        <InputWrapper>
                          <StyledInput
                            type="text"
                            // placeholder="인증번호를 입력해주세요"
                            {...register('certificationNumber', {
                              required: '인증번호를 입력해주세요',
                              pattern: {
                                value: /^([0-9]{6})$/,
                                message: '인증번호가 올바르지 않습니다.',
                              },
                            })}
                            value={certificationNum}
                            onChange={(e) => {
                              setCertificationNum(e.target.value);
                            }}
                          />
                          <StyledLabel>
                            {/* <Text color={ColorStyle.Gray300} regular20>
                            
                          </Text> */}
                            인증번호
                          </StyledLabel>
                        </InputWrapper>        
                      </RelativeInputWrapper>
                      {errors.certificationNumber && (
                        <ErrorMessage>
                          {errors.certificationNumber.message}
                        </ErrorMessage>
                      )}
                      {!errors.certificationNumber && !authNumCheck && (
                        <ErrorMessage>
                          인증번호가 일치하지 않습니다.
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
                        }}
                      >
                        이메일 다시 보내기
                      </BackToPrevBtn>
                    </MoreContent>
                  )}
                </div>
              )}
            </FormWrapper>
          </RightWrapper>
        </SignupWrapper>
      )}
    </div>
  );
};

const SignupWrapper = styled.div`
  width: 1435px;
  height: 100%;
  display: flex;
`;

const LeftWrapper = styled.div`
  width: 735px;
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
  left: 165px;
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
  width: 700px;
  height: 1080px;
  background-color: ${ColorStyle.BackGround};
  color: ${ColorStyle.Gray500};
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.div`
  width: 445px;
`;

const Title = styled.div`
  margin: 160px 0px 44px 0px;
`;

const CounterWrapper = styled.div`

`;

const RelativeInputWrapper = styled.div`

`;

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
`;

const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const GotoLoginWrap = styled.div`
  width: 510px;
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
  height: 60px;
  color: white;
  font-size: ${FontScale.Body1_20};
  border-radius: 30px;
  background-color: ${ColorStyle.PrimaryPurple};
  border: none;
  cursor: pointer;
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
  width: 100%;
  height: fit-content;
  background-color: ${ColorStyle.BackGround300};
  padding: 30px;
`;

const ErrorMessage = styled.p`
  color: ${ColorStyle.Error};
  margin: 10px 0px;
`;

export default Signup;
