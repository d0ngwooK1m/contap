/* eslint-disable */

const is768px = !!window.matchMedia('(max-height: 840px)').matches;
const is616px = !!window.matchMedia('(max-height: 720px)').matches;
export const size = is616px ? '616' : is768px ? '768' : 'nomal'
