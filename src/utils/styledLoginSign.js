import styled from 'styled-components';
import { ColorStyle, FontScale, FontFamily, Opacity } from './systemDesign';

const LoginWrapper = styled.div`
  width: 1435px;
  height: 100%;
  display: flex;
`;

const LeftWrapper = styled.div`
  width: 1200px;
  height: 1080px;
  background: linear-gradient(153.56deg, #8c4dff 0%, rgba(29, 29, 34, 0) 25%);
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
`;

const Link = styled.div`
  width: 125px;
  height: 36px;
  position: absolute;
  top: 160px;
  left: 165px;
  cursor: pointer;
  z-index: 1000;
`;

const SvgWrapper = styled.div`
  width: 540px;
  height: fit-content;
  position: absolute;
  right: 39px;
  top: 160px;
`;

const RightWrapper = styled.div`
  width: 1200px;
  height: 1080px;
  background-color: ${ColorStyle.BackGround};
  color: ${ColorStyle.Gray500};
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  margin: 160px 0px 64px 0px;
`;

const InputWrapperEmail = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 0px 0px 28px 0px;
`;

const InputWrapperPw = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 0px 0px 40px 0px;
`;

const StyledLabel = styled.label`
  color: ${ColorStyle.Gray300};
`;

const StyledInput = styled.input`
  width: 445px;
  height: 30px;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround};
  border-bottom: 1px solid ${ColorStyle.Gray300};
  font-size: 16px;
  font-family: ${FontFamily};
  border-right: none;
  border-right: none;
  border-top: none;
  border-left: none;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${ColorStyle.PrimaryPurple};
    + label {
      color: ${ColorStyle.PrimaryPurple};
    }
  }
`;

const SubmitInput = styled.input`
  width: 445px;
  height: 60px;
  margin: 60px 0px 0px 0px;
  color: white;
  font-family: ${FontFamily};
  font-size: ${FontScale.Body1_20};
  font-weight: bold;
  border-radius: 30px;
  background-color: ${ColorStyle.PrimaryPurple};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${ColorStyle.HoverPurple};
    transition: 0.3s;
  }
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
  border: 1px solid ${ColorStyle.Gray100 + Opacity[50]};
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
  font-family: ${FontFamily};
  font-size: ${FontScale.Body1_20};
  font-weight: bold;
  color: #181600;
  border-radius: 30px;
  background-color: #e5d32e;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #ccbd2f;
    transition: 0.3s;
  }
`;

const GithubButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 445px;
  height: 60px;
  margin: 20px 0px 0px 0px;
  color: #181600;
  border-radius: 30px;
  background-color: #fffafa;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
    transition: 0.3s;
  }
`;

const WarningText = styled.p`
  color: ${ColorStyle.Error};
  margin-top: 8px;
`;

export {
  LoginWrapper,
  LeftWrapper,
  Link,
  SvgWrapper,
  RightWrapper,
  Title,
  InputWrapperEmail,
  InputWrapperPw,
  StyledLabel,
  StyledInput,
  SubmitInput,
  DivideWrapper,
  DivideLine,
  DivideContent,
  KakaoButton,
  GithubButton,
  WarningText,
};
