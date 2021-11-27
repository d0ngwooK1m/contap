/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
// import { useHistory } from 'react-router';

// import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import useStyles from '../hooks/styles';
import { useSelector, useDispatch } from 'react-redux';
// import { setChatNoti, setContapNoti } from '../features/notice/actions';
import { useHistory, useLocation } from 'react-router';
import { setChatNoti, setContapNoti } from '../features/notice/actions';
import {
  phoneTutorialCheck,
  profileTutorialCheck,
} from '../features/user/actions';
// import Swal from 'sweetalert2';
import { logout } from '../features/user/actions';
import { getToken, removeToken } from '../utils/auth';
// import { Grid } from '../elements';
import { ReactComponent as LogoSvg } from '../svgs/Logo.svg';
import { ReactComponent as ContapIconSvg } from '../svgs/ContapIcon.svg';
import { ReactComponent as ContapAlarmIconSvg } from '../svgs/ContapAlarmIcon.svg';
// import { ReactComponent as ContapAlarmActiveIconSvg } from '../svgs/ContapAlarmActiveIcon.svg';
import { ReactComponent as ChatIconSvg } from '../svgs/ChatIcon.svg';
import { ReactComponent as ChatAlarmIconSvg } from '../svgs/ChatAlarmIcon.svg';
// import { ReactComponent as ChatAlarmActiveIconSvg } from '../svgs/ChatAlarmActiveIcon.svg';
import { ReactComponent as SettingIconSvg } from '../svgs/Setting.svg';
import { ReactComponent as HeaderProfileSvg } from '../svgs/HeaderProfile.svg';
import T from '../api/tokenInstance';

import TutorialForm from './TutorialForm';
import { mainSteps, settingSteps } from '../utils/tutorialSteps';
import {
  ColorStyle,
  FontFamily,
  Opacity,
  FontScale,
} from '../utils/systemDesign';
import axios from 'axios';
// import { mainSteps } from '../utils/tutorialSteps';

// import useUserAuthCheck from '../hooks/useUserAuthCheck';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const userInfo = useSelector((state) => state.user);
  const isChatNoti = useSelector((state) => state.notice.isChatNoti);
  const isTapReceiveNoti = useSelector(
    (state) => state.notice.isTapReceiveNoti,
  );
  const isTapAcceptNoti = useSelector((state) => state.notice.isTapAcceptNoti);
  const isContapNoti = !!(isTapReceiveNoti || isTapAcceptNoti);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myProfile] = React.useState(<HeaderProfileSvg />);
  const isUserLogin = userInfo.email;
  const userProfile = userInfo.profile ? userInfo.profile : '';
  const [isMyPage, setIsMyPage] = React.useState(false);
  const [isSetting, setIsSetting] = React.useState(false);

  // T.GET(`http://3.34.133.254:8080/setalarm/kiiid12321@naver.com/1`);

  const open = Boolean(anchorEl);
  const token = getToken();

  const mypageAlarm = useSelector(
    (state) => state.user.tutorial.profileTutorial,
  );
  const settingAlarm = useSelector(
    (state) => state.user.tutorial.phoneTutorial,
  );
  // console.log('이전 주소 확인====>', `${history.goBack()}`)

  // 로그인 체크
  // useUserAuthCheck();
  // React.useEffect(async () => {
  // setPathName(history.location.pathname)
  // if (isUserLogin) {
  //   const { data } = await T.GET('/mypage/myinfo');
  // }
  // console.log(data.profile);
  //   if (location.pathname === '/mypage') {
  //     setIsMyPage(true);
  //     console.log('프로필 클릭시 통과하는지 체크', isMyPage);
  //   }

  // }, [location.pathname]);

  // const Tutorial = (mypageAlarm, settingAlarm) => {
  //   {mypageAlarm === false ? (
  //     <TutorialForm
  //       run={true}
  //       steps={mainSteps}
  //       page={1}
  //     />
  //   ) : null}
  //   {history.location.pathname === '/' &&
  //   mypageAlarm === true &&
  //   settingAlarm === false ? (
  //     <TutorialForm
  //       run={true}
  //       steps={settingSteps}
  //       page={0}
  //     />
  //   ) : null}
  // };

  // React.useEffect(() => {
  //   Tutorial;
  // }, [mypageAlarm, settingAlarm])

  const handleisContap = () => {
    if (location.pathname === '/contap') {
      return;
    }
    if (isContapNoti) {
      dispatch(setContapNoti(false));
    }
    history.push('/contap');
  };

  const handleisChat = () => {
    if (location.pathname === '/grabtalk') {
      return;
    }
    if (isChatNoti) {
      dispatch(setChatNoti(false));
    }
    history.push('/grabtalk');
  };

  const handleisSetting = async (event) => {
    setIsSetting(true);
    setAnchorEl(event.currentTarget);
    if (!settingAlarm) {
      const res = await T.POST(`/main/tutorial?tutorialNum=0`);
      dispatch(phoneTutorialCheck(true));
    }
    // const res = await T.POST(`/main/tutorial?tutorialNum=0`);
    // console.log('세팅버튼 클릭===>', res);
    // dispatch(phoneTutorialCheck(true));
  };

  const moveToMyPage = async () => {
    if (location.pathname === '/mypage') {
      return;
    }
    if (!mypageAlarm) {
      const res = await T.POST(`/main/tutorial?tutorialNum=1`);
      console.log('마이페이지 버튼 클릭===>', res);
      dispatch(profileTutorialCheck(true));
    }
    // setIsMyPage(true);
    // console.log('프로필 클릭시 통과하는지 체크', isMyPage);
    history.push('/mypage');
  };

  const handleClose = () => {
    setIsSetting(false);
    setAnchorEl(null);
  };

  const logOut = () => {
    removeToken(token);
    logout();
    handleClose();
    window.location.href = '/';
  };

  const ChatButton = () => {
    // if (isChat || location.pathname === '/grabtalk') {
    //   // if (isChatNoti) {
    //   //   return <ChatAlarmIconSvg fill="#8C4DFF" />;
    //   // }
    //   return <ChatIconSvg fill="#8C4DFF" />;
    // }
    // if (isChatNoti) {
    //   return <ChatAlarmIconSvg fill="#F5F3F8" />;
    // }
    // return <ChatIconSvg fill="#F5F3F8" />;
    if (location.pathname === '/grabtalk') {
      return <ChatIconSvg stroke="#8C4DFF" />;
    }
    if (isChatNoti && location.pathname !== '/grabtalk') {
      return <ChatAlarmIconSvg stroke="#F5F3F8" />;
    }
    return <ChatIconSvg stroke="#F5F3F8" />;
  };

  const ContapButton = () => {
    if (location.pathname === '/contap') {
      if (isContapNoti) {
        return <ContapAlarmIconSvg fill="#8C4DFF" />;
      }
      return <ContapIconSvg fill="#8C4DFF" />;
    }
    if (isContapNoti) {
      return <ContapAlarmIconSvg fill="#F5F3F8" />;
    }
    return <ContapIconSvg fill="#F5F3F8" />;
  };

  return (
    <>
      <HeaderWrapper location={location.pathname}>
        {mypageAlarm === false ? (
          <TutorialForm run={true} steps={mainSteps} page={1} />
        ) : null}
        {history.location.pathname === '/' &&
        mypageAlarm === true &&
        settingAlarm === false ? (
          <TutorialForm run={true} steps={settingSteps} page={0} />
        ) : null}
        {/* <TutorialForm run={true} steps={mainSteps} page='main' /> */}
        {/* {Tutorial(mypageAlarm, settingAlarm)} */}
        {/* {settingAlarm === false ? <TutorialForm steps={settingSteps} /> : null} */}
        {/* <Grid
          width="fit-content"
          height="fit-content"
          _onClick={() => {
            history.push('/');
            // window.location.href = '/';
          }}
        > */}
        <LogoDiv
          onClick={() => {
            // history.push('/');
            window.location.href = '/';
          }}
        >
          <LogoSvg />
        </LogoDiv>
        {/* </Grid> */}
        {isUserLogin !== '' ? (
          <MenuWrapper>
            <Icon
              style={{
                cursor: 'pointer',
              }}
              // onChange={async () => {
              //   console.log('세팅알람체크===>', settingAlarm);
              //   if (!settingAlarm) {
              //     const res = await T.POST(`/main/tutorial?tutorialNum=0`);
              //     console.log('세팅버튼 클릭===>', res);
              //     dispatch(phoneTutorialCheck(true));
              //   }
              // }}
              onClick={handleisContap}
            >
              {ContapButton()}
            </Icon>

            <Icon
              style={{
                cursor: 'pointer',
              }}
              onClick={handleisChat}
            >
              {ChatButton()}
            </Icon>
            <Icon className="my-setting">
              <IconButton
                aria-label="delete"
                size="small"
                sx={{ padding: '0px' }}
                onClick={handleisSetting}
              >
                {isSetting ? (
                  <SettingIconSvg stroke="#8C4DFF" />
                ) : (
                  <SettingIconSvg stroke="#F5F3F8" />
                )}
              </IconButton>
            </Icon>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              PaperProps={{
                style: {
                  transform: 'translateX(-80px) translateY(25px)',
                  backgroundColor: `${ColorStyle.BackGround300 + Opacity[70]}`,
                  color: `${ColorStyle.Gray500}`,
                  borderRadius: '17px',
                  border: `1px solid ${ColorStyle.Gray100}`,
                  boxShadow: 'none',
                },
                sx: {
                  '& .MuiList-padding': {
                    paddingTop: '0px',
                    paddingBottom: '0px',
                  },
                  // "& .MuiMenuItem-root.Mui-selected": {
                  //   backgroundColor: "yellow"
                  // },
                  '& .MuiMenuItem-root:hover': {
                    backgroundColor: `#F5F3F8${Opacity[10]}`,
                    transition: '0.3s',
                  },
                  // "& .MuiMenuItem-root.Mui-selected:hover": {
                  //   backgroundColor: "red"
                  // }
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  history.push('/settings');
                  handleClose();
                }}
                sx={{
                  padding: '18px 70px 18px 28px',
                  fontFamily: `${FontFamily}`,
                  fontSize: `${FontScale.Body1_16}`,
                }}
              >
                설정
              </MenuItem>
              <hr
                style={{
                  width: '85%',
                  border: `1px solid ${ColorStyle.Gray100 + Opacity[30]}`,
                  margin: '0px',
                }}
              />
              <MenuItem
                onClick={logOut}
                sx={{
                  padding: '18px 70px 18px 28px',
                  fontFamily: `${FontFamily}`,
                  fontSize: `${FontScale.Body1_16}`,
                }}
              >
                로그아웃
              </MenuItem>
            </Menu>
            <div>
              <IconButton className="my-page" onClick={moveToMyPage}>
                {userProfile ? (
                  <ImageBox className="imageBox" src={userProfile} />
                ) : (
                  <HeaderProfileSvg />
                )}
              </IconButton>
            </div>
          </MenuWrapper>
        ) : (
          <LoginButton
            type="button"
            width="100px"
            onClick={() => {
              history.push('/login');
            }}
          >
            Log In
          </LoginButton>
        )}
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled.div`
  ${({ location }) =>
    location === '/' || location.includes('/card/')
      ? null
      : 'position : fixed;'}
  /* ${({ location }) =>
    location === '/' || location.includes('/card/')
      ? 'margin: auto;'
      : 'margin: 0px 164px;'} */

  margin: auto;
  top: 0px;
  width: 100%;
  max-width: 1440px;
  padding: 0px 164px;
  box-sizing: border-box;
  height: 88px;
  padding: 0px 164px;
  ${({ location }) =>
    location === '/' ||
    location.includes('/card/') ||
    location === '/settings' ||
    location === '/contap' ||
    location.includes('/mypage') ||
    location === '/grabtalk'
      ? 'display:flex;'
      : 'display:none;'}
  justify-content: space-between;
  align-items: center;
  background-color: #0f0a1aff;
  z-index: 1001;

  .my-page {
    padding-right: 0px;
    margin-right: 0px;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 99999;
`;

const StyledMenu = styled(Menu)`
  && {
    top: 74px;
    left: 1200px;
  }
`;

const LogoDiv = styled.div`
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  z-index: 1000;
  margin-right: 400px;
`;

const Icon = styled.div`
  margin: 0px 12px;
  z-index: 1000;
`;

const LoginButton = styled.button`
  width: 114px;
  height: 44px;
  background-color: ${ColorStyle.PrimaryPurple};
  border-radius: 30px;
  border: none;
  color: white;
  font-size: 20px;
  font-family: ${FontFamily};
  font-weight: bold;
  cursor: pointer;
  z-index: 1;
  margin-left: 400px;
  &:hover {
    background-color: ${ColorStyle.HoverPurple};
    transition: 0.3s;
  }
`;

const ImageBox = styled.div`
  height: 48px;
  width: 48px;
  border: 1px solid ${ColorStyle.Gray100 + Opacity[25]};
  box-sizing: border-box;

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-size: cover;
  border-radius: 50px;
`;

export default Header;
