import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Text } from '../elements';
import { ColorStyle, FontFamily, FontScale } from '../utils/systemDesign';
import { emailAuth } from '../features/user/actions';

const EmailCheck = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [emailDupCheck, setEmailDupCheck] = React.useState(true);
  // const [emailError, setEmailError] = React.useState('');

  const baseURL = process.env.REACT_APP_SERVER_URI;

  const sendEmailAuth = async (emailInfo) => {
    try {
      // setSendEmail(true);
      // console.log('이메일 들어가는지 확인===>', sendEmail);
      const res = await axios.post(`${baseURL}/email/send`, emailInfo);
      // const { data } = res;

      if (res.data.errorMessage === '존재하는 이메일입니다') {
        setEmailDupCheck(false);
        // setEmailError('존재하는 이메일입니다');
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

  return (
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
                  value: /^([a-z0-9_-]+)@([\da-z-]+)([a-z]{2,6})$/,
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
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          {/* {console.log('결과===>', emailError, emailDupCheck)}     */}
          {!errors.email && !emailDupCheck && (
            <ErrorMessage>존재하는 이메일입니다</ErrorMessage>
          )}
        </MarginWrapper>
        <br />
        <SubmitInput type="submit" value="이메일 확인" />
      </form>
    </div>
  );
};

const Title = styled.div`
  margin: 160px 0px 44px 0px;
`;

const MarginWrapper = styled.div`
  margin: 44px 0px 54px 0px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
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
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${ColorStyle.BackGround} inset !important;
    -webkit-text-fill-color: ${ColorStyle.Gray500} !important;
    /* background-color: ${ColorStyle.BackGround};
   color: ${ColorStyle.Gray500}; */
  }
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

const ErrorMessage = styled.p`
  color: ${ColorStyle.Error};
  margin: 10px 0px;
`;

export default EmailCheck;
