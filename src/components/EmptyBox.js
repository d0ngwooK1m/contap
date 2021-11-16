/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

import { ReactComponent as AddRound } from '../svgs/AddRound.svg';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import CardBackWrite from './CardBackWrite';
import { Grid } from '../elements';

const EmptyBox = () => {
  const [click, setClick] = React.useState(false);
  const [display, setDisplay] = React.useState({ display: 'flex' });
  console.log(display);

  const closeClick = () => {
    setClick(false);
  };
  if (!click) {
    return (
      <Grid width="100%" height="100%" padding="0px 0px 10% 0px;">
        <Div
          onClick={() => {
            // dispatch(isSuccess(!handleClick));
            setClick(true);
            setDisplay({ display: 'none' });
          }}
        >
          <AddRound />
        </Div>
      </Grid>
    );
  }
  return (
    <Grid width="100%" height="100%" padding="0px 0px 10% 0px;">
      <Grid>
        <CardBackWrite onHide={closeClick} />
      </Grid>
    </Grid>
  );
};

export default EmptyBox;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1110px;
  height: 136px;
  border-radius: 16px;
  border: 1px solid ${'#4d4759' + Opacity[50]};
  margin: auto;
  background-color: ${ColorStyle.BackGround100};
  text-align: center;
  cursor: pointer;
`;
