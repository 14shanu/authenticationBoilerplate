import React from 'react';
import Typography from '@mui/material/Typography';

function Header({ heading }) {
  return (
    <div className="text-indigo-900 font-bold  ">
      <Typography
        variant="h5"
        gutterBottom
        noWrap
        component="div"
        className="classes.typographyStyle"
      >
        {heading}
      </Typography>
    </div>
  );
}

export default Header;
