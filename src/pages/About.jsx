import { Grid, Typography, Button, Box } from '@mui/material';
import useStyles from '../styles/styles';

export const AboutUs = () => {
  const classes = useStyles();

  return (
    <Box className={classes.aboutUsContainer}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            fontWeight={700}
            className={classes.title}
          >
            We cook, We love
          </Typography>
          <Typography className={classes.aboutUsSubtitle}>
            You are worried about your next meeting with your
            business partner, your friends or family members We
            ensure you never run out of great experience and fun
            times. We are trusted by over 50+ companies to deliver
            quality service
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            CONTACT US
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
