// **** Profile Button With Menu options(Logout,Profile,account and many more...)**********
import React from 'react';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import { Avatar } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import { useState } from 'react';

const settings = ['Profile', 'Logout'];

function index() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = event => {
    console.log('e', event);
    setAnchorElUser(null);
  };
  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar />
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          sx={{ mt: '43px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map(setting => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </div>
  );
}

export default index;
