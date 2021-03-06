import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import {
  searchHobbyList,
  updateHobby,
  deleteHobby,
} from '../features/cards/actions';

import { ReactComponent as MypageSearch } from '../svgs/MypageSearch.svg';

import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';

// import { Grid, Text } from '../elements';

const searchData = [
  '숨쉬기',
  '밥먹기',
  '걷기',
  '뛰기',
  '가만히 있기',
  '지오캐싱',
  '종이접기',
  '피겨 스케이팅',
  '맛집탐방',
  '음악감상',
  '카페탐방',
  '산책',
  '독서',
  '스노우보드',
  '스키',
  '낚시',
];

// const baseURL = process.env.REACT_APP_SERVER_URI;

const HobbySearch = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  const [click, setClick] = React.useState(false);
  const searchArr = [];
  const searchList = useSelector((state) => state.cards.hobbyArr);
  // const hobbyList = useSelector((state) => state.cards.hobby);
  let hobbyList = useSelector((state) => state.cards.hobby);
  if (hobbyList.length === 1) {
    if (hobbyList[0] === '') {
      hobbyList = [];
    }
  }
  const [button, setButton] = React.useState({});
  const toggleButton = (id) => {
    setButton((prevButton) => ({
      ...prevButton,
      [id]: !prevButton[id],
    }));
  };

  React.useEffect(() => {
    if (data === '') {
      setClick(false);
    }
    searchData.filter((val) => {
      if (val.toLowerCase().indexOf(data.toLowerCase()) !== -1) {
        searchArr.push(val);
      }
      // console.log(val);
      // console.log(searchArr);

      return searchArr;
    });
    if (searchArr !== []) {
      dispatch(searchHobbyList(searchArr));
    }
  }, [data]);

  const ArrayData = searchList.map((val) => {
    if (hobbyList.length === 3) {
      return (
        <Box key={val.toString()}>
          {button[val] ? (
            <TagDiv
              type="button"
              onClick={async () => {
                setData(val);
                setClick(true);
                toggleButton(val);
                await dispatch(deleteHobby(val));
              }}
              style={{
                backgroundColor: '#8c4dff',
              }}
            >
              <span>{val}</span>
            </TagDiv>
          ) : (
            <TagDiv
              type="button"
              onClick={() => {
                setData(val);
                setClick(true);
              }}
            >
              <span>{val}</span>
            </TagDiv>
          )}
        </Box>
      );
    }
    return (
      <Box key={val.toString()}>
        <TagDiv
          type="button"
          onClick={async () => {
            setData(val);
            setClick(true);
            toggleButton(val);
            await dispatch(updateHobby(val));
          }}
        >
          <span>{val}</span>
        </TagDiv>
      </Box>
    );
  });

  const FullList = searchData.map((val) => {
    if (hobbyList.length === 3) {
      return (
        <Box key={val.toString()}>
          {button[val] ? (
            <TagDiv
              type="button"
              onClick={async () => {
                setData(val);
                setClick(true);
                toggleButton(val);
                await dispatch(deleteHobby(val));
              }}
              style={{
                backgroundColor: '#8c4dff',
              }}
            >
              <span>{val}</span>
            </TagDiv>
          ) : (
            <TagDiv
              type="button"
              onClick={() => {
                setData(val);
                setClick(true);
              }}
            >
              <span>{val}</span>
            </TagDiv>
          )}
        </Box>
      );
    }
    return (
      <Box key={val.toString()}>
        {button[val] ? (
          <PurpleButton
            type="button"
            onClick={async () => {
              setData(val);
              setClick(true);
              toggleButton(val);
              await dispatch(deleteHobby(val));
            }}
            // style={{
            //   backgroundColor: 'purple',
            // }}
          >
            <span>{val}</span>
          </PurpleButton>
        ) : (
          <TagDiv
            type="button"
            onClick={async () => {
              setData(val);
              setClick(true);
              toggleButton(val);
              await dispatch(updateHobby(val));
            }}
          >
            <span>{val}</span>
          </TagDiv>
        )}
      </Box>
    );
  });

  return (
    <div>
      {!click ? (
        <SearchBoxDiv>
          <SearchBox
            onChange={(e) => {
              setData(e.target.value);
            }}
            placeholder="요즘 관심사는 뭐예요?"
          />
          <SearchIconDiv>
            <MypageSearch />
          </SearchIconDiv>
        </SearchBoxDiv>
      ) : (
        <SearchBoxDiv>
          <SearchBox
            value={data}
            onChange={(e) => {
              setData(e.target.value);
            }}
          />
          <SearchIconDiv>
            <MypageSearch />
          </SearchIconDiv>
        </SearchBoxDiv>
      )}

      {!click ? <AllBox> {ArrayData}</AllBox> : <AllBox>{FullList}</AllBox>}
      <br />
    </div>
  );
};

export default HobbySearch;

const Box = styled.div`
  display: flex;
`;

const AllBox = styled.div`
  display: flex;
  margin: 43px 165px 119px 165px;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TagDiv = styled.div`
  display: inline-block;
  margin: 10px;
  padding: 12px 20px;
  border-radius: 50px;
  border: 1px solid ${ColorStyle.PrimaryPurple};
  font-size: ${FontScale.Body2_16};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  font-weight: 400;
  text-align: center;
  cursor: pointer;
`;

const PurpleButton = styled.div`
  display: inline-block;
  margin: 10px;
  background: ${ColorStyle.PrimaryPurple};
  padding: 7px 10px;
  border-radius: 50px;
  border: 1px solid ${ColorStyle.PrimaryPurple};
  font-size: ${FontScale.Caption_14};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  font-weight: 400;
  text-align: center;
  cursor: pointer;
`;

const SearchBoxDiv = styled.div`
  position: relative;
`;

const SearchBox = styled.input`
  width: 412px;
  height: 35px;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray300};
  background-color: ${ColorStyle.BackGround};
  border-bottom: 1px solid ${ColorStyle.Gray300};
  border-right: none;
  border-top: none;
  border-left: none;
  &:focus {
    outline: none;
  }
  margin-left: 165px;
  padding-left: 50px;
`;

const SearchIconDiv = styled.div`
  position: absolute;
  top: 10%;
  left: 12%;
`;
