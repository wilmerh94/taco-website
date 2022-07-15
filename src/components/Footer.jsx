import { Box, Typography, Link } from '@mui/material';
import useStyles from '../styles/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
        <InstagramIcon />
        <FacebookIcon />
        <LinkedInIcon />
      </Typography>
    </Box>
  );
};
