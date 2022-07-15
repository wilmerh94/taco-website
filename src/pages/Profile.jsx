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
import { getAuth, updateProfile } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
import { CardItem } from '../components/CardItem';

export const Profile = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  // const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const { name, email } = formData;
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'tacos'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const results = [];
      querySnapshot.forEach(doc => {
        results.push(doc.data().name);
      });
      setListings(results);
      setLoading(false);
    });
    //   const fetchUserListings = async () => {
    //     const listingsRef = collection(db, 'tacos');
    //     // const q = query(listingsRef);
    //     // const querySnap = await getDocs(q);
    //     const listings = [];
    //     querySnap.forEach(doc => {
    //       return listings.push({
    //         id: doc.id,
    //         data: doc.data()
    //       });
    //     });
    //     setListings(listings);
    //   };
    //   fetchUserListings();
  }, []);

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

  const onDelete = async listingId => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId));
      const updatedListings = listings.filter(
        listing => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success('Successfully deleted listing');
    }
  };

  //   const onEdit = listingId => navigate(`/edit-listing/${listingId}`);
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
        onDelete={() => onDelete(listing.id)}
        // onEdit={() => onEdit(listing.id)}
      />
    </>
  );
};
