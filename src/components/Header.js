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
import { setChatNoti, setContapNoti } from '../features/notice/actions';
import { history } from '../features/configureStore';
// import Swal from 'sweetalert2';
import { logout } from '../features/user/actions';
import { getToken, removeToken } from '../utils/auth';
import { Grid } from '../elements';
import { ReactComponent as LogoSvg } from '../svgs/Logo.svg';
import { ReactComponent as ContapIconSvg } from '../svgs/ContapIcon.svg';
import { ReactComponent as ContapAlarmIconSvg } from '../svgs/ContapAlarmIcon.svg';
// import { ReactComponent as ContapAlarmActiveIconSvg } from '../svgs/ContapAlarmActiveIcon.svg';
import { ReactComponent as ChatIconSvg } from '../svgs/ChatIcon.svg';
import { ReactComponent as ChatAlarmIconSvg } from '../svgs/ChatAlarmIcon.svg';
// import { ReactComponent as ChatAlarmActiveIconSvg } from '../svgs/ChatAlarmActiveIcon.svg';
import { ReactComponent as SettingIconSvg } from '../svgs/Setting.svg';
import { ReactComponent as BasicProfileSvg } from '../svgs/BasicProfile.svg';

// import useUserAuthCheck from '../hooks/useUserAuthCheck';

const Header = () => {
  const dispatch = useDispatch();
  const isUserLogin = useSelector((state) => state.user.email);
  const isChatNoti = useSelector((state) => state.notice.isChatNoti);
  const isContapNoti = useSelector((state) => state.notice.isContapNoti);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [isContap, setIsContap] = React.useState(false);
  const [isChat, setIsChat] = React.useState(false);
  const [isSetting, setIsSetting] = React.useState(false);

  const open = Boolean(anchorEl);

  // 로그인 체크
  // useUserAuthCheck();

  const handleisContap = () => {
    if (isContapNoti) {
      dispatch(setContapNoti(false));
    }
    setIsContap(true);
    setIsSetting(false);
    setIsChat(false);
    history.push('/contap');
  };

  const handleisChat = () => {
    if (isChatNoti) {
      dispatch(setChatNoti(false));
    }
    setIsChat(true);
    setIsSetting(false);
    setIsContap(false);
    history.push('/contap');
  };

  const handleisSetting = (event) => {
    setIsSetting(true);
    setIsChat(false);
    setIsContap(false);
    setAnchorEl(event.currentTarget);
  };

  const moveToMyPage = () => {
    setIsSetting(false);
    setIsChat(false);
    setIsContap(false);
    history.push('/mypage');
  };

  const handleClose = () => {
    setIsSetting(false);
    setAnchorEl(null);
  };

  const ChatButton = () => {
    if (isChat) {
      if (isChatNoti) {
        return <ChatAlarmIconSvg fill="#8C4DFF" />;
      }
      return <ChatIconSvg fill="#8C4DFF" />;
    }
    if (isChatNoti) {
      return <ChatAlarmIconSvg fill="#F5F3F8" />;
    }
    return <ChatIconSvg fill="#F5F3F8" />;
  };

  const ContapButton = () => {
    if (isContap) {
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
      <HeaderWrapper>
        <Grid
          width="fit-content"
          height="fit-content"
          _onClick={() => {
            // history.push('/');
            window.location.href = '/';
          }}
        >
          <div style={{ cursor: 'pointer' }} z-index="1000">
            <LogoSvg />
          </div>
        </Grid>
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
            <Icon>
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
              <MenuItem
                onClick={() => {
                  const token = getToken();
                  removeToken(token);
                  logout();
                  handleClose();
                  window.location.href = '/';
                }}
              >
                로그아웃
              </MenuItem>
            </Menu>
            <IconButton style={{ margin: '0px 12px' }} onClick={moveToMyPage}>
              <BasicProfileSvg />
            </IconButton>
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
  width: auto;
  height: 88px;
  padding: 0px 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0f0a1a;
  z-index="1001"
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Icon = styled.div`
  margin: 0px 12px;
  z-index: 1000;
`;

const LoginButton = styled.button`
  width: 125px;
  height: 50px;
  background-color: #8c4dff;
  border-radius: 30px;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

export default Header;
