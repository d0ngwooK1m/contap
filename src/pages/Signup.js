import React from 'react';
import { useDispatch } from 'react-redux';
import { emailCheckToServer, signupToServer } from '../features/user/actions';
import { Grid, Input, Button } from '../elements';

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [pwCheck, setPwCheck] = React.useState('');
  // const [emailCheck, setEmailCheck] = React.useState(false);
  // const emailCheck = useSelector((state) => state.user.emailChecked);

  const signup = () => {
    const signupInfo = {
      email,
      pw,
      pwCheck,
      userName,
    };
    console.log(signupInfo);
    dispatch(signupToServer(signupInfo));
  };

  return (
    <Grid>
      <p>회원가입</p>
      <Input
        type="email"
        place="이메일을 입력해주세요"
        _onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Button
        _onClick={() => {
          const emailInfo = {
            email,
          };
          console.log(emailInfo);
          dispatch(emailCheckToServer(emailInfo));
        }}
      >
        이메일 중복체크
      </Button>
      <Input
        type="string"
        place="이름을 입력해주세요"
        _onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <Input
        type="password"
        place="비밀번호를 입력해주세요"
        _onChange={(e) => {
          setPw(e.target.value);
        }}
      />
      <Input
        type="password"
        place="비밀번호를 확인해주세요"
        _onChange={(e) => {
          setPwCheck(e.target.value);
        }}
      />
      <Button _onClick={signup}>회원가입</Button>
    </Grid>
  );
};

export default Signup;
