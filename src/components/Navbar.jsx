import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Box,
  Drawer
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from '../styles/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import { useTheme } from '@mui/material/styles';

export const Navbar = () => {
  const classes = useStyles();

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label
        >
          <img src="https://img.icons8.com/emoji/48/000000/taco-emoji.png" />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Vice Taco Truck
        </Typography>
        {matches ? (
          <Box>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon className={classes.menuIcon} fontSize="" />
            </IconButton>
            <Drawer anchor="right"></Drawer>
          </Box>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button color="inherit">Features</Button>
            <Button color="inherit">Pricing</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Login</Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};
