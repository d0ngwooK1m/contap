import styled from 'styled-components';
import { ColorStyle, FontScale, FontFamily } from './systemDesign';

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const LeftWrapper = styled.div`
  width: 50%;
  height: 1080px;
  background-color: ${ColorStyle.BackGround100};
`;

const RightWrapper = styled.div`
  width: 50%;
  height: 1080px;
  background-color: ${ColorStyle.BackGround300};
  color: ${ColorStyle.Gray500};
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  margin: 160px 0px 64px 0px;
`;

const StyledLabel = styled.label`
  span:focus {
    color: ${ColorStyle.PrimaryPurple};
  }
`;

const StyledInput = styled.input`
  width: 445px;
  height: 30px;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround300};
  border-bottom: 1px solid ${ColorStyle.Gray100};
  border-right: none;
  border-right: none;
  border-top: none;
  border-left: none;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${ColorStyle.PrimaryPurple};
  }
`;

const SubmitInput = styled.input`
  width: 445px;
  height: 60px;
  margin: 60px 0px 0px 0px;
  color: white;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  border-radius: 30px;
  background-color: ${ColorStyle.PrimaryPurple};
  border: none;
  cursor: pointer;
`;

const DivideWrapper = styled.div`
  margin: 48px 0px 0px 0px;
  display: flex;
  align-items: baseline;
`;

const DivideLine = styled.hr`
  width: 40%;
  height: 0px;
  margin: 0px;
`;

const DivideContent = styled.div`
  width: 20%;
  text-align: center;
`;

const KakaoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 445px;
  height: 60px;
  margin: 60px 0px 0px 0px;
  color: 181600;
  border-radius: 30px;
  background-color: #e5d32e;
  border: none;
  cursor: pointer;
`;

const WarningText = styled.p`
  color: ${ColorStyle.Error};
  margin: 0px;
`;

export {
  LoginWrapper,
  LeftWrapper,
  RightWrapper,
  Title,
  StyledLabel,
  StyledInput,
  SubmitInput,
  DivideWrapper,
  DivideLine,
  DivideContent,
  KakaoButton,
  WarningText,
};
