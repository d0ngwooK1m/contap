import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchArrList } from '../features/cards/actions';

const searchData = ['지오캐싱', '종이접기', '피겨스케이팅'];

const MypageSearch = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  // const result = React.useRef(data);
  const searchArr = [];
  const searchList = useSelector((state) => state.cards.searchArr);
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

  React.useEffect(() => {
    console.log(searchData);
    searchData.filter((val) => {
      console.log(val.indexOf(data));
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
    console.log(searchArr);
    if (searchArr !== []) {
      dispatch(searchArrList(searchArr));
    }
  }, [data]);

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
        <input
          value={data}
          onChange={(e) => {
            console.log(e.target.value);
            setData(e.target.value);
          }}
        />
      )}
      {/* <button
        type="button"
        onClick={() => {
          const searchInfo = {
            searchTags: [data],
            type: 0,
            page: 1,
            field: field === undefined ? 3 : field,
          };
          console.log(searchInfo);
          dispatch(searchInfoDB(searchInfo));
        }}
      >
        검색
      </button> */}
      {data !== '' && tag === false && <ul>{ArrayData}</ul>}
      <br />
    </div>
  );
};

export default MypageSearch;
