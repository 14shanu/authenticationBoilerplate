import React from 'react';
import MuiDataTable from '../../components/utils/Tables/MuiDataTable';
import DataTable from '../../components/utils/Tables/MaterialDataTable';
import { Typography } from '@mui/material';

function table() {
  return (
    <div>
      <DataTable />
      <MuiDataTable />
    </div>
  );
}

export default table;
