/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setLoading } from '../features/cards/actions';
import { Text } from '../elements';
import { searchInfoDB, searchArrList, searchDataList } from '../features/cards/actions';
import { ColorStyle, FontScale, Opacity } from '../utils/systemDesign';
import { ReactComponent as SearchSvg } from '../svgs/Search.svg';
import { Checkbox } from '@mui/material';
import { style } from '@mui/system';

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
  console.log(searchList);
  const searchData = useSelector((state) => state.cards.searchData);

  React.useEffect(async () => {
    try {
      const res = await axios.get(`${baseURL}/main/hashtag`);

      const { data } = res;

      console.log(data);
      const searchDataArr = [];
      data.forEach((val) => {
        searchDataArr.push(val.name);
      });
      console.log(searchDataArr);
      dispatch(searchDataList(searchDataArr));
    }
    catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    searchData.filter((val) => {
      if (data.toLocaleLowerCase() === '') {
        return null;
      }
      if (val.toLocaleLowerCase().indexOf(data.toLocaleLowerCase()) !== -1) {
        searchArr.push(val);
      }
      // console.log(val);
      console.log(searchArr);

      return searchArr;
    });
    if (searchArr !== []) {
      dispatch(searchArrList(searchArr));
    }
  }, [data]);

  const page = useSelector((state) => state.cards.searchInfo?.page);
  const field = useSelector((state) => state.cards.searchInfo?.field);
  // const [fetching, setFetching] = React.useState(false);
  const isSearching = useSelector((state) => state.cards.isSearching);
  const isLoading = useSelector((state) => state.cards.isLoading);

  const fetchMoreData = async () => {
    console.log('카드 로딩 안되는지 확인===>', isSearching);
    if (isSearching === false) {
      return;
    }

    await dispatch(setLoading(true));
    let searchInfo;

    if (data === '') {
      searchInfo = {
        searchTags: [],
        type: 0,
        page: page + 1,
        field,
      };
    } else {
      searchInfo = {
        searchTags: [data],
        type: 0,
        page: page + 1,
        field: 3,
      };
    }

    await dispatch(searchInfoDB(searchInfo));

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

  const [tag, setTag] = React.useState(false);

  const ArrayData = searchList.map((val) => {
    return (
      <ContentWrapper>
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
              await dispatch(searchInfoDB(searchInfo));
              setTag(true);
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
        {!tag ? (
          <StyledInput
            placeholder='어떤 분야에서 찾아볼까요?'
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
            placeholder='어떤 분야에서 찾아볼까요?'
            value={data}
            onChange={(e) => {
              console.log(e.target.value);
              setData(e.target.value);
            }}
            onClick={() => {
              setClick(true);
            }}
          />
        )}
        <StyledBtn
          type="button"
          onClick={() => {
            const searchInfo = {
              searchTags: [data],
              type: 0,
              page: 0,
              field: 3,
            };
            dispatch(searchInfoDB(searchInfo));
          }}
        >
          <SearchSvg stroke={ColorStyle.PrimaryPurple} />
        </StyledBtn>
      </SearchWrapper>
      <SearchContent>
        {click ? (
          <CategoryOuter>
            <CloseBtn onClick={
              () => {
                setClick(false);
              }
            }>✖</CloseBtn>
            <CategoryWrapper>
              <Text color={ColorStyle.Gray300} regular16>
                카테고리
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
                  await dispatch(searchInfoDB(searchInfo));
                  // setSearchFin(true);
                  setClick(false);
                }}
              >
                <Text color={ColorStyle.Gray500} regular16>
                  백엔드
                </Text>
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
                  await dispatch(searchInfoDB(searchInfo));
                  // setSearchFin(true);
                  setClick(false);
                }}
              >
                <Text color={ColorStyle.Gray500} regular16>
                  프론트엔드
                </Text>
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
                  await dispatch(searchInfoDB(searchInfo));
                  // setSearchFin(true);
                  setClick(false);
                }}
              >
                <Text color={ColorStyle.Gray500} regular16>
                  디자이너
                </Text>
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
            <ul>{ArrayData}</ul>
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
  margin: 22px 0px 4px 0px;
  background-color: ${ColorStyle.BackGround300 + Opacity[100]};
`;

const ContentWrapper = styled.div`
  width: fit-content;
  background-color: ${ColorStyle.BackGround300 + Opacity[100]};

`;

const CategoryBtn = styled.button`
  width: 113px;
  height: 32px;
  background-color: ${ColorStyle.PrimaryPurple};
  border-radius: 8px;
  border: none;
  margin: 0px 20px 16px 0px;
  cursor: pointer;
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
  font-size: ${FontScale.Body2_16};
  background-color: ${ColorStyle.BackGround300};
  color: white;
  &::placeholder {
    color: ${ColorStyle.Gray300};
  }
  &:focus {
    outline: none;
  }
`;

const StyledHr = styled.hr`
  width: 560px;
  height: 0.01px;
  background-color: ${ColorStyle.Gray300};
  border: solid 0.05px ${ColorStyle.Gray300 + Opacity[20]};
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
