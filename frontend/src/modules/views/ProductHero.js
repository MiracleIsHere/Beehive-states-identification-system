import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';


const backgroundImage =
  'https://images.unsplash.com/photo-1583673354352-9504815ae8e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
export default function ProductMain({ refs }) {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9',
        backgroundPosition: 'center',
      }}
    >

      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Extend the life of your hive
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Determine the state of your hive in just seconds.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        onClick={refs['audio']}
        sx={{ minWidth: 200 }}
      >
        Determine the state
      </Button>
    </ProductHeroLayout>
  );
}
