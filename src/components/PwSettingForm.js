/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
// import { Grid, Input, Button } from '../elements';
import { Margin } from '@mui/icons-material';
// import { passwordChangeToServer } from '../features/user/actions';
import T from '../api/tokenInstance';
import Swal from 'sweetalert2';
import { ColorStyle, FontScale, FontFamily } from '../utils/systemDesign';
import { Text } from '../elements';

const PwSettingForm = () => {
  // useEffect = (() => {

  // }, [])
  const history = useHistory();
  // const dispatch = useDispatch();
  // const [pw, setPw] = React.useState('');
  // const [newPw, setNewPw] = React.useState('');
  // const [checkNewPw, setCheckNewPw] = React.useState('');
  const [pwError, setPwError] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const userName = useSelector((state) => state.user.userName);

  const passwordChangeToServer = async(passwordInfo)  => {
    try {
      const res = await T.POST('/setting/password', passwordInfo);
  
      const { data } = res;
      console.log(data);
  
      // if (data.result === 'fail') {
      //   console.log(data);
      //   Swal.fire({
      //     icon: 'error',
      //     title: '비밀번호 변경 실패',
      //     text: `${data.errorMessage}`,
      //   });
      //   return data;
      // }
      if (data.result === 'fail') {
        console.log(data);
        if (data.errorMessage === null) {
          setErrorMessage('잘못된 정보가 있습니다. 다시 확인해주세요.')
        } else if (data.errorMessage === '비밀번호가 맞지 않습니다') {
          setPwError('비밀번호가 일치하지 않습니다')
        } else {
          setErrorMessage(data.errorMessage);
        }
        return data;
      }
  
      if (data.result === 'success') {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: '비밀번호 변경 성공!',
        });
        history.push('/');
        return data;
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Wrapper>
      <ThemeWrapper>
        <Text color={ColorStyle.Gray500} bold32>
          비밀번호 변경
        </Text>
      </ThemeWrapper>
      <MarginWrapper>
        <Text color={ColorStyle.Gray300} regular20>
          비밀번호를 다시 설정합니다
        </Text>
      </MarginWrapper>
      <form
        autoComplete='off'
        onSubmit={handleSubmit(async (passwordInfo) => {
          await setErrorMessage('');
          console.log(passwordInfo);
          passwordChangeToServer(passwordInfo);
        })}
      >
        <MarginWrapper>
          <label>
            <Text color="#A09BAC" regular20>
              현재 비밀번호를 입력해주세요
            </Text>
            <br />
            <StyledInput
              type="password"
              {...register('currentPw', {
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
          </label>
          {errors.currentPw && <ErrorMessage>{errors.currentPw.message}</ErrorMessage>}
          {!errors.currentPw && pwError !== '' && <ErrorMessage>{pwError}</ErrorMessage>}
        </MarginWrapper>
        <br />
        <MarginWrapper>
          <label>
            <Text color={ColorStyle.Gray300} regular20>
              새로운 비밀번호를 설정합니다
            </Text>
            <br />
            <StyledInput
              type="password"
              {...register('newPw', {
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
          </label>
          {errors.newPw && <ErrorMessage>{errors.newPw.message}</ErrorMessage>}
        </MarginWrapper>
        <br />
        <label>
            <Text color={ColorStyle.Gray300} regular20>
              한번 더 입력해주세요
            </Text>
            <br />
            <StyledInput
              type="password"
              {...register('newPwCheck', {
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
          </label>
        {errors.newPwCheck && <ErrorMessage>{errors.newPwCheck.message}</ErrorMessage>}
        {!errors.currentPw && !errors.newPw && !errors.newPwCheck && errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <br />
        <SubmitWrapper>
          <SubmitInput type="submit" value="변경 완료" />
        </SubmitWrapper>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 635px;
  margin: 64px 0px 0px 125px;
  position: relative;
`;

const ThemeWrapper = styled.div`
  margin: 0px 0px 26px 0px;
`;

const MarginWrapper = styled.div`
  margin: 0px 0px 48px 0px;
`;

const BtnWrapper = styled.div`
  margin: 60px 0px;
`;

const InputLabel = styled.label`
  color: ${ColorStyle.Gray300};
`;

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  color: ${ColorStyle.Gray500};
  font-size: 16px;
  font-family: ${FontFamily};
  background-color: ${ColorStyle.BackGround};
  border-bottom: 1px solid ${ColorStyle.Gray100};
  border-right: none;
  border-top: none;
  border-left: none;
  &:focus {
    outline: none;
  }
`;

const SubmitWrapper = styled.div`
  margin: 144px 0px 0px 0px;
`;

const SubmitInput = styled.input`
  width: 253px;
  height: 60px;
  margin: 60px 0px 0px 0px;
  color: white;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  border-radius: 30px;
  background-color: ${ColorStyle.PrimaryPurple};
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 100%;
`;

const ErrorMessage = styled.p`
  color: ${ColorStyle.Error};
  margin: 10px 0px;
`;

export default PwSettingForm;
