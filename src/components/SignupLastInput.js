// /* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Text } from '../elements';
import { ColorStyle, FontFamily, FontScale } from '../utils/systemDesign';
import { signupDone } from '../features/user/actions';

const SignupLastInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const dispatch = useDispatch();
  const checkedEmail = useSelector((state) => state.user.checkedEmail);
  const [errorMessage, setErrorMessage] = React.useState('');

  const baseURL = process.env.REACT_APP_SERVER_URI;

  const signupToServer = async (signupInfo) => {
    try {
      const res = await axios.post(`${baseURL}/user/signup`, signupInfo);
      const { data } = res;

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
        if (data.errorMessage === null) {
          setErrorMessage('잘못된 정보가 있습니다');
        } else if (data.errorMessage === '비밀번호가 맞지 않습니다') {
          setErrorMessage('비밀번호가 일치하지 않습니다');
        } else {
          setErrorMessage(data.errorMessage);
        }
        return data;
      }

      dispatch(signupDone());

      return data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  const NextStep = () => {
    if (watch('pw')?.length >= 6 && watch('pwCheck')?.length < 6) {
      return (
        <MarginWrapper6>
          <NotWorkingInput type="submit" readOnly value="다음" />
        </MarginWrapper6>
      );
    }
    if (watch('pw')?.length >= 6 && watch('pwCheck')?.length >= 6) {
      return (
        <MarginWrapper6>
          <SubmitInput type="submit" value="다음" />
        </MarginWrapper6>
      );
    }
    return null;
  };

  return (
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
              placeholder="중복되지 않는 닉네임을 입력해주세요"
              // {...register('userName', {
              //   required: '이름을 입력해주세요',
              // })}
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
                  message: '비밀번호는 6~20자리로 해주세요',
                },
                minLength: {
                  value: 6,
                  message: '비밀번호는 6~20자리로 해주세요',
                },
              })}
            />
            <StyledLabel>
              {/* <Text color={ColorStyle.Gray300} regular20>
            
          </Text> */}
              비밀번호
            </StyledLabel>
          </InputWrapper>
          {errors.pw && <ErrorMessage>{errors.pw.message}</ErrorMessage>}
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
        {/* {watch('pw')?.length >= 6 && watch('pwCheck')?.length < 6 ? (
          <MarginWrapper6>
            <NotWorkingInput type="submit" readOnly value="다음" />
          </MarginWrapper6>
        ) : watch('pw')?.length >= 6 && watch('pwCheck')?.length >= 6 ? (
          <MarginWrapper6>
            <SubmitInput type="submit" value="다음" />
          </MarginWrapper6>
        ) : null} */}
        <NextStep />
      </form>
    </div>
  );
};

const Title = styled.div`
  margin: 160px 0px 44px 0px;
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

const ErrorMessage = styled.p`
  color: ${ColorStyle.Error};
  margin: 10px 0px;
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

const MarginWrapper4 = styled.div`
  margin: 44px 0px 0px 0px;
`;

const MarginWrapper5 = styled.div`
  margin: 28px 0px 28px 0px;
`;

const MarginWrapper6 = styled.div`
  margin: 60px 0px 0px 0px;
`;

export default SignupLastInput;
