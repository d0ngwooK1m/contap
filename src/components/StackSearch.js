import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  searchStackList,
  updateStack,
  deleteStack,
} from '../features/cards/actions';

const searchData = ['Javascript', 'Java', 'NodeJS', 'Python'];

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
        <li key={val.toString()}>
          {button[val] ? (
            <button
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
                backgroundColor: 'purple',
              }}
            >
              <span>{val}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                console.log('test');
                setData(val);
                setClick(true);
                console.log(button);
              }}
            >
              <span>{val}</span>
            </button>
          )}
        </li>
      );
    }
    return (
      <li key={val.toString()}>
        <button
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
        </button>
      </li>
    );
  });

  const FullList = searchData.map((val) => {
    console.log(stackList.length);
    if (stackList.length === 1) {
      return (
        <li key={val.toString()}>
          {button[val] ? (
            <button
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
                backgroundColor: 'purple',
              }}
            >
              <span>{val}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                console.log('test');
                setData(val);
                setClick(true);
                console.log(button);
              }}
            >
              <span>{val}</span>
            </button>
          )}
        </li>
      );
    }
    return (
      <li key={val.toString()}>
        {button[val] ? (
          <button
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
              backgroundColor: 'purple',
            }}
          >
            <span>{val}</span>
          </button>
        ) : (
          <button
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
          </button>
        )}
      </li>
    );
  });

  return (
    <div>
      {!click ? (
        <input
          onChange={(e) => {
            console.log(e.target.value);
            setData(e.target.value);
          }}
        />
      ) : (
        <input
          onChange={(e) => {
            console.log(e.target.value);
            setData(e.target.value);
          }}
          value={data}
        />
      )}
      <ul>{!click ? ArrayData : FullList}</ul>
      <br />
    </div>
  );
};
export default StackSearch;
