/* eslint-disable */
const ColorStyle = {
  Gray500: '#F5F3F8',
  Gray300: '#A09BAC',
  Gray100: '#4D4759',
  PrimaryMint: '#50FFB8',
  HoverMint: '#33C68A',
  PrimaryPurple: '#8C4DFF',
  PrimaryBlue: '#5263FF',
  HoverPurple: '#6235B5',
  BackGround: '#0F0A1A',
  BackGround100: '#141422',
  // 호버 시 BG => BG300
  BackGround300: '#1D1D22',
  Error: '#ED4956',
};

const FontScale = {
  Caption_14: '14px',
  Body2_16: '16px',
  Body1_20: '20px',
  Header_24: '24px',
  Header_32: '32px',
};

// 사용법 +Opacity[num]
const Opacity = {
  100: 'FF',
  95: 'F2',
  90: 'E6',
  85: 'D9',
  80: 'CC',
  75: 'BF',
  70: 'B3',
  65: 'A6',
  60: '99',
  55: '8C',
  50: '80',
  45: '73',
  40: '66',
  35: '59',
  30: '4D',
  25: '40',
  20: '33',
  15: '26',
  10: '1A',
  5: '0D',
  0: '00',
};

const category = (field) => {
  if (field === 0) {
    return '백엔드';
  } else if (field === 1) {
    return '프론트엔드';
  } else if (field === 2) {
    return '디자이너';
  }
};

const professionColor = (category, opacity) => {
  if (category === '백엔드') {
    if (opacity) {
      return ColorStyle.PrimaryBlue + Opacity[opacity];
    }
    return ColorStyle.PrimaryBlue;
  } else if (category === '프론트엔드') {
    if (opacity) {
      return ColorStyle.PrimaryPurple + Opacity[opacity];
    }
    return ColorStyle.PrimaryPurple;
  } else if (category === '디자이너') {
    if (opacity) {
      return ColorStyle.PrimaryMint + Opacity[opacity];
    }
    return ColorStyle.PrimaryMint;
  }
};

const professionHoverColor = (category) => {
  if (category === '백엔드') {
    return '#3945B7';
  } else if (category === '프론트엔드') {
    return '#6235B5';
  } else if (category === '디자이너') {
    return '#33C68A';
  }
};

const FontFamily = `-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo',
Pretendard, Roboto, 'Noto Sans KR', 'Segoe UI', 'Malgun Gothic', sans-serif`;

export {
  ColorStyle,
  FontScale,
  FontFamily,
  Opacity,
  professionColor,
  category,
  professionHoverColor,
};
