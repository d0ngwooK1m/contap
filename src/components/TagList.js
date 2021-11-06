import React from 'react';
import styled from 'styled-components';

import { Grid } from '../elements';

const searchData = ['ReactNative', 'React', 'Spring', 'Java', 'JavaScript'];

const TagList = () => {
  // const [isBoxSelect, setIsBoxSelect] = React.useState([false, false]);
  const [stack, setStack] = React.useState(null);
  const [prevClick, setPrevClick] = React.useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    // const newArr = Array(stackList.length).fill(false);
    // newArr[idx] = true;
    // setIsBoxSelect(newArr);
    setStack(e.target.id);
    console.log(e.target.id);
  };

  React.useEffect(() => {
    if (stack !== null) {
      const current = document.getElementById(stack);
      console.log(document.getElementById(stack));
      current.style.background = '#8C4DFF';
    }
    if (prevClick !== null) {
      const prev = document.getElementById(prevClick);
      prev.style.background = '#FFFFFF';
    }
    setPrevClick(stack);
  }, [stack]);

  return (
    <Grid>
      {searchData.map((stackList, idx) => (
        <Div id={idx} onClick={handleClick}>
          {stackList}
        </Div>
      ))}
    </Grid>
  );
};

export default TagList;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  //   width: 1110px;
  //   height: 150px;
  border: 1px solid #dcdcdc;
  border-radius: 16px;
  width: 100px;
  background: #ffffff;
`;
