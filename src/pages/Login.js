/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { loginToServer } from '../features/user/actions';
// import { Grid, Input, Button } from '../elements';

const Login = () => {
  // const [state, setState] = React.useState({
  //   email: "",
  //   pw: "",
  // })
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log(watch());

  const dispatch = useDispatch();
  // const [email, setEmail] = React.useState('');
  // const [pw, setPw] = React.useState('');

  // const login = () => {
  //   const loginInfo = {
  //     email,
  //     pw,
  //   };
  //   console.log(loginInfo);
  //   dispatch(loginToServer(loginInfo));
  // };

  return (
    <div>
          <form
      onSubmit={handleSubmit((loginInfo) => {
        console.log(loginInfo);
        dispatch(loginToServer(loginInfo));
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
      <input type="submit" />
      </form>
      <span onClick={() => {
        history.push('/signup');
      }}>혹시 회원이 아니신가요?</span>
      <button
        onClick={() => {
          console.log(process.env.REACT_APP_KAKAO_PATH);
          window.location.href = `${process.env.REACT_APP_KAKAO_PATH}`;
        }}
      >
        카카오 로그인
      </button>
    </div>
  );

  // return (
  //   <Grid>
  //     <p>로그인</p>
  //     <form onClick={handleSubmit(onSubmit)}>
  //       <Input
  //         type="email"
  //         place="이메일을 입력해주세요"
  //         // _onChange={(e) => {
  //         //   // console.log(e.target.value);
  //         //   setEmail(e.target.value);
  //         // }}
  //         {...register('email', { pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i})}
  //       />
  //       {/* {errors.password && <span>{errors.password.message}</span>} */}
  //       <Input
  //         type="password"
  //         place="비밀번호를 입력해주세요"
  //         // _onChange={(e) => {
  //         //   // console.log(e.target.value);
  //         //   setPw(e.target.value);
  //         // }}
  //         {...register({
  //           required: "You must specify a password",
  //         })}
  //       />
  //       {/* <Button _onClick={login}>로그인</Button> */}
  //       <input type="submit" />
  //     </form>
  //   </Grid>
  // );
};

export default Login;
