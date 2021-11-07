/* eslint-disable */
import React from 'react';
// import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { loginToServer, login as loginAction } from '../features/user/actions';
import { saveToken } from '../utils/auth';
import {
  LoginWrapper,
  LeftWrapper,
  RightWrapper,
  Title,
  StyledInput,
  SubmitInput,
  DivideWrapper,
  DivideLine,
  DivideContent,
  KakaoButton,
  WarningText,
} from '../utils/styledLoginSign';
import { ReactComponent as Onboard1Svg } from '../svgs/onboarding1.svg';
import { ReactComponent as KakaoLogoSvg } from '../svgs/KakaoLogo.svg';

const Login = () => {
  const baseURL = process.env.REACT_APP_SERVER_URI;
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  console.log('로케이션 ====> ', location.search);
  React.useEffect(() => {
    if (!location.search) {
      return null;
    }
    const query = location.search;
    const code = query.split('=')[1];
    // console.log(code);
    // let code = new URL(window.location.href).searchParams.get("code");
    console.log(code);

    async function handleKakaoLogin() {
      try {
        const a = await axios({
          method: 'GET',
          url: `${baseURL}/user/github?code=${code}`,
        });
        console.log(a);
        saveToken(data.token);
        await dispatch(
          loginAction({ email: data.email, userName: data.userName }),
        );
        history.replace('/');
      } catch (error) {
        console.error(error);
      }
    }
    return handleKakaoLogin();
  }, []);

  return (
    <LoginWrapper>
      <LeftWrapper>
        <Onboard1Svg />
      </LeftWrapper>
      <RightWrapper>
        <div>
          <Title>로그인</Title>
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
              이메일
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
              window.location.href = `${process.env.REACT_APP_KAKAO_PATH}`;
            }}
          >
            <KakaoLogoSvg />
            카카오 로그인
          </KakaoButton>
          <button
            onClick={() => {
              console.log(process.env.REACT_APP_GITHUB_PATH);
              window.location.href = `${process.env.REACT_APP_GITHUB_PATH}`;
            }}
          >
            깃허브 로그인
          </button>
        </div>
      </RightWrapper>
    </LoginWrapper>
  );
};

export default Login;
