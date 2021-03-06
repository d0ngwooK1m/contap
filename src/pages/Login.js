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
// import { ReactComponent as Onboard1Svg } from '../svgs/onboarding1.svg';
import Onboarding1Png from '../assets/image/onboarding1.png';
// import { ReactComponent as KakaoLogoSvg } from '../svgs/KakaoLogo.svg';
import KakaoLogo from '../svgs/KakaoLogo.png';
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
    // console.log(secondCode);

    if (site === 'kakao') {
      async function handleKakaoLogin() {
        try {
          const { data } = await axios({
            method: 'GET',
            url: `${baseURL}/user/kakao?code=${code}`,
          });
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
      if (data.CHAT !== '0') {
        dispatch(setChatNoti(true));
      }
      if (data.ACCEPT_TAP !== '0' || data.TAP_RECEIVE !== '0') {
        dispatch(setContapNoti(true));
      }
      if (data.result === 'fail') {
        // Swal.fire({
        //   icon: 'error',
        //   title: '????????? ??????',
        //   text: `${data.errorMessage}`,
        // });
        if (data.errorMessage === null) {
          setErrorMessage('????????? ????????? ???????????? ?????? ??????????????????');
        } else if (data.errorMessage === '???????????? ?????? ??????????????????') {
          setEmailError('???????????? ?????? ??????????????????');
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
      dispatch(deleteMyCard(data.userId));
      dispatch(loginAction(userInfo));
      saveToken(data?.token);
      history.push('/');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <LoginWrapper>
      {/* <OverflowWrapper> */}
      <LeftWrapper>
        <Link
          onClick={() => {
            history.push('/');
          }}
        ></Link>
        <SvgWrapper>
          <img src={Onboarding1Png} width="540px" height="759px" />
        </SvgWrapper>
      </LeftWrapper>
      <RightWrapper>
        <div>
          <Title>
            <Text color={ColorStyle.Gray500} bold32>
              ?????????
            </Text>
          </Title>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(async (loginInfo) => {
              await setErrorMessage('');
              // dispatch(loginToServer(loginInfo));
              loginToServer(loginInfo);
            })}
          >
            <InputWrapperEmail>
              {errors.email && (
                <WarningText>{errors.email.message}</WarningText>
              )}
              {!errors.email && emailError !== '' && (
                <WarningText> {emailError}</WarningText>
              )}
              <StyledInput
                type="text"
                // placeholder="???????????? ??????????????????"
                {...register('email', {
                  required: '???????????? ??????????????????',
                  pattern: {
                    value: /^[_A-Za-z0-9-]+(.[_A-Za-z0-9-]+)*@(?:\w+\.)+\w+$/,
                    message: '????????? ????????? ?????? ????????????',
                  },
                })}
              />
              <StyledLabel>?????????</StyledLabel>
            </InputWrapperEmail>
            <br />
            <InputWrapperPw>
              {errors.pw && <WarningText>{errors.pw.message}</WarningText>}
              {!errors.pw && errorMessage !== '' && (
                <WarningText>{errorMessage}</WarningText>
              )}
              <StyledInput
                type="password"
                // placeholder="??????????????? ??????????????????"
                {...register('pw', {
                  required: '??????????????? ??????????????????',
                  maxLength: {
                    value: 20,
                    message: '??????????????? ?????? 20????????????',
                  },
                  minLength: {
                    value: 6,
                    message: '??????????????? ?????? 6??? ???????????????',
                  },
                })}
              />
              <StyledLabel>????????????</StyledLabel>
            </InputWrapperPw>
            <br />
            <div
              style={{
                textAlign: 'center',
              }}
            >
              ?????? ????????? ????????????????{'   '}
              <span
                onClick={() => {
                  history.push('/signup');
                }}
                style={{
                  cursor: 'pointer',
                  color: '#8C4DFF',
                }}
              >
                ??????????????????
              </span>
            </div>
            <SubmitInput type="submit" value="?????????" />
            {/* <SubmitInput type="submit" >
                <Text color='white' regular20>?????????</Text>
              </SubmitInput> */}
          </form>
          <DivideWrapper>
            <DivideLine />
            <DivideContent>??????</DivideContent>
            <DivideLine />
          </DivideWrapper>
          <KakaoButton
            onClick={() => {
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
              {/* <StyledKakaoLogoSvg /> */}
              <img src={KakaoLogo} width="23px" height="21px" />
            </div>
            <Text color="#181600" regular20>
              ???????????? ????????????
            </Text>
          </KakaoButton>
          <GithubButton
            onClick={() => {
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
              Github?????? ????????????
            </Text>
          </GithubButton>
        </div>
      </RightWrapper>
      {/* </OverflowWrapper> */}
    </LoginWrapper>
  );
};

// const StyledKakaoLogoSvg = styled(KakaoLogoSvg)`
//   width: 26px;
//   height: 24px;
// `;

export default Login;
