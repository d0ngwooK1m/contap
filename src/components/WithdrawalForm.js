import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Grid, Input, Button } from '../elements';
import { withdrawalToServer } from '../features/user/actions';

const WithdrawalForm = () => {
  const dispatch = useDispatch();
  const [inputStatus, setInputStatus] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [pwCheck, setPwCheck] = React.useState('');

  const handleClickRadioButton = (radioBtnName) => {
    setInputStatus(radioBtnName);
  };

  return (
    <Grid>
      <p>회원탈퇴</p>
      <RadioWrapper>
        <label htmlFor="radio1">
          <input
            type="radio"
            id="radio1"
            checked={inputStatus === 'radio1'}
            onChange={() => {
              handleClickRadioButton('radio1');
            }}
          />
          사용빈도가 낮아요
        </label>
        <label htmlFor="radio2">
          <input
            type="radio"
            id="radio2"
            checked={inputStatus === 'radio2'}
            onChange={() => {
              handleClickRadioButton('radio2');
            }}
          />
          이용이 불편해요
        </label>
        <label htmlFor="radio3">
          <input
            type="radio"
            id="radio3"
            checked={inputStatus === 'radio3'}
            onChange={() => {
              handleClickRadioButton('radio3');
            }}
          />
          기록을 삭제하고 싶어요
        </label>
        <label htmlFor="radio4">
          <input
            type="radio"
            id="radio4"
            checked={inputStatus === 'radio4'}
            onChange={() => {
              handleClickRadioButton('radio4');
            }}
          />
          더 이상 프로젝트를 하지 않아요
        </label>
      </RadioWrapper>
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
      <Button
        _onClick={() => {
          console.log(pw, pwCheck);
          const passwordInfo = {
            pw,
            pwCheck,
          };
          dispatch(withdrawalToServer(passwordInfo));
        }}
      >
        회원탈퇴
      </Button>
    </Grid>
  );
};

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default WithdrawalForm;
