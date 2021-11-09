/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// import { Grid, Input, Button } from '../elements';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Grid, Text } from '../elements';
import { withdrawalToServer } from '../features/user/actions';
import { ColorStyle, FontScale, FontFamily } from '../utils/systemDesign';

const WithdrawalForm = () => {
  const dispatch = useDispatch();
  const [inputStatus, setInputStatus] = React.useState('');
  // const [pw, setPw] = React.useState('');
  // const [pwCheck, setPwCheck] = React.useState('');

  const handleClickRadioButton = (radioBtnName) => {
    setInputStatus(radioBtnName);
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
          왜 탈퇴하려는지 알려주세요ㅠㅠ
        </Text>
      </MarginWrapper>
      <RadioWrapper>
        <MarginLabelWrapper htmlFor="radio1">
          <LabelInnerWrapper>
            <input
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
            <input
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
            <input
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
            <input
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
            .then((result) => {
              if (result.isConfirmed) {
                // swalWithBootstrapButtons.fire(
                //   'Deleted!',
                //   'Your file has been deleted.',
                //   'success'
                // )
                dispatch(withdrawalToServer(passwordInfo));
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
            한번 더 입력해주세요
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
        {errors.pw && <p>{errors.pw.message}</p>}
        <br />
        <input type="submit" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 635px;
  margin: 64px 0px 0px 126px;
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
  background-color: ${ColorStyle.BackGround};
  border-bottom: 1px solid ${ColorStyle.Gray100};
  border-right: none;
  border-top: none;
  border-left: none;
  &:focus {
    outline: none;
  }
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

export default WithdrawalForm;
