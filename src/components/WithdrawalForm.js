import React from 'react';
import { Grid, Input, Button } from '../elements';

const WithdrawalForm = () => {
  return (
    <Grid>
      <p>회원탈퇴</p>
      <Input type="email" placeholder="이메일을 입력해주세요" />
      <Input type="password" placeholder="비밀번호를 입력해주세요" />
      <Button>회원탈퇴</Button>
    </Grid>
  );
};

export default WithdrawalForm;
