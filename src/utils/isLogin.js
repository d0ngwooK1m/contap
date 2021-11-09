import { getToken } from './auth';

// falsy한 값들을 체크하기 위해 not연산자를 두 번 사용했다.
// 만약 토큰이 없다면 getToken()이 null을 반환할텐데, 이를 false라는 boolean값으로 바꿔준다.

const isLogin = () => !!getToken();

export default isLogin;
