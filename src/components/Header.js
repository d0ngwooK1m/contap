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
import { ReactComponent as BasicProfileSvg } from '../svgs/BasicProfile.svg';
import T from '../api/tokenInstance';

import TutorialForm from './TutorialForm';
import { mainSteps, settingSteps } from '../utils/tutorialSteps';
import { ColorStyle, FontFamily } from '../utils/systemDesign';
// import { mainSteps } from '../utils/tutorialSteps';

// import useUserAuthCheck from '../hooks/useUserAuthCheck';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const userInfo = useSelector((state) => state.user);
  const isChatNoti = useSelector((state) => state.notice.isChatNoti);
  const isContapNoti = useSelector((state) => state.notice.isContapNoti);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myProfile] = React.useState(<BasicProfileSvg />);
  const isUserLogin = userInfo.email;
  const userProfile = userInfo.profile ? userInfo.profile : '';
  const [isSetting, setIsSetting] = React.useState(false);

  const open = Boolean(anchorEl);
  const token = getToken();

  const mypageAlarm = useSelector(
    (state) => state.user.tutorial.profileTutorial,
  );
  const settingAlarm = useSelector(
    (state) => state.user.tutorial.phoneTutorial,
  );
  console.log('마이페이지 튜토리얼===>', mypageAlarm);
  console.log('세팅 튜토리얼===>', settingAlarm);
  console.log(open);

  // 로그인 체크
  // useUserAuthCheck();
  React.useEffect(async () => {
    // setPathName(history.location.pathname)
    // if (isUserLogin) {
    //   const { data } = await T.GET('/mypage/myinfo');
    // }
    // console.log(data.profile);
  }, []);

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

  const handleisSetting = (event) => {
    setIsSetting(true);
    setAnchorEl(event.currentTarget);
  };

  const moveToMyPage = () => {
    if (location.pathname === '/mypage') {
      return;
    }
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
      return <ChatIconSvg fill="#8C4DFF" />;
    }
    if (isChatNoti && location.pathname !== '/grabtalk') {
      return <ChatAlarmIconSvg fill="#F5F3F8" />;
    }
    return <ChatIconSvg fill="#F5F3F8" />;
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
        {/* <TutorialForm steps={mainSteps} page={1} /> */}
        {mypageAlarm === false ? (
          <TutorialForm steps={mainSteps} page={1} />
        ) : null}
        {history.location.pathname === '/' && mypageAlarm === true && settingAlarm === false ? (
          <TutorialForm open={open} steps={settingSteps} page={0} />
        ) : null}
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
            >
              <MenuItem
                onClick={() => {
                  history.push('/settings');
                  handleClose();
                }}
              >
                설정
              </MenuItem>
              <MenuItem onClick={logOut}>로그아웃</MenuItem>
            </Menu>
            <div>
            <IconButton
              className="my-page"
              onClick={moveToMyPage}
            >
              {userProfile ? (
                <ImageBox
                  className="imageBox"
                  src={userProfile}
                />
              ) : (
                <BasicProfileSvg />
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
${({ location }) => location === '/' ? null : 'position : fixed;'}
  top: 0px;
  width: 1112px;
  height: 88px;
  padding: 0px 164px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0f0a1aff;
  z-index: 1001;

  .my-page{
    padding-right: 0px;
    margin-right: 0px;
    
  }
  
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
  margin-left: 400px;
  &:hover {
    background-color: ${ColorStyle.HoverPurple};
    transition: 0.3s;
  }
`;

const ImageBox = styled.div`
  height: 48px;
  width: 48px;

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 25px;
`;

export default Header;
