//************************** Notification *************** */
import React from 'react';
import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

function NotificationNavbar() {
  return (
    <div>
      {' '}
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </div>
  );
}

export default NotificationNavbar;
