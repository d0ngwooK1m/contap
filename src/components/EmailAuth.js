import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ColorStyle, FontFamily, FontScale } from '../utils/systemDesign';
import { Text } from '../elements';
import { authCheck, backToPrev, emailAuth } from '../features/user/actions';
import Timer from './Timer';
import { ReactComponent as ExpandDownSvg } from '../svgs/ExpandDown.svg';
import { ReactComponent as ExpandOpenSvg } from '../svgs/ExpandOpen.svg';

const EmailAuth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const checkedEmail = useSelector((state) => state.user.checkedEmail);
  const [authNumCheck, setAuthNumCheck] = React.useState(true);
  const [certificationNum, setCertificationNum] = React.useState('');
  const [reset, setReset] = React.useState(false);
  const [content, setContent] = React.useState(false);

  const baseURL = process.env.REACT_APP_SERVER_URI;

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

  const sendEmailAuth = async (emailInfo) => {
    try {
      // setSendEmail(true);
      // console.log('이메일 들어가는지 확인===>', sendEmail);
      const res = await axios.post(`${baseURL}/email/send`, emailInfo);
      // const { data } = res;

      if (res.data.result === 'success') {
        dispatch(emailAuth(emailInfo));
      }

      return res.data;
    } catch (error) {
      console.error(error);
      return error.Message;
    }
  };

  return (
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
          // console.log(numInfo);
          const authInfo = {
            email: checkedEmail,
            certificationNumber: certificationNum,
          };
          // await dispatch(sendAuthInfo(authInfo));
          sendAuthInfo(authInfo);
        })}
      >
        <MarginWrapper>
          <CounterWrapper>
            {/* <Text color={ColorStyle.Gray500} regular20>
            <Timer mm={3} ss={0} />        
          </Text>         */}
            {/* {timerReset ? <Timer mm={3} ss={0} /> : <Timer mm={10} ss={0} />} */}
            <Timer mm={3} ss={0} reset={reset} />
          </CounterWrapper>
          <div>
            <InputWrapper>
              <StyledInput
                type="text"
                // placeholder="인증번호를 입력해주세요"
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
              <StyledLabel>
                {/* <Text color={ColorStyle.Gray300} regular20>
              
            </Text> */}
                인증번호
              </StyledLabel>
            </InputWrapper>
          </div>
          {errors.certificationNumber && (
            <ErrorMessage>{errors.certificationNumber.message}</ErrorMessage>
          )}
          {!errors.certificationNumber && !authNumCheck && (
            <ErrorMessage>인증번호가 일치하지 않습니다</ErrorMessage>
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
              // dispatch(emailTimer(false));
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
  );
};

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

const MoreWrapper = styled.div`
  margin: 72px 0px 16px 0px;
  cursor: pointer;
`;

const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MoreContent = styled.div`
  width: 90%;
  height: fit-content;
  background-color: ${ColorStyle.BackGround300};
  padding: 30px;
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

export default EmailAuth;
