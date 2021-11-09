import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Switch } from '@mui/material';
import { ColorStyle, FontScale, FontFamily } from '../utils/systemDesign';

const NotificationForm = () => {
  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  return (
    <PageWrapper>
      <Title>알림설정</Title>
      <Summary>알림을 문자메세지로 받아보세요!</Summary>
      <Summary2>알림 설정</Summary2>
      <CommentWrapper>
        <Comment>알림설정 관련이에요</Comment>
        <Switch />
      </CommentWrapper>
      {/* <input type="toggle" */}

      <form
        onSubmit={handleSubmit((phoneInfo) => {
          console.log(phoneInfo);
        })}
      >
        <Label>
          받아보실 연락처를 입력해주세요
          <br />
          <StyledInput
            type="text"
            // placeholder="비밀번호를 입력해주세요"
            // {...register('pw', {
            //   required: '비밀번호를 입력해주세요',
            //   maxLength: {
            //     value: 20,
            //     message: '비밀번호는 최대 20자입니다',
            //   },
            //   minLength: {
            //     value: 6,
            //     message: '비밀번호는 최소 6자 이상입니다',
            //   },
            // })}
          />
        </Label>
        {/* {errors.pw && <p>{errors.pw.message}</p>} */}
        <br />
        <SubmitInput type="submit" value="번호 저장" />
      </form>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  margin: 60px 0px 0px 125px;
  position: relative;
`;

const Title = styled.p`
  font-size: ${FontScale.Header_24};
  color: ${ColorStyle.Gray500};
`;

const Summary = styled.p`
  margin: 24px 0px 48px 0px;
  color: ${ColorStyle.Gray300};
`;

const Summary2 = styled.p`
  margin: 24px 0px 16px 0px;
  color: ${ColorStyle.Gray300};
`;

const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 56px 0px;
`;

const Comment = styled.span`
  color: ${ColorStyle.Gray500};
`;

// const RadioWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 0px 0px 56px 0px;
// `;

// const RadioLabel = styled.label`
//   color: ${ColorStyle.Gray300};
//   margin: 0px 0px 13px 0px;
// `;

// const RadioInput = styled.input`
//   &:checked {
//     color: ${ColorStyle.PrimaryPurple};
//   }
// `;

const Label = styled.label`
  color: ${ColorStyle.Gray300};
`;

const StyledInput = styled.input`
  width: 635px;
  height: 30px;
  margin: 0px 0px 48px 0px;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround};
  border-bottom: 1px solid ${ColorStyle.Gray100};
  border-right: none;
  border-left: none;
  border-top: none;
  &:focus {
    outline: none;
  }
`;

const SubmitInput = styled.input`
  width: 253px;
  height: 64px;
  margin: 96px 0px 0px 0px;
  color: white;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  border-radius: 30px;
  background-color: ${ColorStyle.PrimaryPurple};
  border: none;
  cursor: pointer;
  position: absolute;
  top: 100%;
  right: 0px;
`;

export default NotificationForm;
