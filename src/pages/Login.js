/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ColorStyle, FontScale, Opacity } from '../utils/systemDesign';
import { Text } from '../elements';
import { loginToServer, login as loginAction } from '../features/user/actions';
import { deleteMyCard } from '../features/cards/actions';
import { saveToken } from '../utils/auth';
import { setChatNoti, setContapNoti } from '../features/notice/actions';
import {
  LoginWrapper,
  LeftWrapper,
  SvgWrapper,
  Link,
  RightWrapper,
  Title,
  InputWrapperEmail,
  InputWrapperPw,
  StyledLabel,
  StyledInput,
  SubmitInput,
  DivideWrapper,
  DivideLine,
  DivideContent,
  KakaoButton,
  GithubButton,
  WarningText,
} from '../utils/styledLoginSign';
import { ReactComponent as Onboard1Svg } from '../svgs/onboarding1.svg';
import { ReactComponent as KakaoLogoSvg } from '../svgs/KakaoLogo.svg';
import GithubLogoSvg from '../svgs/GithubLogo.svg';
// import KakaoLogoSvg from '../svgs/KakaoLogo.svg';

const Login = () => {
  const baseURL = process.env.REACT_APP_SERVER_URI;
  const history = useHistory();
  const [login, setLogin] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  console.log('로케이션 ====> ', location);
  React.useEffect(() => {
    if (!location.search) {
      return null;
    }
    const query = location.search;
    const firstCode = query.split('?')[1];
    const site = firstCode.split('&')[0];
    const code = firstCode.split('=')[1];
    // console.log(code);
    // let code = new URL(window.location.href).searchParams.get("code");
    console.log(firstCode, site, code);
    // console.log(secondCode);

    if (site === 'kakao') {
      async function handleKakaoLogin() {
        try {
          const { data } = await axios({
            method: 'GET',
            url: `${baseURL}/user/kakao?code=${code}`,
          });
          console.log('kakaologin');
          saveToken(data.token);
          await dispatch(
            loginAction({
              email: data.email,
              userName: data.userName,
              profile: data.profile,
            }),
          );
          history.replace('/');
        } catch (error) {
          console.error(error);
        }
      }

      handleKakaoLogin();
    }
    if (site === 'github') {
      async function handleGithubLogin() {
        try {
          const { data } = await axios({
            method: 'GET',
            url: `${baseURL}/user/github?code=${code}`,
          });
          console.log('githublogin');
          console.log(data);
          saveToken(data.token);
          await dispatch(
            loginAction({
              email: data.email,
              userName: data.userName,
              profile: data.profile,
            }),
          );
          history.replace('/');
        } catch (error) {
          console.error(error);
        }
      }

      handleGithubLogin();
    }

    return;
  }, []);

  const loginToServer = async (loginInfo) => {
    try {
      const res = await axios.post(`${baseURL}/user/login`, loginInfo);
      const { data } = res;
      console.log('로그인 res =====>', res);
      console.log('로그인 data =====>', data.CHAT);
      if (data.CHAT !== '0') {
        dispatch(setChatNoti(true));
      }
      if (data.ACCEPT_TAP !== '0' || data.TAP_RECEIVE !== '0') {
        dispatch(setContapNoti(true));
      }
      if (data.result === 'fail') {
        console.log(data);
        // Swal.fire({
        //   icon: 'error',
        //   title: '로그인 실패',
        //   text: `${data.errorMessage}`,
        // });
        if (data.errorMessage === null) {
          setErrorMessage('잘못된 정보가 있습니다 다시 확인해주세요')
        } else if (data.errorMessage === '존재하지 않는 이메일입니다') {
          setEmailError('존재하지 않는 이메일입니다');
        } else {
          setEmailError('');
          setErrorMessage(data.errorMessage);
        }
        return data;
      }

      // console.log(data);
      const userInfo = {
        email: data.email,
        userName: data.userName,
        profile: data.profile,
      };
      console.log(data)
      dispatch(deleteMyCard(data.userId))
      dispatch(loginAction(userInfo));
      saveToken(data?.token);
      history.push('/');
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  return (
    <LoginWrapper>
      <LeftWrapper>
        <Link
          onClick={() => {
            history.push('/');
          }}
        ></Link>
        <SvgWrapper>
          <Onboard1Svg />
        </SvgWrapper>
      </LeftWrapper>
      <RightWrapper>
        <div>
          <Title>
            <Text color={ColorStyle.Gray500} bold32>
              로그인
            </Text>
          </Title>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(async (loginInfo) => {
              await setErrorMessage('');
              console.log(loginInfo);
              // dispatch(loginToServer(loginInfo));
              loginToServer(loginInfo);
            })}
          >
            <InputWrapperEmail>
              {errors.email && <WarningText>{errors.email.message}</WarningText>}
              {!errors.email && emailError !== ''  && <WarningText> { emailError }</WarningText>}
              <StyledInput
                type="text"
                // placeholder="이메일을 입력해주세요"
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[_A-Za-z0-9-]+(.[_A-Za-z0-9-]+)*@(?:\w+\.)+\w+$/,
                    message: '이메일 양식에 맞지 않습니다',
                  },
                })}
              />
              <StyledLabel>이메일</StyledLabel>
            </InputWrapperEmail>
            <br />
            <InputWrapperPw>
              {errors.pw && <WarningText>{errors.pw.message}</WarningText>}
              {!errors.pw && errorMessage !== '' && <WarningText>{errorMessage}</WarningText>}
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
              <StyledLabel>비밀번호</StyledLabel>
            </InputWrapperPw>
            <br />
            <div
              style={{
                textAlign: 'center',
              }}
            >
              혹시 회원이 아니신가요?{'   '}
              <span
                onClick={() => {
                  history.push('/signup');
                }}
                style={{
                  cursor: 'pointer',
                  color: '#8C4DFF',
                }}
              >
                회원가입하기
              </span>
            </div>
            <SubmitInput type="submit" value="로그인" />
            {/* <SubmitInput type="submit" >
              <Text color='white' regular20>로그인</Text>
            </SubmitInput> */}
          </form>
          <DivideWrapper>
            <DivideLine />
            <DivideContent>또는</DivideContent>
            <DivideLine />
          </DivideWrapper>
          <KakaoButton
            onClick={() => {
              console.log(process.env.REACT_APP_KAKAO_PATH);
              setLogin('kakao');
              window.location.href = `${process.env.REACT_APP_KAKAO_PATH}`;
            }}
          >
            <div
              style={{
                marginRight: '16px',
                marginTop: '10px',
              }}
            >
              <StyledKakaoLogoSvg />
            </div>
            <Text color="#181600" regular20>
              카카오로 시작하기
            </Text>
          </KakaoButton>
          <GithubButton
            onClick={() => {
              console.log(process.env.REACT_APP_GITHUB_PATH);
              setLogin('github');
              window.location.href = `${process.env.REACT_APP_GITHUB_PATH}`;
            }}
          >
            <div
              style={{
                marginRight: '16px',
                marginTop: '5px',
              }}
            >
              <img src={GithubLogoSvg} />
            </div>
            <Text color={ColorStyle.BackGround100} regular20>
              Github으로 시작하기
            </Text>
          </GithubButton>
        </div>
      </RightWrapper>
    </LoginWrapper>
  );
};

const StyledKakaoLogoSvg = styled(KakaoLogoSvg)`
  width: 26px;
  height: 24px;
`;

export default Login;
