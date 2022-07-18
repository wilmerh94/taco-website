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
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CardItem } from '../components/CardItem';
import { useFetching } from '../Hooks/useProfile';

export const Profile = () => {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const { name, email } = formData;

  const { error, isLoading, onDelete } = useFetching();

  // const onSubmit = async () => {
  //   try {
  //     if (auth.currentUser.displayName !== name) {
  //       // Update display name in fb
  //       await updateProfile(auth.currentUser, {
  //         displayName: name
  //       });

  //       // Update in firestore
  //       const userRef = doc(db, 'users', auth.currentUser.uid);
  //       await updateDoc(userRef, {
  //         name
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error('Could not update profile details');
  //   }
  // };

  // const onChange = e => {
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [e.target.id]: e.target.value
  //   }));
  // };

  return (
    <>
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
            <Typography component="h2" variant="h6">
              Personal Details
              <p>{email}</p>
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
          {/* <div>Edit or remove tacos</div> */}
        </Box>
      </Container>

      <CardItem
      // onEdit={() => onEdit(listing.id)}
      />
    </>
  );
};
