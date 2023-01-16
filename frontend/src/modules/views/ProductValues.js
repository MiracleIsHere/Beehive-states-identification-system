import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="https://mui.com/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/2470/2470034.png"
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Listen to the hive
              </Typography>
              <Typography variant="h5">
                {
                  'Bring the device equipped with a microphone to the hive'
                }

              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/7440/7440458.png"
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                View the result
              </Typography>
              <Typography variant="h5">
                {
                  'The artificial intelligence model is able to find patterns in new recordings of bee buzzing and make predictions regarding the health of the hive with 99.9% accuracy'
                }

              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/7274/7274207.png"
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Take action
              </Typography>
              <Typography variant="h5">
                {'Having an idea of the state of the hive, take appropriate actions to eliminate the identified problems'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
