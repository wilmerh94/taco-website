import { Grid, Typography, Button, Box } from '@mui/material';
import useStyles from '../styles/styles';

export const Explore = () => {
  const classes = useStyles();

  return (
    <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography
            variant="h3"
            fontWeight={200}
            className={classes.title}
          >
            Let's scale your palate
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Hire the best service for your parties, family or
            business meetings, we will help you with the budget and
            the best experience that you can give your guests. The
            experience we have will make you enjoy an experience that
            you will not forget
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            HIRE US
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
