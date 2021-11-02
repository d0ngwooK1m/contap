/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signupToServer } from '../features/user/actions';
// import { Grid, Input, Button } from '../elements';

const Signup = () => {
  const dispatch = useDispatch();
  // const [email, setEmail] = React.useState('');
  // const [userName, setUserName] = React.useState('');
  // const [pw, setPw] = React.useState('');
  // const [pwCheck, setPwCheck] = React.useState('');
  // const [emailCheck, setEmailCheck] = React.useState(false);
  // const emailCheck = useSelector((state) => state.user.emailChecked);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const signup = () => {
  //   const signupInfo = {
  //     email,
  //     pw,
  //     pwCheck,
  //     userName,
  //   };
  //   console.log(signupInfo);
  //   dispatch(signupToServer(signupInfo));
  // };

  return (
    <form
      onSubmit={handleSubmit((signupInfo) => {
        console.log(signupInfo);
        dispatch(signupToServer(signupInfo));
      })}
    >
      <input
        type="text"
        placeholder="이메일을 입력해주세요"
        {...register('email', {
          required: '이메일을 입력해주세요',
          pattern: {
            value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            message: '이메일 양식에 맞지 않습니다',
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <br />
      <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        {...register('userName', {
          required: '닉네임을 입력해주세요',
        })}
      />
      <br />
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
      <br />
      <input
        type="password"
        placeholder="비밀번호를 확인해주세요"
        {...register('pwCheck', {
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
      <input type="submit" />
    </form>
  );

  // return (
  //   <Grid>
  //     <p>회원가입</p>
  //     <Input
  //       type="email"
  //       place="이메일을 입력해주세요"
  //       _onChange={(e) => {
  //         setEmail(e.target.value);
  //       }}
  //     />
  //     {/* <Button
  //       _onClick={() => {
  //         const emailInfo = {
  //           email,
  //         };
  //         console.log(emailInfo);
  //         dispatch(emailCheckToServer(emailInfo));
  //       }}
  //     >
  //       이메일 중복체크
  //     </Button> */}
  //     <Input
  //       type="string"
  //       place="닉네임을 입력해주세요"
  //       _onChange={(e) => {
  //         setUserName(e.target.value);
  //       }}
  //     />
  //     {/* <Button
  //       _onClick={() => {
  //         const userNameInfo = {
  //           userName,
  //         };
  //         console.log(userNameInfo);
  //         dispatch(userNameCheckToServer(userNameInfo));
  //       }}
  //     >
  //       닉네임 중복체크
  //     </Button> */}
  //     <Input
  //       type="password"
  //       place="비밀번호를 입력해주세요"
  //       _onChange={(e) => {
  //         setPw(e.target.value);
  //       }}
  //     />
  //     <Input
  //       type="password"
  //       place="비밀번호를 확인해주세요"
  //       _onChange={(e) => {
  //         setPwCheck(e.target.value);
  //       }}
  //     />
  //     <Button _onClick={signup}>회원가입</Button>
  //   </Grid>
  // );
};

export default Signup;
