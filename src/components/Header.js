import React from 'react';
import styled from 'styled-components';
// import { useHistory } from 'react-router';

// import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import useStyles from '../hooks/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setChatNoti, setContapNoti } from '../features/notice/actions';
import { history } from '../features/configureStore';
// import Swal from 'sweetalert2';
import { logout } from '../features/user/actions';
import { removeToken } from '../utils/auth';
import { Grid, Image } from '../elements';
import userAuthCheck from '../hooks/userAuthCheck';
import { ReactComponent as LogoSvg } from '../svgs/Logo.svg';
import { ReactComponent as ContapIconSvg } from '../svgs/ContapIcon.svg';
import useSocketNotiRoom from '../hooks/useSocketNotiRoom';

const Header = () => {
  const dispatch = useDispatch();
  const [wsConnectSubscribe, wsDisConnectUnsubscribe, token, isChatNoti] =
    useSocketNotiRoom();
  // const classes = useStyles();
  userAuthCheck();
  const isUserLogin = useSelector((state) => state.user.email);
  // const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /*eslint-disable */
  React.useEffect(() => {
    if (!token) {
      return null;
    }

    wsConnectSubscribe();

    return () => {
      wsDisConnectUnsubscribe();
    };
  }, []);

  console.log(isChatNoti);
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
          <Grid
            width="fit-content"
            _onClick={() => {
              if (isChatNoti) {
                dispatch(setContapNoti(false));
              }
              history.push('/contap');
            }}
          >
            <div
              style={{
                cursor: 'pointer',
              }}
            >
              <ContapIconSvg />
            </div>
          </Grid>
          <Grid
            width="fit-content"
            _onClick={() => {
              if (isChatNoti) {
                dispatch(setChatNoti(false));
              }
              history.push('/contap');
            }}
          >
            <div
              style={{
                cursor: 'pointer',
              }}
            >
              {isChatNoti ? <div>📭</div> : <div>📧</div>}
            </div>
          </Grid>
          <div>
            <IconButton
              aria-label="delete"
              size="small"
              sx={{ padding: '0px' }}
              onClick={handleClick}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
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
                  removeToken(token);
                  logout();
                  handleClose();
                  window.location.href = '/';
                }}
              >
                로그아웃
              </MenuItem>
            </Menu>
          </div>
          <Grid
            width="fit-content"
            _onClick={() => {
              history.push('/mypage');
            }}
          >
            <Image shape="circle" />
          </Grid>
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
  width: 134px;
  height: 48px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
