/* eslint-disable */
import { Text } from '../elements';
import { ColorStyle } from './systemDesign';

export const mainSteps = [
  {
    target: '.my-page',
    content: (
      <div>
        <Text color={ColorStyle.BackGround300} bold20>
          <span
            style={{
              color: '#8C4DFF',
            }}
          >
            프로필
          </span>
          을 만들어 볼까요?
        </Text>

        <div>
          <Text color={ColorStyle.BackGround300} regular16>
            프로필 작성을 완료하면
            <br /> 동료를 찾을 수 있어요!
          </Text>
        </div>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: false,
    hideFooter: true,
    placement: 'bottom',
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
    event: 'click',
  },
];

export const settingSteps = [
  {
    target: '.my-setting',
    content: (
      <div>
        <Text color={ColorStyle.BackGround300} bold20>
          이제{' '}
          <span
            style={{
              color: '#8C4DFF',
            }}
          >
            Tap
          </span>{' '}
          할 수 있어요
        </Text>

        <div>
          <Text color={ColorStyle.BackGround300} regular16>
            설정에서 번호를 입력하고
            <br /> 다른 사람이 보낸 Tap을
            <br /> 문자로 받아보세요
          </Text>
        </div>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: false,
    hideFooter: true,
    placement: 'bottom',
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
  },
];
