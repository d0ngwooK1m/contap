import React from 'react';
import Joyride from 'react-joyride';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  profileTutorialCheck,
  phoneTutorialCheck,
} from '../features/user/actions';
import T from '../api/tokenInstance';

const TutorialForm = ({ open, steps, page }) => {
  const dispatch = useDispatch();

  const handleJoyRideCallback = React.useCallback(async (data) => {
    console.log(data);
    const { status } = data;
    console.log('튜토리얼 단계통과 체크', status);
    console.log(open);
    if (open === true || status === 'finished') {
      // const tutorialInfo = {
      //   tutorialNum: page,
      // };
      // console.log(tutorialInfo);
      console.log('넘어가는 페이지===>', page);
      const res = await T.POST(`/main/tutorial?tutorialNum=${page}`);
      console.log(res);
      if (page === 1) {
        dispatch(profileTutorialCheck(true));
      }
      if (page === 0) {
        dispatch(phoneTutorialCheck(true));
      }
    }
    // console.log('넘어가는 페이지===>', page);
    // await T.POST(`/main/tutorial?tutorialNum=${page}`);
    // if (page === 1) {
    //   dispatch(profileTutorialCheck(true));
    // }
    // if (page === 0) {
    //   dispatch(phoneTutorialCheck(true));
    // }
  }, []);

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
      continuous
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
  open: PropTypes.bool,
};

TutorialForm.defaultProps = {
  steps: false,
  page: false,
  open: false,
};

export default TutorialForm;
