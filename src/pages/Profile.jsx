/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CardItem } from '../components/CardItem/CardItem';
import { useProfile } from '../Hooks/useProfile';

export const Profile = () => {
  const { error, isLoading, formData } = useProfile();
  const { isAdmin, email, name } = formData;
  // const onChange = e => {
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [e.target.id]: e.target.value
  //   }));
  // };

  return (
    <>
      {isLoading ||
        (formData !== null && <div>Loading your Information </div>)}
      <Container maxWidth="sm">
        <Box
          component="main"
          sx={{
            marginTop: 8,
            marginBottom: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="span" variant="h4">
            Hi {name}, Welcome Back!
          </Typography>
          <Typography variant="body2" color="#717275" gutterBottom>
            This is going to be your profile to Add/Delete Tacos and
            more..
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <Typography component="h3" variant="h6">
              Personal Details
              <p>{email}</p>
              {isAdmin && <p>You are the owner of this</p>}
            </Typography>
          </Box>
          {/* Add New Post */}
          {/* Email inbox */}
          <Box>
            <Typography component="h2" variant="h6">
              <Button
                focusRipple
                variant="contained"
                sx={{ margin: 'auto' }}
                component={Link}
                to="/addingItem"
              >
                Adding New Taco
              </Button>
            </Typography>
          </Box>
          <Box></Box>
          {/* <div>Edit or remove tacos</div> */}
        </Box>
      </Container>

      <CardItem
      // onEdit={() => onEdit(listing.id)}
      />
    </>
  );
};
