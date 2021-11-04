import React from 'react';

const useTabs = (initialTabs, allTabs) => {
  const [contentIndex, setContentIndex] = React.useState(initialTabs);

  return {
    contentItem: allTabs[contentIndex],
    contentChange: setContentIndex,
  };
};

export default useTabs;
