import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import {
  searchStackList,
  updateStack,
  deleteStack,
} from '../features/cards/actions';

import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';
// import { Text } from '../elements';

const searchData = ['Javascript', 'Java', 'Node.JS', 'Python'];

// const baseURL = process.env.REACT_APP_SERVER_URI;

const StackSearch = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  const [click, setClick] = React.useState(false);
  const searchArr = [];
  const searchList = useSelector((state) => state.cards.stackArr);
  const stackList = useSelector((state) => state.cards.stack);

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
      if (val.indexOf(data) !== -1) {
        searchArr.push(val);
      }
      // console.log(val);
      // console.log(searchArr);

      return searchArr;
    });
    if (searchArr !== []) {
      dispatch(searchStackList(searchArr));
    }
  }, [data]);

  const ArrayData = searchList.map((val) => {
    console.log(stackList.length);
    if (stackList.length === 1) {
      return (
        <Box key={val.toString()}>
          {button[val] ? (
            <TagDiv
              type="button"
              onClick={async () => {
                console.log('test');
                setData(val);
                setClick(true);
                toggleButton(val);
                console.log(button[val]);
                await dispatch(deleteStack(val));
                console.log(button);
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
                console.log('test');
                setData(val);
                setClick(true);
                console.log(button);
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
            console.log('wowow');
            setData(val);
            setClick(true);
            toggleButton(val);
            console.log(button);
            await dispatch(updateStack(val));
          }}
        >
          <span>{val}</span>
        </TagDiv>
      </Box>
    );
  });

  const FullList = searchData.map((val) => {
    console.log(stackList.length);
    if (stackList.length === 1) {
      return (
        <Box key={val.toString()}>
          {button[val] ? (
            <TagDiv
              type="button"
              onClick={async () => {
                console.log('test');
                setData(val);
                setClick(true);
                toggleButton(val);
                console.log(button[val]);
                await dispatch(deleteStack(val));
                console.log(button);
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
                console.log('test');
                setData(val);
                setClick(true);
                console.log(button);
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
          <TagDiv
            type="button"
            onClick={async () => {
              console.log('test');
              setData(val);
              setClick(true);
              toggleButton(val);
              console.log(button);
              await dispatch(deleteStack(val));
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
            onClick={async () => {
              console.log('test');
              setData(val);
              setClick(true);
              toggleButton(val);
              console.log(button);
              await dispatch(updateStack(val));
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
        <SearchBox
          onChange={(e) => {
            console.log(e.target.value);
            setData(e.target.value);
          }}
        />
      ) : (
        <SearchBox
          onChange={(e) => {
            console.log(e.target.value);
            setData(e.target.value);
          }}
          value={data}
        />
      )}
      <AllBox>{!click ? ArrayData : FullList}</AllBox>
      <br />
    </div>
  );
};

export default StackSearch;

const Box = styled.div`
  display: flex;
`;

const AllBox = styled.div`
  display: flex;
  margin: 48px 165px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const TagDiv = styled.div`
  display: inline-block;
  margin: 10px;
  padding: 7px 10px;
  border-radius: 50px;
  border: 1px solid ${ColorStyle.PrimaryPurple};
  font-size: ${FontScale.Caption_14};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  font-weight: 400;
  text-align: center;
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
