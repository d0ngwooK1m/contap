/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// import { Grid, Input, Button } from '../elements';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Grid, Text } from '../elements';
import {
  settingAlarm,
  settingPhoneNum,
  withdrawalToServer,
} from '../features/user/actions';
import { ColorStyle, FontScale, FontFamily } from '../utils/systemDesign';
// import { Switch } from '@mui/material';
import T from '../api/tokenInstance';
import { size } from '../utils/sizeCheck';

const AlarmForm = () => {
  const dispatch = useDispatch();
  // const [inputStatus, setInputStatus] = React.useState('');
  const switchInfo = useSelector((state) => state.user.alarm);
  const phoneNumberInfo = useSelector((state) => state.user.phoneNumber);
  const [switchChange, setSwitchChange] = React.useState(switchInfo);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm();

  React.useEffect(async () => {
    const res = await T.GET('/setting/getPhoneNumber');
    const { data } = res;
    if (data.errorMessage === null) {
      setPhoneNumber('');
    } else {
      setPhoneNumber(data);
    }
  }, [phoneNumberInfo]);

  const handleChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhoneNumber(e.target.value);
    }
  };

  React.useEffect(() => {
    if (phoneNumber.length === 10) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    // if (phoneNumber.length === 12) {
    //   setPhoneNumber(
    //     phoneNumber
    //       .replace(/-/g, '')
    //       .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
    //   );
    // }
    if (phoneNumber.length === 13) {
      if (phoneNumber.replace(/-/g, '').length === 12) {
        const editPhoneNumber = phoneNumber.replace(/-/, '').slice(0, 11);
        setPhoneNumber(
          editPhoneNumber
            .replace(/-/g, '')
            .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
        );
      } else {
        setPhoneNumber(
          phoneNumber
            .replace(/-/g, '')
            .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
        );
      }
    }
  }, [phoneNumber]);

  const sendPhoneNumber = async (phoneNumber) => {
    try {
      const res = await T.POST(`/setting/modifyPhoneNumber`, phoneNumber);
      const { data } = res;
      if (data.errorMessage) {
        setErrorMessage('잘못된 번호입니다. 다시 확인해주세요.');
      }
      dispatch(settingPhoneNum(phoneNumber));
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const sendAlarm = async (alarmInfo) => {
    try {
      const res = await T.POST(
        `/setting/alarm?alarmState=${alarmInfo.alarmState}`,
      );
      const { data } = res;
      dispatch(settingAlarm(alarmInfo));
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper size={size}>
      <ThemeWrapper>
        <Text color={ColorStyle.Gray500} bold32>
          알림 설정
        </Text>
      </ThemeWrapper>
      <MarginWrapper>
        <Text color={ColorStyle.Gray300} regular20>
          Tap을 받으면 문자메세지로 알려드려요!
          <br />
          알림 외에 다른 문자는 보내지 않아요😉
        </Text>
      </MarginWrapper>

      <MarginWrapper11>
        <Text color={ColorStyle.Gray300} regular20>
          알림 설정
        </Text>
      </MarginWrapper11>
      <MarginWrapper2>
        {switchChange === 1 ? (
          <Text color={ColorStyle.Gray500} regular20>
            이제 문자로 알림을 받아 보실 수 있습니다!
            <br />
            여기서 잠시 알람을 끌 수도 있어요
          </Text>
        ) : (
          <Text color={ColorStyle.Gray300} regular20>
            알림 기능이 꺼져있어요
            <br />
            문자로 알림을 받아보세요!
          </Text>
        )}
        {/* {
          switchInfo === 0 ?
            <Switch color="secondary" onChange={() => {
              setSwitchChange(1);
          }} /> :
            <Switch color="secondary" defaultChecked onChange={() => {
              setSwitchChange(0);
            }} />
        } */}
        {switchInfo === 0 ? (
          <Switch>
            <SwitchInput
              type="checkbox"
              onChange={() => {
                if (switchChange === 1) {
                  setSwitchChange(0);
                } else {
                  setSwitchChange(1);
                }
              }}
            />
            <Slider />
          </Switch>
        ) : (
          <Switch>
            <SwitchInput
              type="checkbox"
              defaultChecked
              onChange={() => {
                if (switchChange === 1) {
                  setSwitchChange(0);
                } else {
                  setSwitchChange(1);
                }
              }}
            />
            <Slider />
          </Switch>
        )}
      </MarginWrapper2>

      <form
        autoComplete="off"
        onSubmit={handleSubmit((phoneInfo) => {
          const alarmInfo = {
            alarmState: switchChange,
          };
          sendPhoneNumber(phoneInfo);
          sendAlarm(alarmInfo);
        })}
      >
        <label>
          <MarginWrapper11>
            <Text color={ColorStyle.Gray300} regular20>
              알림 정보 입력
            </Text>
          </MarginWrapper11>
          <MarginWrapper11>
            <Text color={ColorStyle.Gray300} regular20>
              받아보실 연락처를 입력해주세요
            </Text>
          </MarginWrapper11>
          <StyledInput
            type="text"
            // placeholder="비밀번호를 입력해주세요"
            {...register('phoneNumber', { maxLength: 13 })}
            onChange={handleChange}
            value={phoneNumber}
          />
        </label>
        {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <br />
        <SubmitInput type="submit" value="번호 저장" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 635px;
  /* height: 800px; */
  margin: 64px 0px 0px 126px;
  position: relative;
  ${({ size }) => size === '616' && 'overflow: auto;'};
  ${({ size }) => size === '768' && 'overflow: auto;'};
  ${({ size }) => (size === '616' && 'height: 67vh;')};
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
  font-size: 16px;
  font-family: ${FontFamily};
  border-right: none;
  border-top: none;
  border-left: none;
  &:focus {
    outline: none;
  }
  &:-webkit-autofill {
   /* -webkit-box-shadow: 0 0 0 1000px white inset; */
   background-color: ${ColorStyle.BackGround};
   color: ${ColorStyle.Gray500};
  }
`;

const SubmitInput = styled.input`
  width: 125px;
  height: 50px;
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

const MarginWrapper11 = styled.div`
  margin: 0px 0px 16px 0px;
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

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked {
    background-color: ${ColorStyle.PrimaryPurple};
    + span {
      background-color: ${ColorStyle.PrimaryPurple};
    }
  }
  &:focus {
    box-shadow: 0 0 1px #2196f3;
    + span {
      box-shadow: 0 0 1px #2196f3;
    }
  }
  &:checked {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    + span:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 34px;
  background-color: ${ColorStyle.Gray100};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    border-radius: 50%;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

export default AlarmForm;
