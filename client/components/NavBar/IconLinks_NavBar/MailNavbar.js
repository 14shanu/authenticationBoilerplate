// ************************* MAil *************

import React from 'react';
import Badge from '@mui/material/Badge';
import { IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

function MailNavbar() {
  return (
    <div>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
    </div>
  );
}

export default MailNavbar;
