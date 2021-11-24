import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TabButton from '../elements/TabButton';

import useTabs from '../hooks/useTabs';
import { ColorStyle, Opacity } from '../utils/systemDesign';

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
      <div>{contentItem.content}</div>
    </Wrapper>
  );
};

TabMenu.propTypes = {
  content: PropTypes.array.isRequired,
};

const Wrapper = styled.div`
  padding-top: 88px;
  /* padding-bottom: 130px; */
  display: flex;
  width: 100%;
  height: 85vh;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: 255px;
  min-height: 85vh;
  margin: 0px 0px 0px 165px;
  border-right: solid 1px ${ColorStyle.Gray300 + Opacity[15]};
`;

export default TabMenu;
