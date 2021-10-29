import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
// import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import useStyles from '../hooks/styles';
import { Grid, Image } from '../elements';

const Header = () => {
  // const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <HeaderWrapper>
      <Grid
        bg="blue"
        width="100px"
        height="32px"
        _onClick={() => {
          history.push('/');
        }}
      >
        <div style={{ cursor: 'pointer' }}>Theme</div>
      </Grid>
      <MenuWrapper>
        <Grid
          width="fit-content"
          _onClick={() => {
            history.push('/contap');
          }}
        >
          <div style={{ cursor: 'pointer' }}>🤝</div>
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
                handleClose();
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
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: auto;
  height: 94px;
  padding: 0px 165px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuWrapper = styled.div`
  width: 134px;
  height: 48px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export default Header;
