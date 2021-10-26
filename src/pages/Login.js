import React from 'react';
import { Input, Button } from '../elements';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');

  const login = () => {
    const loginInfo = {
      email,
      pw,
    };
    console.log(loginInfo);
  };

  return (
    <div>
      <p>로그인</p>
      <Input
        type="email"
        placeholder="이메일을 입력해주세요"
        _onChange={(e) => {
          // console.log(e.target.value);
          setEmail(e.target.value);
        }}
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        _onChange={(e) => {
          // console.log(e.target.value);
          setPw(e.target.value);
        }}
      />
      <Button _onClick={login}>로그인</Button>
    </div>
  );
};

export default Login;
