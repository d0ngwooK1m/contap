/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// import { Grid, Input, Button } from '../elements';
import { useForm } from 'react-hook-form';
import { Grid } from '../elements';
import { withdrawalToServer } from '../features/user/actions';
import Swal from 'sweetalert2';

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
    <Grid>
      <RadioWrapper>
        <label htmlFor="radio1">
          <input
            type="radio"
            id="radio1"
            checked={inputStatus === 'radio1'}
            onChange={() => {
              handleClickRadioButton('radio1');
            }}
          />
          사용빈도가 낮아요
        </label>
        <label htmlFor="radio2">
          <input
            type="radio"
            id="radio2"
            checked={inputStatus === 'radio2'}
            onChange={() => {
              handleClickRadioButton('radio2');
            }}
          />
          이용이 불편해요
        </label>
        <label htmlFor="radio3">
          <input
            type="radio"
            id="radio3"
            checked={inputStatus === 'radio3'}
            onChange={() => {
              handleClickRadioButton('radio3');
            }}
          />
          기록을 삭제하고 싶어요
        </label>
        <label htmlFor="radio4">
          <input
            type="radio"
            id="radio4"
            checked={inputStatus === 'radio4'}
            onChange={() => {
              handleClickRadioButton('radio4');
            }}
          />
          더 이상 프로젝트를 하지 않아요
        </label>
      </RadioWrapper>
      <form
        onSubmit={
          handleSubmit((passwordInfo) => {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            })
            
            swalWithBootstrapButtons.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'No, cancel!',
              reverseButtons: true
            }).then((result) => {
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
                  'error'
                )
                return;
              }
            })
            // console.log(passwordInfo);
            // dispatch(withdrawalToServer(passwordInfo));
          })
        }
      >
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
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
        {errors.pw && <p>{errors.pw.message}</p>}
        <br />
        <input type="submit"/>
      </form>
    </Grid>
  );
};

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default WithdrawalForm;
