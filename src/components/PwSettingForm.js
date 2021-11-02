/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
// import { Grid, Input, Button } from '../elements';
import { passwordChangeToServer } from '../features/user/actions';

const PwSettingForm = () => {
  // useEffect = (() => {

  // }, [])

  const dispatch = useDispatch();
  // const [pw, setPw] = React.useState('');
  // const [newPw, setNewPw] = React.useState('');
  // const [checkNewPw, setCheckNewPw] = React.useState('');



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  return (
    <form
      onSubmit={handleSubmit((passwordInfo) => {
        console.log(passwordInfo);
        dispatch(passwordChangeToServer(passwordInfo));
      })}
    >
      <input
        type="password"
        {...register('currentPw', {
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
      {errors.currentPw && <p>{errors.currentPw.message}</p>}
      <br />
      <input
        type="password"
        {...register('newPw', {
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
      {errors.newPw && <p>{errors.newPw.message}</p>}
      <br />
      <input
        type="password"
        {...register('newPwCheck', {
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
      {errors.newPwCheck && <p>{errors.newPwCheck.message}</p>}
      <input type="submit" />
    </form>
  );

  // return (
  //   <Grid>
  //     <p>비밀번호 변경</p>
  //     <Input
  //       type="password"
  //       place="지금 비밀번호를 입력해주세요"
  //       margin="60px 0px"
  //       _onChange={(e) => {
  //         // console.log(e.target.value);
  //         setPw(e.target.value);
  //       }}
  //     />
  //     <Input
  //       type="password"
  //       place="새 비밀번호를 입력해주세요"
  //       margin="60px 0px"
  //       _onChange={(e) => {
  //         setNewPw(e.target.value);
  //       }}
  //     />
  //     <Input
  //       type="password"
  //       place="새 비밀번호를 확인해주세요"
  //       margin="60px 0px"
  //       _onChange={(e) => {
  //         setCheckNewPw(e.target.value);
  //       }}
  //     />
  //     <BtnWrapper>
  //       <Button
  //         _onClick={() => {
  //           console.log(pw, newPw, checkNewPw);
  //           const passwordInfo = {
  //             currentPw: pw,
  //             newPw,
  //             newPwCheck: checkNewPw,
  //           };

  //           dispatch(passwordChangeToServer(passwordInfo));
  //         }}
  //       >
  //         비밀번호 변경하기
  //       </Button>
  //     </BtnWrapper>
  //   </Grid>
  // );
};

const BtnWrapper = styled.div`
  margin: 60px 0px;
`;

export default PwSettingForm;
