/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import styled from 'styled-components';
import {
  setLoading,
  searchInfoDB,
  searchArrList,
  searchDataList,
  loadCardFrontDB,
} from '../features/cards/actions';
import { Text } from '../elements';

import { ColorStyle, FontScale, Opacity } from '../utils/systemDesign';
import { ReactComponent as SearchSvg } from '../svgs/Search.svg';
import { ReactComponent as CloseSvg } from '../svgs/Close.svg';

// const searchData = [
//   '지오캐싱',
//   '종이접기',
//   '피겨스케이팅',
//   'Javascript',
//   'Java',
//   'React',
//   '피그마',
//   '스케치업',
//   '포토샵',
// ];

const baseURL = process.env.REACT_APP_SERVER_URI;

const SearchBar = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  const [click, setClick] = React.useState(false);
  // const [searchFin, setSearchFin] = React.useState(false);
  const searchArr = [];
  const searchList = useSelector((state) => state.cards.searchArr);
  const searchData = useSelector((state) => state.cards.searchData);
  const selectCategory = useSelector((state) => state.cards.selectCategory);

  React.useEffect(async () => {
    try {
      const res = await axios.get(`${baseURL}/main/hashtag`);

      const { data } = res;

      const searchDataArr = [];
      data.forEach((val) => {
        searchDataArr.push(val.name);
      });
      dispatch(searchDataList(searchDataArr));
    } catch (error) {
      console.error(error);
    }
  }, []);

  React.useEffect(debounce(() => {
    searchData.filter((val) => {
      const searchIndex = val.toLocaleLowerCase().indexOf(data.toLocaleLowerCase());
      if (data.toLocaleLowerCase() === '') {
        return null;
      }
      if (searchIndex !== -1) {
        searchArr.splice(searchIndex, 0, val);
        // if (before >= searchIndex) {
        //   searchArr.unshift(val);
        //   before = searchIndex;
        // } else {
        //   searchArr.push(val);
        //   before = searchIndex;
        // }
      }
      // console.log(val);

      return searchArr;
    });
    if (searchArr !== []) {
      dispatch(searchArrList(searchArr));
    }
  }, 1000), [data]);

  let page = useSelector((state) => state.cards.searchInfo?.page);
  let field = useSelector((state) => state.cards.searchInfo?.field);
  // const [fetching, setFetching] = React.useState(false);
  const isSearching = useSelector((state) => state.cards.isSearching);
  const isLoading = useSelector((state) => state.cards.isLoading);

  const fetchMoreData = async () => {
    // console.log('페이지 확인', page);
    if (isSearching === false) {
      return;
    }

    await dispatch(setLoading(true));
    let searchInfo;

    if (page === undefined) {
      page = 0;
    }
    // console.log('페이지 변경 확인', page);
    if (field === undefined) {
      field = 3;
    }

    if (data === '') {
      searchInfo = {
        searchTags: [],
        type: 0,
        page: page + 1,
        field: field,
      };
    } else {
      searchInfo = {
        searchTags: [data],
        type: 0,
        page: page + 1,
        field: 3,
      };
    }

    await dispatch(searchInfoDB(searchInfo, selectCategory));

    // setFetching(false);
    await dispatch(setLoading(false));
  };

  const handleScroll = () => {
    const { scrollHeight } = document.documentElement;
    const { scrollTop } = document.documentElement;
    const { clientHeight } = document.documentElement;

    // console.log(scrollTop + clientHeight, scrollHeight, fetching);

    if (!isSearching) {
      return;
    }
    // fetching ==> isLoading
    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      fetchMoreData();
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const searchClick = async () => {
    const searchInfo = {
      searchTags: [data],
      type: 0,
      page: 0,
      field: 3,
    };
    if (data === '') {
      // console.log('검색어 아무것도 없을 때');
      await dispatch(loadCardFrontDB());
    } else {
      dispatch(searchInfoDB(searchInfo, data));
    }
    
  }

  const searchEnter = async (e) => {
    if (e.key === 'Enter') {
      searchClick()
      setClick(false);
      
      }
    }
  // const [tag, setTag] = React.useState(false);

  console.log(field)
  const ArrayData = searchList.map((val) => {
    return (
      <ContentWrapper key={val.toString()}>
        <li>
          <ContentBtn
            type="button"
            onClick={async () => {
              setData(val);
              const searchInfo = {
                searchTags: [val],
                type: 0,
                page: 0,
                field: 3,
              };
              await dispatch(searchInfoDB(searchInfo, val));
              // setTag(true);
              setClick(false);
            }}
          >
            <Text color="white" regular16>
              {val}
            </Text>
          </ContentBtn>
        </li>
      </ContentWrapper>
    );
  });

  return (
    <div
    // onMouseLeave={() => {
    //   setClick(false);
    // }}
    // onClick={() => {
    //   setClick(false);
    // }}
    >
      <SearchWrapper
      // onClick={() => {
      //   setClick(false);
      // }}
      >
        {data !== "" || click ? (
          <CloseWrapper
            onClick={() => {
              setClick(false);
              setData('');
            }}
          >
            <StyledCloseSvg />
          </CloseWrapper>
        ) : null}
        {/* {!tag ? (
          <StyledInput
            placeholder="어떤 분야에서 찾아볼까요?"
            onChange={(e) => {
              console.log(e.target.value);
              setData(e.target.value);
            }}
            onClick={() => {
              setClick(true);
            }}
          />
        ) : (
          <StyledInput
            placeholder="어떤 분야에서 찾아볼까요?"
            value={data}
            onChange={(e) => {
              console.log(e.target.value);
              setData(e.target.value);
            }}
            onClick={() => {
              setClick(true);
            }}
          />
        )} */}
          <StyledInput
            placeholder="어떤 분야에서 찾아볼까요?"
            value={data}
            onChange={(e) => {
              setData(e.target.value);
            }}
            onKeyPress={ searchEnter}
          
            onClick={() => {
              setClick(true);
            }}
            maxLength='28'
          />
        <StyledBtn
          type="button"
          onClick={searchClick}
        >
          <StyledSearchSvg />
        </StyledBtn>
      </SearchWrapper>
      <SearchContent>
        {click ? (
          <CategoryOuter>
            {/* <CloseBtn
              onClick={() => {
                setClick(false);
              }}
            >
              ✖
            </CloseBtn> */}
            <CategoryWrapper>
              <Text color={ColorStyle.Gray300} regular16>
                카테고리로 검색
              </Text>
            </CategoryWrapper>
            <ContentWrapper>
              <CategoryBtn
                type="button"
                onClick={async () => {
                  const searchInfo = {
                    searchTags: [],
                    type: 0,
                    page: 0,
                    field: 0,
                  };
                  await dispatch(searchInfoDB(searchInfo, '백엔드 개발자'));
                  // setSearchFin(true);
                  setClick(false);
                }}
              >
                {/* <Text color={ColorStyle.Gray500} regular16>
                  백엔드
                </Text> */}
                <CategorySpan>백엔드 개발자</CategorySpan>
              </CategoryBtn>
              <CategoryBtn
                type="button"
                onClick={async () => {
                  const searchInfo = {
                    searchTags: [],
                    type: 0,
                    page: 0,
                    field: 1,
                  };
                  await dispatch(searchInfoDB(searchInfo, '프론트엔드 개발자'));
                  // setSearchFin(true);
                  setClick(false);
                }}
              >
                {/* <Text color={ColorStyle.Gray500} regular16>
                  프론트엔드
                </Text> */}
                <CategorySpan>프론트엔드 개발자</CategorySpan>
              </CategoryBtn>
              <CategoryBtn
                type="button"
                onClick={async () => {
                  const searchInfo = {
                    searchTags: [],
                    type: 0,
                    page: 0,
                    field: 2,
                  };
                  await dispatch(searchInfoDB(searchInfo, '디자이너'));
                  // setSearchFin(true);
                  setClick(false);
                }}
              >
                {/* <Text color={ColorStyle.Gray500} regular16>
                  디자이너
                </Text> */}
                <CategorySpan>디자이너</CategorySpan>
              </CategoryBtn>
            </ContentWrapper>
            {searchList.length !== 0 ? <StyledHr /> : null}
            {/* <button
                    type="button"
                    onClick={async () => {
                      const searchInfo = {
                        searchTags: [],
                        type: 0,
                        page: 0,
                        field: 3,
                      };
                      await dispatch(searchInfoDB(searchInfo));
                      // setSearchFin(true);
                      setClick(false);
                    }}
                  >
                    전체
                  </button> */}
            <ul
              style={{
                marginTop: '16px',
              }}
            >
              {ArrayData}
            </ul>
          </CategoryOuter>
        ) : null}
      </SearchContent>
      <br />
    </div>
  );
};

const SearchWrapper = styled.div`
  position: relative;
  width: fit-content;
  margin: auto;
`;

const CloseBtn = styled.div`
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const CloseWrapper = styled.div`
  position: absolute;
  top: 17px;
  right: 70px;
  cursor: pointer;
`;

const CategoryOuter = styled.div`
  width: 560px;
  padding: 0px 32px;
  margin: auto;
  border-radius: 30px;
  background-color: ${ColorStyle.BackGround300 + Opacity[100]};
  position: relative;
`;

const CategoryWrapper = styled.div`
  width: fit-content;
  margin: 22px 0px 10px 0px;
  background-color: ${ColorStyle.BackGround300 + Opacity[100]};
`;

const ContentWrapper = styled.div`
  width: fit-content;
  background-color: ${ColorStyle.BackGround300 + Opacity[100]};
`;

const CategoryBtn = styled.button`
  width: fit-content;
  height: 32px;
  background-color: ${ColorStyle.PrimaryPurple};
  border-radius: 8px;
  border: none;
  margin: 0px 20px 16px 0px;
  cursor: pointer;
  &:hover {
    background-color: ${ColorStyle.HoverPurple};
    transition: 0.3s;
  }
`;

const CategorySpan = styled.span`
  color: ${ColorStyle.Gray500};
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  padding: 6px 12px;
`;

const ContentBtn = styled.button`
  background-color: ${ColorStyle.BackGround300};
  cursor: pointer;
  border: none;
  margin: 0px 0px 14px 0px;
`;

const StyledInput = styled.input`
  width: 560px;
  height: 60px;
  padding: 0px 32px;
  border-radius: 50px;
  border: none;
  /* font-size: ${FontScale.Body2_16}; */
  color: ${ColorStyle.Gray500};
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;
  background-color: ${ColorStyle.BackGround300};
  color: white;
  /* box-shadow: none; */
  &::placeholder {
    color: ${ColorStyle.Gray300};
    font-family: 'Pretendard';
    font-style: normal;
    font-size: 20px;
    line-height: 28px;
    font-weight: 400;
    background-color: ${ColorStyle.BackGround300};
  }
  &:focus {
    outline: none;
  }
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${ColorStyle.BackGround} inset !important;
    -webkit-text-fill-color: ${ColorStyle.Gray500} !important;
    /* background-color: ${ColorStyle.BackGround};
   color: ${ColorStyle.Gray500}; */
  }
`;

const StyledHr = styled.hr`
  width: 560px;
  height: 0.01px;
  border: solid 0.05px ${ColorStyle.Gray100 + Opacity[50]};
`;

const StyledBtn = styled.button`
  width: fit-content;
  height: fit-content;
  background-color: ${ColorStyle.BackGround300};
  color: ${ColorStyle.PrimaryPurple};
  border: none;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 26px;
`;

const StyledCloseSvg = styled(CloseSvg)`
  width: 28px;
  height: 28px;
`;

const StyledSearchSvg = styled(SearchSvg)`
  width: 30px;
  height: 30px;
  stroke: ${ColorStyle.PrimaryPurple};
  &:hover {
    stroke: ${ColorStyle.HoverPurple};
    transition: 0.3s;
  }
`

const SearchContent = styled.div`
  width: fit-content;
  height: 100%;
  margin: auto;
  /* padding: 0px 32px; */
  margin-top: 12px;
  background-color: ${ColorStyle.BackGround300 + Opacity[100]};
  border-radius: 30px;
  display: flex;
`;

export default SearchBar;
