import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import {
  searchStackList,
  updateStack,
  deleteStack,
} from '../features/cards/actions';

import { ReactComponent as MypageSearch } from '../svgs/MypageSearch.svg';

import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';
// import { Grid } from '../elements';

const searchData = [
  'JavaScript',
  'Java',
  'Node.js',
  'Python',
  'Flutter',
  '제플린',
  '프로크리에이트',
  '파워포인트',
  'React Native',
  'React',
  'Vue.js',
  'C++',
  'Angular',
  '애프터이펙트',
  'Go',
  'C#',
  'TypeScript',
  'SQL',
  'MySQL',
  'JSP',
  'Django',
  'FastAPI',
  'PostgreSQL',
  '프리미어',
  'NestJS',
  'PMO',
  'EEO',
  'FCC',
  'QFD',
  'VR',
  'Zemax',
  'WAN',
  '피그마',
  '스케치',
  '오토캐드',
  '스케치업',
  '포토샵',
  '일러스트레이터',
  '인디자인',
  '어도비XD',
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
      dispatch(searchStackList(searchArr));
    }
  }, [data]);

  const ArrayData = searchList.map((val) => {
    console.log(stackList.length);
    // if (stackList.length === 1) {
    //   return (
    //     <Box key={val.toString()}>
    //       {button[val] ? (
    //         <TagDiv
    //           type="button"
    //           onClick={async () => {
    //             console.log('test');
    //             setData(val);
    //             setClick(true);
    //             toggleButton(val);
    //             console.log(button[val]);
    //             await dispatch(deleteStack(val));
    //             console.log('1', button);
    //           }}
    //           style={{
    //             backgroundColor: '#8c4dff',
    //           }}
    //         >
    //           <span>{val}</span>
    //         </TagDiv>
    //       ) : (
    //         <TagDiv
    //           type="button"
    //           onClick={() => {
    //             console.log('test');
    //             setData(val);
    //             setClick(true);
    //             console.log('2', button);
    //           }}
    //         >
    //           <span>{val}</span>
    //         </TagDiv>
    //       )}
    //     </Box>
    //   );
    // }
    return (
      <Box key={val.toString()}>
        <TagDiv
          type="button"
          onClick={async () => {
            console.log('wowow');
            setData(val);
            setClick(true);
            toggleButton(val);
            console.log('3', button);
            await dispatch(updateStack(val));
          }}
        >
          <span>{val}</span>
        </TagDiv>
      </Box>
    );
  });

  const FullList = searchData.filter((val) => {
    console.log(stackList, val);
    console.log(stackList?.includes(val));
    return (
      <Box key={val.toString()}>
        {stackList.includes(val) ? (
          <div>
            {toggleButton(val)}
            {console.log('체크되는지 확인1', button)}
            <TagDiv
              type="button"
              onClick={async () => {
                console.log('test');
                setData(val);
                setClick(true);
                toggleButton(val);
                console.log('6', button);
                await dispatch(deleteStack(val));
              }}
              style={{
                backgroundColor: '#8c4dff',
              }}
            >
              <span>{val}</span>
            </TagDiv>
          </div>
        ) : (
          <div>
            {console.log('체크되는지 확인2', button)}
            <TagDiv
              type="button"
              onClick={async () => {
                console.log('test');
                setData(val);
                setClick(true);
                toggleButton(val);
                console.log('7', button);
                await dispatch(updateStack(val));
              }}
            >
              <span>{val}</span>
            </TagDiv>
          </div>
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

      <br />
    </div>
  );
};

export default StackSearch2;

const Box = styled.div`
  display: flex;
`;

const AllBox = styled.div`
  display: flex;
  margin: 43px 165px 72px 165px;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
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
