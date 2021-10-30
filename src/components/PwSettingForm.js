import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Grid, Input, Button } from '../elements';
import { passwordChangeToServer } from '../features/user/actions';

const PwSettingForm = () => {
  const dispatch = useDispatch();
  const [pw, setPw] = React.useState('');
  const [newPw, setNewPw] = React.useState('');
  const [checkNewPw, setCheckNewPw] = React.useState('');

  return (
    <Grid>
      <p>비밀번호 변경</p>
      <Input
        type="password"
        place="지금 비밀번호를 입력해주세요"
        margin="60px 0px"
        _onChange={(e) => {
          // console.log(e.target.value);
          setPw(e.target.value);
        }}
      />
      <Input
        type="password"
        place="새 비밀번호를 입력해주세요"
        margin="60px 0px"
        _onChange={(e) => {
          setNewPw(e.target.value);
        }}
      />
      <Input
        type="password"
        place="새 비밀번호를 확인해주세요"
        margin="60px 0px"
        _onChange={(e) => {
          setCheckNewPw(e.target.value);
        }}
      />
      <BtnWrapper>
        <Button
          _onClick={() => {
            console.log(pw, newPw, checkNewPw);
            const passwordInfo = {
              currentPw: pw,
              newPw,
              newPwCheck: checkNewPw,
            };

            dispatch(passwordChangeToServer(passwordInfo));
          }}
        >
          비밀번호 변경하기
        </Button>
      </BtnWrapper>
    </Grid>
  );
};

const BtnWrapper = styled.div`
  margin: 60px 0px;
`;

export default PwSettingForm;
