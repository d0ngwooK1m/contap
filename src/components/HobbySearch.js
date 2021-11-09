import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  searchHobbyList,
  updateHobby,
  deleteHobby,
} from '../features/cards/actions';

const searchData = ['숨쉬기', '밥먹기', '걷기', '뛰기', '가만히 있기'];

// const baseURL = process.env.REACT_APP_SERVER_URI;

const HobbySearch = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  const [click, setClick] = React.useState(false);
  const searchArr = [];
  const searchList = useSelector((state) => state.cards.hobbyArr);
  const hobbyList = useSelector((state) => state.cards.hobby);

  const [button, setButton] = React.useState({});
  const toggleButton = (id) => {
    setButton((prevButton) => ({
      ...prevButton,
      [id]: !prevButton[id],
    }));
  };
  console.log(button);

  React.useEffect(() => {
    if (data === '') {
      console.log('data');
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
      dispatch(searchHobbyList(searchArr));
    }
  }, [data]);

  const ArrayData = searchList.map((val) => {
    console.log(searchList.length);
    if (hobbyList.length === 3) {
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
                await dispatch(deleteHobby(val));
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
            await dispatch(updateHobby(val));
          }}
        >
          <span>{val}</span>
        </button>
      </li>
    );
  });

  const FullList = searchData.map((val) => {
    if (hobbyList.length === 3) {
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
                await dispatch(deleteHobby(val));
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
        {console.log(button[val], val)}
        {button[val] ? (
          <PurpleButton
            type="button"
            onClick={async () => {
              console.log('test');
              setData(val);
              setClick(true);
              toggleButton(val);
              console.log(button);
              await dispatch(deleteHobby(val));
            }}
            // style={{
            //   backgroundColor: 'purple',
            // }}
          >
            {console.log('purple')}
            <span>{val}</span>
          </PurpleButton>
        ) : (
          <button
            type="button"
            onClick={async () => {
              console.log('test');
              setData(val);
              setClick(true);
              toggleButton(val);
              console.log(button);
              await dispatch(updateHobby(val));
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
          value={data}
          onChange={(e) => {
            console.log(e.target.value);
            setData(e.target.value);
          }}
        />
      )}
      {console.log(FullList)}
      <ul>{!click ? ArrayData : FullList}</ul>
      <br />
    </div>
  );
};

const PurpleButton = styled.button`
  background: purple;
`;

export default HobbySearch;
