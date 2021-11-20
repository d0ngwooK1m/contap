/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// import { Grid, Input, Button } from '../elements';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import T from '../api/tokenInstance';
import { removeToken } from '../utils/auth';
import Swal from 'sweetalert2';
import { Grid, Text } from '../elements';
// import { withdrawalToServer } from '../features/user/actions';
import { ColorStyle, FontScale, FontFamily, Opacity } from '../utils/systemDesign';
import '../utils/swal.css';

const WithdrawalForm = () => {
  const dispatch = useDispatch();
  const [inputStatus, setInputStatus] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  // const [pw, setPw] = React.useState('');
  // const [pwCheck, setPwCheck] = React.useState('');
  const userName = useSelector((state) => state.user.userName);

  const handleClickRadioButton = (radioBtnName) => {
    setInputStatus(radioBtnName);
  };

  const withdrawalToServer = async(passwordInfo) => {
    try {
      const res = await T.POST('/setting/withdrawal', passwordInfo);
  
      const { data } = res;
      console.log(data);
  
      // if (data.result === 'fail') {
      //   console.log(data);
      //   Swal.fire({
      //     icon: 'error',
      //     title: '탈퇴 실패',
      //     text: `${data.errorMessage}`,
      //   });
  
      //   return data;
      // }

      if (data.result === 'fail') {
        console.log(data);
        if (data.errorMessage === null) {
          setErrorMessage('잘못된 정보가 있습니다. 다시 확인해주세요.')
        } else {
          setErrorMessage(data.errorMessage);
        }
        return data;
      }

      removeToken();
      window.location.href = '/';
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
          회원탈퇴
        </Text>
      </ThemeWrapper>
      <MarginWrapper>
        <Text color={ColorStyle.Gray300} regular20>
          {userName !== '' ? userName : 회원}님 탈퇴 후 한달 뒤 모든 기록이 사라져요
          <br />
          재가입해도 복구할 수 없답니다😥
        </Text>
      </MarginWrapper>
      <MarginWrapper>
        <Text color={ColorStyle.Gray300} regular20>
          탈퇴하시려는 이유를 말씀해 주세요
        </Text>
      </MarginWrapper>
      <RadioWrapper>
        <MarginLabelWrapper htmlFor="radio1">
          <LabelInnerWrapper>
            <RadioInput
              type="radio"
              id="radio1"
              checked={inputStatus === 'radio1'}
              onChange={() => {
                handleClickRadioButton('radio1');
              }}
            />
            <Text color={ColorStyle.Gray500} regular20>
              사용빈도가 낮아요
            </Text>
          </LabelInnerWrapper>
        </MarginLabelWrapper>
        <MarginLabelWrapper htmlFor="radio2">
          <LabelInnerWrapper>
            <RadioInput
              type="radio"
              id="radio2"
              checked={inputStatus === 'radio2'}
              onChange={() => {
                handleClickRadioButton('radio2');
              }}
            />
            <Text color={ColorStyle.Gray500} regular20>
              이용이 불편해요
            </Text>
          </LabelInnerWrapper>
        </MarginLabelWrapper>
        <MarginLabelWrapper htmlFor="radio3">
          <LabelInnerWrapper>
            <RadioInput
              type="radio"
              id="radio3"
              checked={inputStatus === 'radio3'}
              onChange={() => {
                handleClickRadioButton('radio3');
              }}
            />
            <Text color={ColorStyle.Gray500} regular20>
              기록을 삭제하고 싶어요
            </Text>
          </LabelInnerWrapper>
        </MarginLabelWrapper>
        <MarginLabelWrapper htmlFor="radio4">
          <LabelInnerWrapper>
            <RadioInput
              type="radio"
              id="radio4"
              checked={inputStatus === 'radio4'}
              onChange={() => {
                handleClickRadioButton('radio4');
              }}
            />
            <Text color={ColorStyle.Gray500} regular20>
              더 이상 프로젝트를 하지 않아요
            </Text>
          </LabelInnerWrapper>
        </MarginLabelWrapper>
      </RadioWrapper>
      <form
        onSubmit={handleSubmit((passwordInfo) => {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              popup: 'swal-popup',
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger',
            },
            buttonsStyling: false,
          });

          swalWithBootstrapButtons
            .fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'No, cancel!',
              reverseButtons: true,
            })
            .then(async(result) => {
              if (result.isConfirmed) {
                // swalWithBootstrapButtons.fire(
                //   'Deleted!',
                //   'Your file has been deleted.',
                //   'success'
                // )
                await dispatch(withdrawalToServer(passwordInfo));
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  'Your imaginary file is safe :)',
                  'error',
                );
              }
            });
          // console.log(passwordInfo);
          // dispatch(withdrawalToServer(passwordInfo));
        })}
      >
        <label>
          <Text color={ColorStyle.Gray300} regular20>
            비밀번호를 입력해주세요
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
        </label>
        {errors.pw && <ErrorMessage>{errors.pw.message}</ErrorMessage>}
        {!errors.pw && errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <br />
        <SubmitInput type="submit" value="계정 삭제" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 635px;
  margin: 64px 0px 0px 126px;
  position: relative;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 56px 0px;
`;

const LabelInnerWrapper = styled.div`
  display: flex;
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

const MarginLabelWrapper = styled.label`
  margin: 0px 0px 12px 0px;
`;

const ThemeWrapper = styled.div`
  margin: 0px 0px 26px 0px;
`;

const MarginWrapper = styled.div`
  margin: 0px 0px 48px 0px;
`;

const ErrorMessage = styled.p`
  color: ${ColorStyle.Error};
  margin: 10px 0px;
`;

const RadioInput = styled.input`
    cursor: pointer;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 100%;
    margin-right: 16px;
    background-color: ${ColorStyle.Gray300 + Opacity[30]};
    // background: ${ColorStyle.PrimaryPurple};
  }
  &:checked {
    // width: 11.85px;
    // height: 11.85px;
    background: ${ColorStyle.PrimaryPurple};
    border: 5px solid #4b4950;
  }
`;

export default WithdrawalForm;
