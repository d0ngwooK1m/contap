/* eslint-disable */
import React from 'react';
// import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ColorStyle, FontScale, Opacity } from '../utils/systemDesign';
import { Text } from '../elements';
import { loginToServer, login as loginAction } from '../features/user/actions';
import { saveToken } from '../utils/auth';
import {
  LoginWrapper,
  LeftWrapper,
  SvgWrapper,
  RightWrapper,
  Title,
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
import { ReactComponent as GithubLogoSvg } from '../svgs/GithubLogo.svg';

const Login = () => {
  const baseURL = process.env.REACT_APP_SERVER_URI;
  const history = useHistory();
  const [login, setLogin] = React.useState('');

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
    const site = firstCode.split('&')[0]
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
            loginAction({ email: data.email, userName: data.userName }),
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
            loginAction({ email: data.email, userName: data.userName }),
          );
          history.replace('/');
        } catch (error) {
          console.error(error);
        }
      }

      handleGithubLogin()
    }

    return 

  }, []);

  return (
    <LoginWrapper>
      <LeftWrapper>
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
            onSubmit={handleSubmit((loginInfo) => {
              console.log(loginInfo);
              dispatch(loginToServer(loginInfo));
            })}
          >
            <label
              style={{
                color: '#4D4759',
              }}
            >
              <span>이메일</span>
              <br />
              <StyledInput
                type="text"
                // placeholder="이메일을 입력해주세요"
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                    message: '이메일 양식에 맞지 않습니다',
                  },
                })}
                style={{
                  margin: '0px 0px 28px 0px',
                }}
              />
            </label>
            {errors.email && <WarningText>{errors.email.message}</WarningText>}
            <br />
            <label
              style={{
                color: '#4D4759',
              }}
            >
              비밀번호
              <br />
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
                style={{
                  margin: '0px 0px 40px 0px',
                }}
              />
            </label>
            {errors.pw && <WarningText>{errors.pw.message}</WarningText>}
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
            <KakaoLogoSvg />
            <Text color="#181600" regular20>
              카카오 로그인
            </Text>
          </KakaoButton>
          <GithubButton
            onClick={() => {
              console.log(process.env.REACT_APP_GITHUB_PATH);
              setLogin('github');
              window.location.href = `${process.env.REACT_APP_GITHUB_PATH}`;

            }}
          >
            <GithubLogoSvg />
            <Text color={ColorStyle.BackGround100} regular20>
              깃허브 로그인
            </Text>
          </GithubButton>
        </div>
      </RightWrapper>
    </LoginWrapper>
  );
};

export default Login;
