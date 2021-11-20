/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import GrapTalkAddProfile from './GrapTalkAddProfile';
import { IconButton } from '@mui/material';
import { Text } from '../elements';
import { ReactComponent as Close } from '../svgs/CloseRound.svg';
import { ReactComponent as Search } from '../svgs/SearchSvg.svg';

import { closeNoneTalkRoomList } from '../features/chat/actions';
import { ColorStyle, Opacity } from '../utils/systemDesign';
const GrabTalkAdd = ({ noneTalkList, closeList }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const roomInfo = useSelector((state) => state.chat.noneChatList);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const dispatch = useDispatch();
  return (
    <div>
      <Header className="header">
        <SearchBarFrom>
        <Search />
          <input type="text" placeholder='   이름을 입력해 주세요' value={searchValue} onChange={handleSearchValue} />
        </SearchBarFrom>
        <IconButton onClick={closeList}>
          <Close />
        </IconButton>
      </Header>
      {noneTalkList.map((id) => {
        if (searchValue === '') {
          return <GrapTalkAddProfile key={id} userId={id} />;
        }
        if (
          roomInfo[id].userName
            .toLowerCase()
            .indexOf(searchValue.toLowerCase()) !== -1
        ) {
          return <GrapTalkAddProfile key={id} userId={id} />;
        }
        if (roomInfo[id].userName
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) === -1) {
          
            return '검색결과없쩡'
          }
      })}
    </div>
  );

  // return (
  //   <div>
  //      <Header className="header">
  //       <Text bold32>여긴 검색창이 들어갈 거에요</Text>
  //       <ChatSearchBar listIds={noneTalkList}/>
  //             <IconButton
  //               onClick={closeList}
  //             >
  //               <Close />
  //             </IconButton>
  //           </Header>
  //     {noneTalkList.map((id) => {
  //       return <GrapTalkAddProfile key={id} userId={ id}/>
  //     })}
  //   </div>
  // );
};

const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 700px;
  min-height: 80px;
  max-height: 80px;
  z-index: 1;

  button {
    position: absolute;
    right: 0px;
  }
`;

const SearchBarFrom = styled.div`
  display: flex;
  margin-left: 60px;
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

export default GrabTalkAdd;
