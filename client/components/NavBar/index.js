import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../public/Logo.png';
import { Context } from '../../context';
import LogoNavBar from './Components_NavBar/LogoNavBar';
import LogoutNavBar from './Profile_NavBar/LogoutNavBar';
import SearchNavBar from './Components_NavBar/SearchNavBar';
import Profile_NavBar from '../NavBar/Profile_NavBar';
import SideBar from '../SideBar/index';
import MailNavbar from './IconLinks_NavBar/MailNavbar';
import NotificationNavbar from './IconLinks_NavBar/NotificationNavbar';
import { Button } from '@mui/material';
import { DrawerContext } from '../../context/drawer-Context';

// const pages = ["Create", "Read", "Update", "Delete"];
const settings = ['Profile'];

export const NavBar = () => {
  const { sfUser } = useContext(Context);

  const { open, setOpen } = useContext(DrawerContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = e => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = event => {
    console.log('e', event);
    setAnchorElUser(null);
  };

  return (
    <React.Fragment>
      <AppBar className="navbar" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                <MenuIcon sx={{ color: 'white' }} />
              </Button>
            </Box>
            {/*-----------------LOGO----------------*/}

            <Box sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}>
              <LogoNavBar Logo={logo} />
            </Box>

            {/*----------------------------------------------*/}

            {/*      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} 
              </Menu>
            </Box> */}

            {/*------ Logo Smaller Screen-------- */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <LogoNavBar Logo={logo} />
            </Box>

            {/*-----------Top Right Options----------- */}
            <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
              <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                <SearchNavBar />

                <MailNavbar />

                <NotificationNavbar />

                {<LogoutNavBar />}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};
