/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchArrList } from '../features/cards/actions';
import TagList from './TagList';

// const searchData = {
//   stacks: [
//     { id: 1, stack: '지오캐싱' },
//     {
//       id: 2,
//       stack: 'React',
//     },
//     {
//       id: 3,
//       stack: 'ReactNative',
//     },
//   ],
// };

const searchData = ['ReactNative', 'React', 'Spring', 'Java', 'JavaScript'];

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

  // const rgba2hex = (rgba) =>
  //   `#${rgba
  //     .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
  //     .slice(1)
  //     .map((n, i) =>
  //       (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
  //         .toString(16)
  //         .padStart(2, '0')
  //         .replace('NaN', ''),
  //     )
  //     .join('')}`;

  // function addStack(id) {
  //   const element = document.getElementById(id);
  //   const stack = element.textContent;
  //   const color = rgba2hex(window.getComputedStyle(element).backgroundColor);
  //   console.log(color);
  //   document.getElementById(id).style.backgroundColor = '#8C4DFF'; //'#8C4DFF
  //   document.getElementById('stack').value = stack;
  // }

  return (
    <div>
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
      {/* <div>
        <input type="button" id="stack" value="스택" />
        <br />
        <button
          id="1"
          type="button"
          onClick={(e) => {
            addStack(e.target.id);
          }}
        >
          ReactNative
        </button>
        <button
          id="2"
          type="button"
          onClick={(e) => {
            addStack(e.target.id);
          }}
        >
          React
        </button>
        <button
          id="3"
          type="button"
          onClick={(e) => {
            addStack(e.target.id);
          }}
        >
          Spring
        </button>
        <button
          id="4"
          type="button"
          onClick={(e) => {
            addStack(e.target.id);
          }}
        >
          Java
        </button>
        <button
          id="5"
          type="button"
          onClick={(e) => {
            addStack(e.target.id);
          }}
        >
          JavaScript
        </button>
      </div> */}
      <TagList />
    </div>
  );
};

export default MypageSearch;
