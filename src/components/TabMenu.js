import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Button } from '../elements';

const useTabs = (initialTabs, allTabs) => {
  const [contentIndex, setContentIndex] = React.useState(initialTabs);

  return {
    contentItem: allTabs[contentIndex],
    contentChange: setContentIndex,
  };
};

const TabMenu = ({ content }) => {
  const { contentItem, contentChange } = useTabs(0, content);
  return (
    <Grid>
      <p>사이드 탭</p>
      <Wrapper>
        <Grid width="390px">
          {content.map((val, idx) => (
            <BtnWrapper key={val.id}>
              <Button
                _onClick={() => {
                  contentChange(idx);
                }}
              >
                {val.tab}
              </Button>
            </BtnWrapper>
          ))}
        </Grid>
        <Grid width="1050px" padding="0px 210px">
          {contentItem.content}
        </Grid>
      </Wrapper>
    </Grid>
  );
};

TabMenu.propTypes = {
  content: PropTypes.arrayOf.isRequired,
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