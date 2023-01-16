import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar({ refs }) {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between', overflow: 'auto' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            onClick={refs['home']}
            sx={{ fontSize: 24 }}
          >
            {'Recognizing the state of the hive'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              onClick={refs['about']}
              sx={rightLink}
            >
              {'Functions'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              onClick={refs['audio']}
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Recognize'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
