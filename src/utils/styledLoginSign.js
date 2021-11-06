import styled from 'styled-components';

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const LeftWrapper = styled.div`
  width: 50%;
  height: 1080px;
  background-color: #141422;
`;

const RightWrapper = styled.div`
  width: 50%;
  height: 1080px;
  background-color: #1d1d22;
  color: #f5f3f8;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 32px;
  margin: 160px 0px 64px 0px;
`;

const StyledInput = styled.input`
  width: 445px;
  height: 30px;
  color: #f5f3f8;
  background-color: #1d1d22;
  border-bottom: 1px solid #4d4759;
  border-right: none;
  &:focus {
    outline: none;
  }
`;

const SubmitInput = styled.input`
  width: 445px;
  height: 60px;
  margin: 60px 0px 0px 0px;
  color: white;
  font-size: 20px;
  border-radius: 30px;
  background-color: #8c4dff;
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
  width: 445px;
  height: 60px;
  margin: 60px 0px 0px 0px;
  color: 181600;
  font-size: 20px;
  border-radius: 30px;
  background-color: #e5d32e;
  border: none;
  cursor: pointer;
`;

const WarningText = styled.p`
  color: #ed4956;
  margin: 0px;
`;

export {
  LoginWrapper,
  LeftWrapper,
  RightWrapper,
  Title,
  StyledInput,
  SubmitInput,
  DivideWrapper,
  DivideLine,
  DivideContent,
  KakaoButton,
  WarningText,
};
