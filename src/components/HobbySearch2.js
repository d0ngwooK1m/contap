/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import {
  searchHobbyList,
  updateHobby,
  deleteHobby,
  // updateCard,
} from '../features/cards/actions';

import { ReactComponent as MypageSearch } from '../svgs/MypageSearch.svg';

import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';
import { Text } from '../elements';
import { truncate } from 'lodash';

// import { Grid, Text } from '../elements';

// const baseURL = process.env.REACT_APP_SERVER_URI;

const HobbySearch2 = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  const [click, setClick] = React.useState(false);
  const [maxMessage, setMaxMessage] = React.useState(false);

  const searchArr = [];
  const searchList = useSelector((state) => state.cards.hobbyArr);
  // const hobbyList = useSelector((state) => state.cards.hobby);
  let hobbyList = useSelector((state) => state.cards.hobby);
  console.log('하비리스트===>', hobbyList);
  const searchData = useSelector((state) => state.cards.hobbyTag);

  if (hobbyList[0] === '') {
    hobbyList = [];
    console.log('하비리스트2===>', hobbyList);
  }

  // const [button, setButton] = React.useState({});
  // const toggleButton = (id) => {
  //   setButton((prevButton) => ({
  //     ...prevButton,
  //     [id]: !prevButton[id],
  //   }));
  // };

  // console.log(button);

  React.useEffect(
    debounce(() => {
      if (data === '') {
        console.log('data');
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
    }, 1000),
    [data],
  );

  React.useEffect(() => {
    setData('');
    if (click === true) {
      setClick(false);
    }
  }, [click]);

  const ArrayData = searchList.map((val) => {
    const hobbySearchFunc = hobbyList.includes(val)
      ? async () => {
          setData(val);
          setClick(true);
          await dispatch(deleteHobby(val));
        }
      : async () => {
          console.log('hobbyList.length =>', hobbyList.length);
          if (hobbyList.length === 3) {
            return;
          }
          setData(val);
          setClick(true);
          await dispatch(updateHobby(val));
        };
    const BtnSearchColor = hobbyList.includes(val)
      ? `${ColorStyle.PrimaryPurple}`
      : `${ColorStyle.BackGround}`;
    const HoverColor = hobbyList.includes(val)
      ? `${ColorStyle.HoverPurple}`
      : `${ColorStyle.BackGround300}`;
    return (
      <Box key={val.toString()}>
        <TagDiv
          color={BtnSearchColor}
          hover={HoverColor}
          type="button"
          onClick={hobbySearchFunc}
        >
          <span>{val}</span>
        </TagDiv>
      </Box>
    );
  });

  const FullList = searchData.map((val) => {
    const hobbyFunc = hobbyList.includes(val)
      ? async () => {
          setData(val);
          setClick(true);
          await dispatch(deleteHobby(val));
          setMaxMessage(false);
        }
      : async () => {
          if (hobbyList.length === 3) {
            //setMaxMessage(true);
            // window.alert('1');
            return setMaxMessage(true);
          }
          setData(val);
          setClick(true);
          await dispatch(updateHobby(val));
        };
    const BtnColor = hobbyList.includes(val)
      ? `${ColorStyle.PrimaryPurple}`
      : `${ColorStyle.BackGround}`;
    const HoverColor = hobbyList.includes(val)
      ? `${ColorStyle.HoverPurple}`
      : `${ColorStyle.BackGround300}`;
    return (
      <Box key={val.toString()}>
        <TagDiv
          color={BtnColor}
          hover={HoverColor}
          type="button"
          onClick={hobbyFunc}
        >
          <span>{val}</span>
        </TagDiv>
      </Box>
    );
  });

  const inputValue = click ? '' : data;

  return (
    <div>
      {/* {!click ? (
        <SearchBoxDiv>
          <SearchBox
            onChange={(e) => {
              console.log(e.target.value);
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
              console.log(e.target.value);
              setData(e.target.value);
            }}
          />
          <SearchIconDiv>
            <MypageSearch />
          </SearchIconDiv>
        </SearchBoxDiv>
      )} */}
      <SearchBoxDiv>
        <SearchBox
          value={inputValue}
          onChange={(e) => {
            console.log(e.target.value);
            setData(e.target.value);
          }}
          placeholder="요즘 관심사는 뭐예요?"
        />
        <SearchIconDiv>
          <MypageSearch />
        </SearchIconDiv>
      </SearchBoxDiv>

      {/* {console.log(FullList)} */}
      {/* {!click ? <AllBox> {ArrayData}</AllBox> : <AllBox>{FullList}</AllBox>} */}
      {data !== '' ? (
        <AllBox> {ArrayData}</AllBox>
      ) : (
        <AllBox>
          <div
            style={{
              position: 'absolute',
              top: '-7%',
              left: '1%',
            }}
          >
            <Text regular16 color={ColorStyle.PrimaryPurple}>
              {maxMessage ? '3개 모두 선택하셨어요!' : ''}
            </Text>
          </div>
          {FullList}
        </AllBox>
      )}
      <br />
    </div>
  );
};

export default HobbySearch2;

const Box = styled.div`
  display: flex;
`;

const AllBox = styled.div`
  display: flex;
  width: 1100px;
  margin: 63px 165px 119px 154px;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  padding-top: 10px;
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
  background-color: ${(props) => props.color};
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hover};
    transition: 0.3s;
  }
`;

// const PurpleButton = styled.div`
//   display: inline-block;
//   margin: 10px;
//   background: ${ColorStyle.PrimaryPurple};
//   padding: 7px 10px;
//   border-radius: 50px;
//   border: 1px solid ${ColorStyle.PrimaryPurple};
//   font-size: ${FontScale.Caption_14};
//   font-family: ${FontFamily};
//   color: ${ColorStyle.Gray500};
//   font-weight: 400;
//   text-align: center;
//   cursor: pointer;
// `;

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
