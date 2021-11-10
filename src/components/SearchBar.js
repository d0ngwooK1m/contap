import React from 'react';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { searchInfoDB, searchArrList } from '../features/cards/actions';

const searchData = ['지오캐싱', '종이접기', '피겨스케이팅'];

// const baseURL = process.env.REACT_APP_SERVER_URI;

const SearchBar = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  const searchArr = [];
  const searchList = useSelector((state) => state.cards.searchArr);

  React.useEffect(() => {
    searchData.filter((val) => {
      if (val === data) {
        return null;
      }
      if (val.indexOf(data) !== -1) {
        searchArr.push(val);
      }
      // console.log(val);
      // console.log(searchArr);

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
        field,
      };
    }

    dispatch(searchInfoDB(searchInfo));

    setFetching(false);
  };

  const handleScroll = () => {
    const { scrollHeight } = document.documentElement;
    const { scrollTop } = document.documentElement;
    const { clientHeight } = document.documentElement;

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
      <li>
        <button
          type="button"
          onClick={() => {
            setData(val);
            setTag(true);
          }}
        >
          <span>{val}</span>
        </button>
      </li>
    );
  });

  return (
    <div>
      {!tag ? (
        <input
          onChange={(e) => {
            console.log(e.target.value);
            setData(e.target.value);
          }}
        />
      ) : (
        <input value={data} />
      )}
      <button
        type="button"
        onClick={() => {
          const searchInfo = {
            searchTags: [data],
            type: 0,
            page: 0,
            field: field === undefined ? 3 : field,
          };
          dispatch(searchInfoDB(searchInfo));
        }}
      >
        검색
      </button>
      {data !== '' && tag === false && <ul>{ArrayData}</ul>}
      <br />
      <div>
        <button
          type="button"
          onClick={() => {
            let searchInfo;
            if (data === '') {
              searchInfo = {
                searchTags: [],
                type: 0,
                page: 0,
                field: 0,
              };
            } else {
              searchInfo = {
                searchTags: [data],
                type: 0,
                page: 0,
                field: 0,
              };
            }
            dispatch(searchInfoDB(searchInfo));
          }}
        >
          백엔드
        </button>
        <button
          type="button"
          onClick={() => {
            let searchInfo;
            if (data === '') {
              searchInfo = {
                searchTags: [],
                type: 0,
                page: 0,
                field: 1,
              };
            } else {
              searchInfo = {
                searchTags: [data],
                type: 0,
                page: 0,
                field: 1,
              };
            }
            dispatch(searchInfoDB(searchInfo));
          }}
        >
          프론트엔드
        </button>
        <button
          type="button"
          onClick={() => {
            let searchInfo;
            if (data === '') {
              searchInfo = {
                searchTags: [],
                type: 0,
                page: 0,
                field: 2,
              };
            } else {
              searchInfo = {
                searchTags: [data],
                type: 0,
                page: 0,
                field: 2,
              };
            }
            dispatch(searchInfoDB(searchInfo));
          }}
        >
          디자이너
        </button>
        <button
          type="button"
          onClick={() => {
            let searchInfo;
            if (data === '') {
              searchInfo = {
                searchTags: [],
                type: 0,
                page: 0,
                field: 3,
              };
            } else {
              searchInfo = {
                searchTags: [data],
                type: 0,
                page: 0,
                field: 3,
              };
            }
            dispatch(searchInfoDB(searchInfo));
          }}
        >
          전체
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
