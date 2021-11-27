/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import GrapTalkAddProfile from './GrapTalkAddProfile';
import { IconButton } from '@mui/material';
import { Text } from '../elements';
import { ReactComponent as Close } from '../svgs/CloseRound.svg';
import { ReactComponent as Search } from '../svgs/SearchSvg.svg';
//import { ReactComponent as SearchFail } from '../svgs/searchFail.svg';
import SearchFail from '../assets/image/searchFail.png';
//import { ReactComponent as NoneGrab } from '../svgs/noneGrab.svg';
import NoneGrab from '../assets/image/noneGrab.png';
import { closeNoneTalkRoomList } from '../features/chat/actions';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import { wrap } from 'lodash';
import ChatSearchBar from './Chat/ChatSearchBar';
import { maxWidth } from '@mui/system';
const GrabTalkAdd = ({ noneTalkList, closeList }) => {
  const [searchValue, setSearchValue] = React.useState('');
  // const roomInfo = useSelector((state) => state.chat.noneChatList);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const searchList = noneTalkList.filter((data) => {
    if (noneTalkList.length === 0) {
      return;
    } else if (searchValue === null) {
      return data;
    } else if (
      data.userName.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return data;
    } else if (
      data.userName.toLowerCase().indexOf(searchValue.toLowerCase()) === -1
    ) {
      return null;
    }
  });

  return (
    <Wrap>
      <Header className="header">
        <SearchBarFrom>
          <Search />
          <input
            type="text"
            placeholder="   이름을 입력해 주세요"
            maxLength="15"
            value={searchValue}
            onChange={handleSearchValue}
          />
        </SearchBarFrom>
        <IconButton onClick={closeList}>
          <Close stroke={ColorStyle.Gray500} />
        </IconButton>
      </Header>
      <div
        style={{
          paddingRight: '24px',
          paddingTop: '16px',
          maxWidth: '580px',
          // textAlign: 'center',
        }}
      >
        {noneTalkList.length === 0 && (
          <NoneValueText>
            <div className="svg">
              <img src={NoneGrab} width="140px" height="140px" />
            </div>
            <Text regular20 color={ColorStyle.Gray300}>
              아직 그랩 된 친구가 없어요
              <br />
              탭해서 그랩이 되면 대화 할 수 있어요
            </Text>
          </NoneValueText>
        )}
        {searchList.length !== 0 &&
          searchList.map((val) => {
            return (
              <GrapTalkAddProfile
                key={val.userId}
                roomInfo={val}
                closeList={closeList}
              />
            );
          })}
        {searchList.length === 0 && noneTalkList.length !== 0 && (
          <>
            {/* <div style={{width:'fit-content', paddingLeft:'81px'}}> */}
            <NoneValueText>
              <div className="svg">
                <img src={SearchFail} width="120px" height="120px" />
              </div>
              <Text regular20 color={ColorStyle.Gray300}>
                나의 그랩에서 ‘{searchValue}’님을 찾을 수 없습니다
              </Text>
            </NoneValueText>
            {/* </div> */}
          </>
        )}
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-width: 665px;
  overflow-y: scroll;
  max-height: 760px;
  padding-left: 48px;
`;
const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 665px;
  min-height: 80px;
  max-height: 80px;
  z-index: 1;

  button {
    padding: 0px;
    margin-left: 48px;
  }
`;

const SearchBarFrom = styled.div`
  display: flex;
  height: 46px;
  width: 523px;
  border-bottom: 1px solid ${ColorStyle.Gray300};

  input {
    margin-left: 16px;
    height: 45px;
    width: 410px;
    box-sizing: border-box;
    background-color: ${ColorStyle.BackGround};
    border: 0px;
    color: ${ColorStyle.Gray500};

    font-family: 'Pretendard';
    font-style: normal;
    font-size: 20px;
    font-weight: 400;

    ::placeholder {
      font-family: 'Pretendard';
      font-style: normal;
      font-size: 20px;
      font-weight: 400;
      color: ${ColorStyle.Gray300};
    }
    :focus {
      outline: none;
    }
  }
`;

const NoneValueText = styled.div`
  word-break: break-all;
  text-align: center;
  width: 617px;
  box-sizing: border-box;
  border-radius: 16px;
  margin-top: 30px;
  background-color: ${ColorStyle.BackGround100 + Opacity[70]};
  padding: 32px;
  .svg {
    width: fit-content;
    margin: 0px auto 20px auto;
  }
`;

export default GrabTalkAdd;
