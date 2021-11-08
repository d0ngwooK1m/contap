/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '../elements';
import TabButton from '../elements/TabButton';

import useTabs from '../hooks/useTabs';

const TabMenu = ({ content }) => {
  const { contentItem, contentChange } = useTabs(0, content);

  return (
    <Wrapper>
      <Menu>
        {content.map((val, idx) => {
          return (
            <TabButton
              key={val.id}
                id={val.id}
                val={val}
                check={contentItem.id}
                click={() => {
                  contentChange(idx);
                }}
              />
          );
        })}
      </Menu>
      <div>
        {contentItem.content}
      </div>
    </Wrapper>
  );
};

TabMenu.propTypes = {
  content: PropTypes.array.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 255px;
  height: 100vh;
  margin: 0px 0px 0px 165px;
  border-right: solid 1px #A09BAC4D;
`;




// export default TabMenu;
export default TabMenu;
