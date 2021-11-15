/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// import { Grid, Input, Button } from '../elements';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Grid, Text } from '../elements';
import { withdrawalToServer } from '../features/user/actions';
import { ColorStyle, FontScale, FontFamily } from '../utils/systemDesign';
import { Switch } from '@mui/material';

const AlarmForm = () => {
  const [inputStatus, setInputStatus] = React.useState('');
  // const [phoneNumber, setPhoneNumber] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm();

  return (
    <Wrapper>
      <ThemeWrapper>
        <Text color={ColorStyle.Gray500} bold32>
          알림 설정
        </Text>
      </ThemeWrapper>
      <MarginWrapper>
        <Text color={ColorStyle.Gray300} regular20>
          Tap을 받으면 문자메세지로 알려드려요!
        </Text>
      </MarginWrapper>

      <MarginWrapper>
        <Text color={ColorStyle.Gray300} regular20>
          알림 설정
        </Text>
      </MarginWrapper>
      <MarginWrapper2>
        <Text color={ColorStyle.Gray500} regular20>
          이제 문자로 알림을 받으실 수 있습니다.
          <br />
          원하지 않는다면 알람을 끌 수 있어요
        </Text>
        <Switch defaultChecked color="secondary" />
      </MarginWrapper2>

      <form
        onSubmit={handleSubmit((phoneInfo) => {
          console.log(phoneInfo);
        })}
      >
        <label>
          <Text color={ColorStyle.Gray300} regular20>
            받아보실 연락처를 입력해주세요
          </Text>
          <StyledInput
            type="text"
            // placeholder="비밀번호를 입력해주세요"
            {...register('phoneNumber', {
              required: '전화번호를 입력해주세요',
              maxLength: {
                value: 13,
                message: '번호가 올바르지 않습니다',
              },
              // minLength: {
              //   value: 12,
              //   message: '번호가 올바르지 않습니다',
              // },
            })}
            // onChange={(e) => {
            //   setPhoneNumber(e.target.value);
            // }}
            // value={phoneNumber}
          />
        </label>
        {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
        <br />
        <SubmitInput type="submit" value="번호 저장" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 635px;
  margin: 64px 0px 0px 126px;
  position: relative;
`;

// const RadioWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 0px 0px 56px 0px;
// `;

// const LabelInnerWrapper = styled.div`
//   display: flex;
// `;

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround};
  border-bottom: 1px solid ${ColorStyle.Gray100};
  border-right: none;
  border-top: none;
  border-left: none;
  &:focus {
    outline: none;
  }
`;

const SubmitInput = styled.input`
  width: 253px;
  height: 60px;
  margin: 60px 0px 0px 0px;
  color: white;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  border-radius: 30px;
  background-color: ${ColorStyle.PrimaryPurple};
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 100%;
`;

const MarginLabelWrapper = styled.label`
  margin: 0px 0px 12px 0px;
`;

const ThemeWrapper = styled.div`
  margin: 0px 0px 26px 0px;
`;

const MarginWrapper = styled.div`
  margin: 0px 0px 48px 0px;
`;

const MarginWrapper2 = styled.div`
  margin: 0px 0px 48px 0px;
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled.p`
  color: ${ColorStyle.Error};
  margin: 10px 0px;
`;

export default AlarmForm;
