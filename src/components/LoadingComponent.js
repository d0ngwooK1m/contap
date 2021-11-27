import React from 'react';
import Loader from 'react-loader-spinner';
import { ColorStyle } from '../utils/systemDesign';

const LoadingComponent = () => {
  return (
    <div>
      <Loader
        type="Oval"
        color={ColorStyle.PrimaryPurple}
        height={30}
        width={30}
        timeout={3000}
      />
    </div>
  );
};

export default LoadingComponent;
