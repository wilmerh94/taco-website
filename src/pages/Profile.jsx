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
import { useFetching } from '../Hooks/useListing';
import { EmailList } from '../components/EmailList/EmailList';

export const Profile = ({ user, isAdmin }) => {
  const { email, displayName } = user;
  const { error, isLoading, listings } = useFetching('email');
  return (
    <>
      {!isLoading ||
        (user !== null && <div>Loading your Information </div>)}
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
            Hi {displayName}, Welcome Back!
          </Typography>
          <Typography variant="body2" color="#717275" gutterBottom>
            This is going to be your profile to Add/Delete Tacos and
            more..
          </Typography>
          <Box
            noValidate
            sx={{
              marginTop: 1,
              marginBottom: 1,
              alignItems: 'center'
            }}
          >
            <Typography component="h6" variant="h6">
              Personal Details (
              {isAdmin && (
                <span style={{ fontSize: '12px' }}>
                  You are the owner of this
                </span>
              )}
              )
            </Typography>
          </Box>
          <Typography variant="body2" color="#717275">
            {email}
          </Typography>
          {/* Add New Post */}
          {/* Email inbox */}
          {isAdmin && (
            <>
              <Typography
                variant="body2"
                color="#717275"
                gutterBottom
              >
                This is going to be where you will see your email
                that people send you through the website
              </Typography>

              {listings && <EmailList emails={listings} />}
            </>
          )}
          <Box
            sx={{
              marginTop: 2,
              marginBottom: 1
            }}
          >
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

      <CardItem />
    </>
  );
};
