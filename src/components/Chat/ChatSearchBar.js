/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { ColorStyle, Opacity } from '../../utils/systemDesign';
import { IconButton } from '@mui/material';
import { ReactComponent as Close } from '../../svgs/CloseRound.svg';
import { ReactComponent as Search } from '../../svgs/SearchSvg.svg';
import GrapTalkAddProfile from '../GrapTalkAddProfile';
import { Text } from '../../elements';
const ChatSearchBar = ({ list, children }) => {
  const [searchValue, setSearchValue] = React.useState('');

  const items = list.filter((data) => {
    if (list.length === 0) {
      return false;
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
    console.log(items);
  });

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Wrap>
      <Header className="header">
        <SearchBarFrom>
          <Search />
          <input
            type="text"
            placeholder="   이름을 입력해 주세요"
            value={searchValue}
            onChange={handleSearchValue}
          />
        </SearchBarFrom>
        <IconButton>
          <Close stroke={ColorStyle.Gray500} />
        </IconButton>
      </Header>
      <div style={{ paddingRight: '24px', paddingTop: '40px' }}>
        {items.map((val) => {
          return <GrapTalkAddProfile key={val.userId} roomInfo={val} />;
        })}
      </div>
      {/* <NoneValueText>
      <Text bold32 color={ColorStyle.Gray500}>
        검색결과없쩡
      </Text>
    </NoneValueText> */}
    </Wrap>
  );
};

const Wrap = styled.div`
  padding-left: 48px;
  min-width: 665px;
  overflow-y: scroll;
  max-height: 760px;
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
export default ChatSearchBar;
