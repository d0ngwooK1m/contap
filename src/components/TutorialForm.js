import React from 'react';
import Joyride from 'react-joyride';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import T from '../api/tokenInstance';

const TutorialForm = ({ steps, page }) => {
  // const dispatch = useDispatch();

  const handleJoyRideCallback = React.useCallback(
    async (data) => {
      const { status } = data;
      if (status === 'finished') {
        // const tutorialInfo = {
        //   tutorialNum: page,
        // };
        // console.log(tutorialInfo);
        console.log('넘어가는 페이지===>', page);
        // await T.POST(`/main/tutorial?tutorialNum=${page}`);
        // dispatch()
      }
    },
    [page],
  );

  return (
    <Joyride
      steps={steps}
      showSkipButton
      showCloseButton={false}
      disableScrolling
      disableScrollParentFix
      callback={handleJoyRideCallback}
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

// const TutorialForm = ({ run, steps, page }) => {
//   // const dispatch = useDispatch();

//   const handleTutorialCallback = React.useCallback(
//     async (data) => {
//       const { status } = data;

//       if (status === 'finished') {
//         const tutorialInfo = {
//           tutorialNum: 1,
//         };
//         const res = await T.POST('/main/tutorial', tutorialInfo);
//         console.log(res.data);
//       }
//     },
//     [page],
//   );

//   const defaultOptions = {
//     arrowColor: '#fff',
//     backgroundColor: '#fff',
//     beaconSize: 36,
//     overlayColor: 'rgba(0, 0, 0, 0.5)',
//     primaryColor: '#f04',
//     spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
//     textColor: '#333',
//     width: undefined,
//     zIndex: 100,
//   };

//   return (
//     <Joyride
//       continuous
//       run={run}
//       steps={steps}
//       styles={{ options: defaultOptions }}
//       scrollToFirstStep={false}
//       showProgress
//       showSkipButton={false}
//       disableScrolling
//       disableScrollParentFix
//       callback={handleTutorialCallback}
//     />
//   );
// };

// TutorialForm.propTypes = {
//   run: PropTypes.any,
//   steps: PropTypes.any,
//   page: PropTypes.any,
// };

// TutorialForm.defaultProps = {
//   run: false,
//   steps: false,
//   page: false,
// };

export default TutorialForm;
