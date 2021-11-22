/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import {
  searchStackList,
  updateStack,
  deleteStack,
} from '../features/cards/actions';

import { Grid } from '../elements';
import { ReactComponent as MypageSearch } from '../svgs/MypageSearch.svg';

import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';
// import { Grid } from '../elements';

const searchData = [
  'Spring',
  'Spring Boot',
  'Java',
  'React',
  'React Native',
  'Flutter',
  'Node.js',
  'Python',
  'Zeplin',
  'Angular',
  'Vue.js',
  'C++',
  'Express',
  'C#',
  'Django',
  'Next.js',
  'Ruby',
  'Java Script',
  'Premiere Pro',
  'After Effects',
  'C',
  'Android Studio',
  'HTML CSS',
  'SQL',
  'TypeScript',
  'Swift',
  'Assembly',
  'PHP',
  'Nuxt.js',
  'Flask',
  'Nest.js',
  'Figma',
  'Sketch',
  'Adobe XD',
  'Illustrator',
  'Photoshop',
  'Proto.io',
  'AutoCAD',
  'JQuery',
  'Go',
];

// const baseURL = process.env.REACT_APP_SERVER_URI;

const StackSearch2 = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  const [click, setClick] = React.useState(false);
  const searchArr = [];
  const searchList = useSelector((state) => state.cards.stackArr);
  // console.log('서치리스트===>', searchList);
  const stackList = useSelector((state) => state.cards.stack);
  // const [button, setButton] = React.useState({});
  // const toggleButton = (id) => {
  //   setButton((prevButton) => ({
  //     ...prevButton,
  //     [id]: !prevButton[id],
  //   }));
  // };

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
      dispatch(searchStackList(searchArr));
    }
  }, [data]);

  const ArrayData = searchList.map((val) => {
    const stackSearchFunc = stackList.includes(val)
      ? async () => {
          console.log('test');
          setData(val);
          setClick(true);
          // toggleButton(val);
          // console.log('6', button);
          await dispatch(deleteStack(val));
        }
      : async () => {
          console.log('test');
          setData(val);
          setClick(true);
          // toggleButton(val);
          // console.log('7', button);
          await dispatch(updateStack(val));
        };
    const BtnSearchColor = stackList.includes(val)
      ? `${ColorStyle.PrimaryPurple}`
      : `${ColorStyle.BackGround}`;
    return (
      <Box key={val.toString()}>
        {/* {toggleCheck} */}
        <TagDiv color={BtnSearchColor} type="button" onClick={stackSearchFunc}>
          <span>{val}</span>
        </TagDiv>
      </Box>
    );
  });

  const FullList = searchData.map((val) => {
    console.log(stackList, val);
    console.log(stackList?.includes(val));
    const stackFunc = stackList.includes(val)
      ? async () => {
          console.log('test');
          setData(val);
          setClick(true);
          // toggleButton(val);
          // console.log('6', button);
          await dispatch(deleteStack(val));
        }
      : async () => {
          console.log('test');
          setData(val);
          setClick(true);
          // toggleButton(val);
          // console.log('7', button);
          await dispatch(updateStack(val));
        };
    // const toggleCheck = stackList.includes(val) ? toggleButton(val) : null;
    const BtnColor = stackList.includes(val)
      ? `${ColorStyle.PrimaryPurple}`
      : `${ColorStyle.BackGround}`;
    return (
      <Box key={val.toString()}>
        {/* {toggleCheck} */}
        <TagDiv color={BtnColor} type="button" onClick={stackFunc}>
          <span>{val}</span>
        </TagDiv>
      </Box>
    );
  });

  return (
    <StackDiv>
      {!click ? (
        <SearchBoxDiv>
          <SearchBox
            onChange={(e) => {
              console.log(e.target.value);
              setData(e.target.value);
            }}
            placeholder="주로 사용하시는 기술이 있나요?"
          />
          <SearchIconDiv>
            <MypageSearch />
          </SearchIconDiv>
        </SearchBoxDiv>
      ) : (
        <SearchBoxDiv>
          <SearchBox
            onChange={(e) => {
              console.log(e.target.value);
              setData(e.target.value);
            }}
            value={data}
          />
          <SearchIconDiv>
            <MypageSearch />
          </SearchIconDiv>
        </SearchBoxDiv>
      )}
      {!click ? <AllBox>{ArrayData}</AllBox> : <AllBox>{FullList}</AllBox>}
      {/* <AllBox>{FullList}</AllBox> */}
    </StackDiv>
  );
};

export default StackSearch2;

const StackDiv = styled.div`
  margin-bottom: 72px;
`;

const Box = styled.div`
  display: flex;
`;

const AllBox = styled.div`
  display: flex;
  width: 1180px;
  margin: 43px 165px 72px 165px;
  padding-bottom: 72px;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px solid ${ColorStyle.BackGround300};
`;

// const ArrayBox = styled.div`
// display: flex;
// margin: 48px 165px;
// justify-content: space-around;
// align-items: center;
// flex-direction: row;
// flex-wrap: wrap;
// `;

const TagDiv = styled.div`
  display: inline-block;
  width: 100%;
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
