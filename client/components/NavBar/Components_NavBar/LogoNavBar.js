// ************** LOGO **********************

import React from 'react';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

function LogoNavBar({ Logo }) {
  return (
    <div>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
      >
        <Image alt="logo" src={Logo} width={120} height={35} />
      </Typography>
      {/*------ For Smaller Screen -------- */}

      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
      >
        <Image alt="logo" src={Logo} width={120} height={35} />
      </Typography>
    </div>
  );
}

export default LogoNavBar;
