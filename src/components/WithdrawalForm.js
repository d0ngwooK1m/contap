/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// import { Grid, Input, Button } from '../elements';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { BasicAlert2 } from '../utils/alert';
import { useForm } from 'react-hook-form';
import T from '../api/tokenInstance';
import { removeToken } from '../utils/auth';
import Swal from 'sweetalert2';
import { Grid, Text } from '../elements';
// import { withdrawalToServer } from '../features/user/actions';
import {
  ColorStyle,
  FontScale,
  FontFamily,
  Opacity,
} from '../utils/systemDesign';

import { size } from '../utils/sizeCheck';

const WithdrawalForm = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const [inputStatus, setInputStatus] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  // const [pw, setPw] = React.useState('');
  // const [pwCheck, setPwCheck] = React.useState('');
  const userName = useSelector((state) => state.user.userName);

  const handleClickRadioButton = (radioBtnName) => {
    setInputStatus(radioBtnName);
  };

  const withdrawalModal = async (passwordInfo) => {
    const { isConfirmed } = await BasicAlert2.fire({
      title: (
        <div style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '40px' }}>
            <Text bold32 color={ColorStyle.Gray500}>
              정말 떠나시는 건가요?
            </Text>
          </div>
          <div style={{ marginTop: '44px' }}>
            <Text regular16 color={ColorStyle.Gray300}>
              같은 하늘 다른 곳에 있어도 <br />
              부디 나를 잊지 말아요
            </Text>
          </div>
        </div>
      ),
    });
    if (isConfirmed) {
      withdrawalToServer(passwordInfo);
    }
  };

  const withdrawalToServer = async (passwordInfo) => {
    try {
      const res = await T.POST('/setting/withdrawal', passwordInfo);

      const { data } = res;

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
        if (data.errorMessage === null) {
          setErrorMessage('잘못된 정보가 있습니다. 다시 확인해주세요.');
        } else {
          setErrorMessage(data.errorMessage);
        }
        return data;
      }

      removeToken();
      // window.location.href = '/';
      history.push('/withdrawal');
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

  // console.log('회원탈퇴 페이지 화면 사이즈====', size)

  return (
    <Wrapper size={size}>
      <ThemeWrapper>
        <Text color={ColorStyle.Gray500} bold32>
          회원탈퇴
        </Text>
      </ThemeWrapper>
      <MarginWrapper>
        <Text color={ColorStyle.Gray500} regular20>
          {userName !== '' ? userName : 회원}님{' '}
          <span style={{ color: `${ColorStyle.Error}` }}>탈퇴</span>하시면 모든
          기록이 사라져요
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
          //   const swalWithBootstrapButtons = Swal.mixin({
          //     customClass: {
          //       popup: 'swal-popup',
          //       confirmButton: 'btn btn-success',
          //       cancelButton: 'btn btn-danger',
          //     },
          //     buttonsStyling: false,
          //   });

          //   swalWithBootstrapButtons
          //     .fire({
          //       title: 'Are you sure?',
          //       text: "You won't be able to revert this!",
          //       icon: 'warning',
          //       showCancelButton: true,
          //       confirmButtonText: 'Yes, delete it!',
          //       cancelButtonText: 'No, cancel!',
          //       reverseButtons: true,
          //     })
          //     .then(async(result) => {
          //       if (result.isConfirmed) {
          //         // swalWithBootstrapButtons.fire(
          //         //   'Deleted!',
          //         //   'Your file has been deleted.',
          //         //   'success'
          //         // )
          //         await dispatch(withdrawalToServer(passwordInfo));
          //       } else if (
          //         /* Read more about handling dismissals below */
          //         result.dismiss === Swal.DismissReason.cancel
          //       ) {
          //         swalWithBootstrapButtons.fire(
          //           'Cancelled',
          //           'Your imaginary file is safe :)',
          //           'error',
          //         );
          //       }
          //     });
          //   // console.log(passwordInfo);
          //   // dispatch(withdrawalToServer(passwordInfo));

          withdrawalModal(passwordInfo);
        })}
      >
        <label>
          <MarginWrapper11>
            <Text color={ColorStyle.Gray300} regular20>
              비밀번호를 입력해주세요
            </Text>
          </MarginWrapper11>
          <StyledInput
            type="password"
            // placeholder="비밀번호를 입력해주세요"
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
        </label>
        {errors.pw && <ErrorMessage>{errors.pw.message}</ErrorMessage>}
        {!errors.pw && errorMessage !== '' && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
        <br />
        <SubmitWrapper>
          <SubmitInput type="submit" value="계정 삭제" />
        </SubmitWrapper>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 635px;
  /* height: 800px; */
  margin: 64px 0px 0px 126px;
  position: relative;
  ${({ size }) => size === '616' && 'overflow: auto;'};
  ${({ size }) => size === '768' && 'overflow: auto;'};
  ${({ size }) =>
    size === '616' ? 'height: 67vh;' : size === '768' ? 'height:73vh;' : size==='nomal' && 'height:85vh'};
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
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${ColorStyle.BackGround} inset !important;
    -webkit-text-fill-color: ${ColorStyle.Gray500} !important;
    /* background-color: ${ColorStyle.BackGround};
   color: ${ColorStyle.Gray500}; */
  }
`;

const SubmitWrapper = styled.div`
  margin-top: 136px;
  text-align: right;
`;

const SubmitInput = styled.input`
  width: 253px;
  height: 60px;
  /* margin-right: -91px; */
  color: white;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  border-radius: 30px;
  background-color: ${ColorStyle.PrimaryPurple};
  border: none;
  cursor: pointer;
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

const MarginWrapper11 = styled.div`
  margin: 0px 0px 16px 0px;
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

  &:checked {
    // width: 11.85px;
    // height: 11.85px;
    background: ${ColorStyle.PrimaryPurple};
    border: 5px solid #4b4950;
  }
`;

export default WithdrawalForm;
