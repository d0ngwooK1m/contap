/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { stepContentClasses } from '@mui/material';
import { ColorStyle, FontScale, Opacity } from '../utils/systemDesign';
import {
  signupToServer,
  sendEmailAuth,
  sendAuthInfo,
  backToPrev,
} from '../features/user/actions';
import { Grid, Input, Button, Text } from '../elements';
import { ReactComponent as Onboard2Svg } from '../svgs/onboarding2.svg';
import {ReactComponent as SignImgSvg} from '../svgs/SignupImg.svg'

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = React.useState(false);
  const [authNum, setAuthNum] = React.useState();
  const [content, setContent] = React.useState(false);
  const [certificationNum, setCertificationNum] = React.useState('');
  const isEmailChecked = useSelector((state) => state.user.isEmailChecked);
  const isAuthNumChecked = useSelector((state) => state.user.isAuthNumChecked);
  const checkedEmail = useSelector((state) => state.user.checkedEmail);
  const isSignupDone = useSelector((state) => state.user.isSignupDone);
  console.log(isEmailChecked, isAuthNumChecked);

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
            <Text color='white' bold48>회원가입 완료</Text>
            </MarginWrapper7>
            <MarginWrapper8>
            <Text color='white' bold32>환영합니다! <br/> 이제 로그인 해서 컨탭을 탐색해보세요</Text>
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
            <Onboard2Svg />
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
                    <span>{checkedEmail}</span>으로
                    <br /> 컨탭 회원가입을 진행합니다.
                  </Text>
                  <form
                    onSubmit={handleSubmit(async (info) => {
                      console.log(info);
                      const signupInfo = {
                        email: checkedEmail,
                        pw: info.pw,
                        pwCheck: info.pwCheck,
                        userName: info.userName,
                      };
                      await dispatch(signupToServer(signupInfo));
                    })}
                  >
                    <br />
                    <MarginWrapper4>
                      <label>
                        <Text color={ColorStyle.Gray300} regular20>
                          이름
                        </Text>
                        <StyledInput
                          type="text"
                          // placeholder="닉네임을 입력해주세요"
                          {...register('userName', {
                            required: '닉네임을 입력해주세요',
                          })}
                        />
                        {errors.userName && (
                          <ErrorMessage>{errors.userName.message}</ErrorMessage>
                        )}
                      </label>
                    </MarginWrapper4>
                    <br />
                    <MarginWrapper5>
                      <label>
                        <Text color={ColorStyle.Gray300} regular20>
                          비밀번호
                        </Text>
                        <StyledInput
                          type="password"
                          // placeholder="비밀번호를 입력해주세요"
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
                        {errors.pw && (
                          <ErrorMessage>{errors.pw.message}</ErrorMessage>
                        )}
                      </label>
                    </MarginWrapper5>

                    <br />
                    {watch('pw') !== undefined && watch('pw')?.length >= 6 && (
                      <label>
                        <Text color={ColorStyle.Gray300} regular20>
                          비밀번호 확인
                        </Text>
                        <StyledInput
                          type="password"
                          // placeholder="비밀번호를 확인해주세요"
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
                        {errors.pwCheck && (
                          <ErrorMessage>{errors.pwCheck.message}</ErrorMessage>
                        )}
                      </label>
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
                  <Text color={ColorStyle.Gray500} bold20>
                    반갑습니다!
                    <br />
                    회원가입 전에 이메일 인증을 해야합니당.
                  </Text>
                  <form
                    onSubmit={handleSubmit(async (emailInfo) => {
                      console.log(emailInfo);
                      await dispatch(sendEmailAuth(emailInfo));
                    })}
                  >
                    <MarginWrapper>
                      <label>
                        <Text color={ColorStyle.Gray300} regular20>
                          이메일
                        </Text>
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
                      </label>
                      {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
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
                  <Text color={ColorStyle.Gray500} bold20>
                    반갑습니다!
                    <br />
                    회원가입 전에 이메일 인증을 해야합니당.
                    <br />
                    현재 인증번호를 보낸 메일: <span>{checkedEmail}</span>
                  </Text>

                  <form
                    onSubmit={handleSubmit(async () => {
                      // console.log(numInfo);
                      const authInfo = {
                        email: checkedEmail,
                        certificationNumber: certificationNum,
                      };
                      console.log(authInfo);
                      await dispatch(sendAuthInfo(authInfo));
                    })}
                  >
                    <MarginWrapper>
                      <label>
                        <Text color={ColorStyle.Gray300} regular20>
                          인증번호
                        </Text>
                        <StyledInput
                          type="text"
                          // placeholder="인증번호를 입력해주세요"
                          {...register('certificationNumber', {
                            required: '인증번호를 입력해주세요',
                            pattern: {
                              value:
                                /^([0-9]{6})$/,
                              message: '인증번호가 올바르지 않습니다.',
                            },
                          })}
                          value={certificationNum}
                          onChange={(e) => {
                            setCertificationNum(e.target.value);
                          }}
                        />
                        {errors.certificationNumber && (
                          <ErrorMessage>
                            {errors.certificationNumber.message}
                          </ErrorMessage>
                        )}
                      </label>
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
                    <Text color={ColorStyle.Gray300} regular16>
                      인증번호가 오지 않나요?
                    </Text>
                  </MoreWrapper>
                  {content && (
                    <MoreContent>
                      <Text color={ColorStyle.Gray500} regular14>
                        1. 발송된 이메일은 3분 동안 유효해요.
                        <br />
                        2. 메일이 도착할때 까지 약간의 시간이 걸릴수도 있어요
                      </Text>
                      <MarginWrapper3>
                        <Text color={ColorStyle.Gray500} regular14>
                          그래도 못받았다면 이메일 다시 보내기를 요청해주세요
                        </Text>
                      </MarginWrapper3>
                      <BackToPrevBtn
                        onClick={() => {
                          const emailInfo = {
                            email: checkedEmail,
                          };
                          dispatch(sendEmailAuth(emailInfo));
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
  width: 100%;
  height: 100%;
  display: flex;
`;

const LeftWrapper = styled.div`
  width: 50%;
  height: 1080px;
  background-color: ${ColorStyle.BackGround100};
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

const Title = styled.div`
  margin: 160px 0px 64px 0px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround};
  border-bottom: 1px solid ${ColorStyle.Gray100};
  border-right: none;
  border-top: none;
  border-left: none;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${ColorStyle.PrimaryPurple};
  }
`;

const GotoLoginWrap = styled.div`
  width: 510px;
  height: 100vh;
  display: flex;
  margin: auto;
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

const SubmitInput = styled.input`
  width: 100%;
  height: 60px;
  color: white;
  font-size: ${FontScale.Body1_20};
  border-radius: 30px;
  background-color: ${ColorStyle.PrimaryPurple};
  border: none;
  cursor: pointer;
`;

const NotWorkingInput = styled.input`
  width: 100%;
  height: 60px;
  color: white;
  font-size: ${FontScale.Body1_20};
  border-radius: 30px;
  background-color: ${ColorStyle.BackGround300};
  border: none;
  cursor: pointer;
`;

const BackToPrevBtn = styled.button`
  width: 100%;
  height: 60px;
  color: white;
  font-size: ${FontScale.Body1_20};
  border-radius: 30px;
  background-color: ${ColorStyle.BackGround300};
  border: 1px solid ${ColorStyle.PrimaryPurple};
  cursor: pointer;
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
  height: 276px;
  background-color: ${ColorStyle.BackGround300};
  padding: 30px;
`;

const ErrorMessage = styled.p`
  color: ${ColorStyle.Error};
  margin: 10px 0px;
`;

export default Signup;
