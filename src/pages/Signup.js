import React from 'react';
import { useDispatch } from 'react-redux';
import { signupToServer } from '../features/user/actions';
import { Grid, Input, Button } from '../elements';

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [pwCheck, setPwCheck] = React.useState('');

  const signup = () => {
    const signupInfo = {
      email,
      userName,
      pw,
      pwCheck,
    };
    console.log(signupInfo);
    dispatch(signupToServer(signupInfo));
  };

  return (
    <Grid>
      <p>회원가입</p>
      <Input
        type="email"
        placeholder="이메일을 입력해주세요"
        _onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        type="string"
        placeholder="이름을 입력해주세요"
        _onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        _onChange={(e) => {
          setPw(e.target.value);
        }}
      />
      <Input
        type="password"
        placeholder="비밀번호를 확인해주세요"
        _onChange={(e) => {
          setPwCheck(e.target.value);
        }}
      />
      <Button _onClick={signup}>회원가입</Button>
    </Grid>
  );
};

export default Signup;
