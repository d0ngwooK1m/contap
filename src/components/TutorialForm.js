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
        await T.POST(`/main/tutorial?tutorialNum=${page}`);
        // console.log(res);
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
    beaconSize: 20,
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    primaryColor: '#f04',
    spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    textColor: '#333',
    width: 250,
    height: 250,
    zIndex: 100,
    borderRadius: 50,
  };

  const defaultStyles = {
    tooltip: {
      width: '260px',
      height: '180px',
      borderRadius: '20px',
      top: '20px',
    },
    buttonClose: {
      margin: '5px 5px 0px 0px',
      width: '13px',
      height: '13px',
    },
  };

  return (
    <Joyride
      floaterProps={{
        hideArrow: true,
        // placement: 'middle',
      }}
      // continuous
      // locale={locale}
      // setting={setting}
      // mypage={mypage}
      // stepIndex={stepIndex}
      steps={steps}
      // showSkipButton
      // showCloseButton={false}
      // showCloseButton
      disableScrolling
      disableScrollParentFix
      callback={handleJoyRideCallback}
      styles={{
        options: defaultOptions,
        tooltip: defaultStyles.tooltip,
        buttonClose: defaultStyles.buttonClose,
      }}
    />
  );
};

TutorialForm.propTypes = {
  steps: PropTypes.any,
  page: PropTypes.any,
  // mypage: PropTypes.bool,
  // setting: PropTypes.bool,
  // run: PropTypes.bool,
  // locale: PropTypes.string,
  // stepIndex: PropTypes.number,
};

TutorialForm.defaultProps = {
  steps: false,
  page: false,
  // mypage: false,
  // setting: false,
  // run: false,
  // locale: '',
  // stepIndex: 0,
};

export default TutorialForm;
