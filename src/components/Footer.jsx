import { Box, Typography, Link } from '@mui/material';
import useStyles from '../styles/styles';

export const Footer = () => {
  const date = new Date().getFullYear();
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.footerContainer}>
      <Typography className={classes.footerText}>
        Provided by{' '}
        <Link href="#" target="_blank" underline="none">
          Wilmer Herrera
        </Link>
      </Typography>
      <Typography className={classes.footerDate}>
        Restaurant Sample
      </Typography>
    </Box>
  );
};
