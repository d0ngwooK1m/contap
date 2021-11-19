/* eslint-disable */
import { Text } from '../elements';
import { ColorStyle } from './systemDesign';

export const mainSteps = [
  {
    target: '.my-page',
    content: (
      <div>
        <Text color={ColorStyle.BackGround300} bold20>
        프로필을 만들어 볼까요?
        </Text>

        <div>
          <Text color={ColorStyle.BackGround300} regular16>
            프로필 작성을 완료하면 동료를 찾을 수 있어요!
          </Text>
        </div>
      </div>
    ),
    disableBeacon: true,
    hideBackButton: true,
  },
];

export const settingSteps = [
  {
    target: '.my-setting',
    content: '알람 여부를 설정할 수 있어요!',
    disableBeacon: true,
  },
];
