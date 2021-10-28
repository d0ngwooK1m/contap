import React from 'react';
import { useDispatch } from 'react-redux';
import { loginToServer } from '../features/user/actions';
import { Grid, Input, Button } from '../elements';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');

  const login = () => {
    const loginInfo = {
      email,
      pw,
    };
    console.log(loginInfo);
    dispatch(loginToServer(loginInfo));
  };

  return (
    <Grid>
      <p>로그인</p>
      <Input
        type="email"
        place="이메일을 입력해주세요"
        _onChange={(e) => {
          // console.log(e.target.value);
          setEmail(e.target.value);
        }}
      />
      <Input
        type="password"
        place="비밀번호를 입력해주세요"
        _onChange={(e) => {
          // console.log(e.target.value);
          setPw(e.target.value);
        }}
      />
      <Button _onClick={login}>로그인</Button>
    </Grid>
  );
};

export default Login;
