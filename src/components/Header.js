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
import { setChatNoti } from '../features/notice/actions';
import { history } from '../features/configureStore';
// import Swal from 'sweetalert2';
import { logout } from '../features/user/actions';
import { getToken, removeToken } from '../utils/auth';
import { Grid } from '../elements';
import { ReactComponent as LogoSvg } from '../svgs/Logo.svg';
import { ReactComponent as ContapIconSvg } from '../svgs/ContapIcon.svg';
import { ReactComponent as SettingIconSvg } from '../svgs/Setting.svg';
import { ReactComponent as ChatIconSvg } from '../svgs/ChatIcon.svg';
import { ReactComponent as BasicProfileSvg } from '../svgs/BasicProfile.svg';
import useUserAuthCheck from '../hooks/useUserAuthCheck';

const Header = () => {
  // 로그인 체크
  const dispatch = useDispatch();
  const isUserLogin = useSelector((state) => state.user.email);
  const isChatNoti = useSelector((state) => state.notice.isChatNoti);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [isContap, setIsContap] = React.useState(false);
  const [isChat, setIsChat] = React.useState(false);
  const [isSetting, setIsSetting] = React.useState(false);

  const handleisContap = () => {
    if (isContap) {
      return;
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
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setIsSetting(false);
    setAnchorEl(null);
  };
  useUserAuthCheck();

  return (
    <HeaderWrapper>
      <Grid
        width="fit-content"
        height="fit-content"
        _onClick={() => {
          // history.push('/');
          window.location.href = '/';
        }}
      >
        <div style={{ cursor: 'pointer' }}>
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
            {isContap ? (
              <ContapIconSvg fill="#8C4DFF" />
            ) : (
              <ContapIconSvg fill="#F5F3F8" />
            )}
          </Icon>

          <Icon
            style={{
              cursor: 'pointer',
            }}
            onClick={handleisChat}
          >
            {isChat ? (
              <ChatIconSvg fill="#8C4DFF" />
            ) : (
              <ChatIconSvg fill="#F5F3F8" />
            )}
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
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Icon = styled.div`
  margin: 0px 12px;
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
