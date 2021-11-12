import React from 'react';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Text } from '../elements';
import { searchInfoDB, searchArrList } from '../features/cards/actions';
import { ColorStyle, FontScale } from '../utils/systemDesign';
import { ReactComponent as SearchSvg } from '../svgs/Search.svg';

const searchData = [
  '지오캐싱',
  '종이접기',
  '피겨스케이팅',
  'Javascript',
  'Java',
];

// const baseURL = process.env.REACT_APP_SERVER_URI;

const SearchBar = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  const [click, setClick] = React.useState(false);
  // const [searchFin, setSearchFin] = React.useState(false);
  const searchArr = [];
  const searchList = useSelector((state) => state.cards.searchArr);
  console.log(searchList);

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
  const [fetching, setFetching] = React.useState(false);
  const isSearching = useSelector((state) => state.cards.isSearching);

  const fetchMoreData = () => {
    setFetching(true);
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

    dispatch(searchInfoDB(searchInfo));

    setFetching(false);
  };

  const handleScroll = () => {
    const { scrollHeight } = document.documentElement;
    const { scrollTop } = document.documentElement;
    const { clientHeight } = document.documentElement;

    // console.log(scrollTop + clientHeight, scrollHeight, fetching);

    if (!isSearching) {
      return;
    }

    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
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
            <Text color="black" regular16>
              {val}
            </Text>
          </ContentBtn>
        </li>
      </ContentWrapper>
    );
  });

  return (
    <SearchWrapper
      onMouseLeave={() => {
        setClick(false);
      }}
    >
      {!tag ? (
        <StyledInput
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
      <SearchContent>
        {click ? (
          <div>
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
          </div>
        ) : null}
      </SearchContent>
      <br />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  position: relative;
`;

const CategoryWrapper = styled.div`
  width: fit-content;
  margin: 22px 0px 4px 0px;
`;

const ContentWrapper = styled.div`
  width: fit-content;
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
  background-color: white;
  cursor: pointer;
  border: none;
  margin: 0px 0px 14px 0px;
`;

const StyledInput = styled.input`
  width: 560px;
  height: 60px;
  padding: 0px 32px;
  border-radius: 50px;
  border: 3px solid ${ColorStyle.Gray500};
  font-size: ${FontScale.Body2_16};
  &:focus {
    outline: none;
  }
`;

const StyledHr = styled.hr`
  width: 560px;
`;

const StyledBtn = styled.button`
  width: fit-content;
  height: fit-content;
  background-color: white;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 18px;
  right: 450px;
`;

const SearchContent = styled.div`
  width: 560px;
  height: 100%;
  margin: auto;
  padding: 0px 32px;
  margin-top: 12px;
  background-color: white;
  border-radius: 30px;
  display: flex;
`;

export default SearchBar;
