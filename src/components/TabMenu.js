import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Button } from '../elements';

import useTabs from '../hooks/useTabs';

const TabMenu = ({ content }) => {
  const { contentItem, contentChange } = useTabs(0, content);

  return (
    <Grid>
      <p>사이드 탭</p>
      <Wrapper>
        <Grid width="390px">
          {content.map((val, idx) => {
            return (
              <BtnWrapper key={val.id}>
                <Button
                  _onClick={() => {
                    contentChange(idx);
                  }}
                >
                  {val.tab}
                </Button>
              </BtnWrapper>
            );
          })}
        </Grid>
        <Grid width="1050px" padding="0px 210px">
          {contentItem.content}
        </Grid>
      </Wrapper>
    </Grid>
  );
};

TabMenu.propTypes = {
  content: PropTypes.array.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: space-evenly;
`;

const BtnWrapper = styled.div`
  width: 180px;
`;

export default TabMenu;
