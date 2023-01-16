import * as React from 'react';

import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://github.com/MiracleIsHere">
        Me
      </Link>{' '}
      {new Date().getFullYear()}
      
    </React.Fragment>
  );
}

const LANGUAGES = [
  {
    code: 'en-us',
    name: 'English',
  },
];

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
            Language
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item>
          <Copyright />
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
