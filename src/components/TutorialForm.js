import React from 'react';
import Joyride from 'react-joyride';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  profileTutorialCheck,
  phoneTutorialCheck,
} from '../features/user/actions';
import T from '../api/tokenInstance';

const TutorialForm = ({ steps, page }) => {
  const dispatch = useDispatch();

  const handleJoyRideCallback = React.useCallback(
    async (data) => {
      const { status } = data;
      if (status === 'finished') {
        // const tutorialInfo = {
        //   tutorialNum: page,
        // };
        // console.log(tutorialInfo);
        console.log('넘어가는 페이지===>', page);
        await T.POST(`/main/tutorial?tutorialNum=${page}`);
        if (page === 1) {
          dispatch(profileTutorialCheck(true));
        }
        if (page === 0) {
          dispatch(phoneTutorialCheck(true));
        }
      }
    },
    [page],
  );

  const defaultOptions = {
    arrowColor: '#fff',
    backgroundColor: '#fff',
    beaconSize: 36,
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    primaryColor: '#f04',
    spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    textColor: '#333',
    width: 290,
    height: 210,
    zIndex: 100,
    borderRadius: 50,
  };

  return (
    <Joyride
      floaterProps={{
        hideArrow: true,
        placement: 'middle',
      }}
      steps={steps}
      showSkipButton
      showCloseButton={false}
      disableScrolling
      disableScrollParentFix
      callback={handleJoyRideCallback}
      styles={{
        options: defaultOptions,
      }}
    />
  );
};

TutorialForm.propTypes = {
  steps: PropTypes.any,
  page: PropTypes.any,
};

TutorialForm.defaultProps = {
  steps: false,
  page: false,
};

export default TutorialForm;
