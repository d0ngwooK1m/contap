import React from 'react';
import styled from 'styled-components';
import { Grid, Input, Button } from '../elements';

const PwSettingForm = () => {
  return (
    <Grid>
      <p>비밀번호 변경</p>
      <Input
        type="password"
        placeholder="지금 비밀번호를 입력해주세요"
        margin="60px 0px"
      />
      <Input
        type="password"
        placeholder="새 비밀번호를 입력해주세요"
        margin="60px 0px"
      />
      <Input
        type="password"
        placeholder="새 비밀번호를 확인해주세요"
        margin="60px 0px"
      />
      <BtnWrapper>
        <Button>비밀번호 변경하기</Button>
      </BtnWrapper>
    </Grid>
  );
};

const BtnWrapper = styled.div`
  margin: 60px 0px;
`;

export default PwSettingForm;
