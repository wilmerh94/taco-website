import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@mui/material';

import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const CreatingItems = () => {
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    offer: false,
    description: '',
    image: {}
  });
  const { name, price, offer, description, image } = formData;
  const navigate = useNavigate();
  const auth = getAuth();

  // Making sure my user is authenticated
  //   useEffect(() => {
  //     if (isMounted) {
  //       onAuthStateChanged(auth, user => {
  //         if (user) setFormData({ ...formData, userRef: user.uid });
  //         else navigate('/sign-in');
  //       });
  //     }

  //     return () => {
  //       isMounted.current = false;
  //     };
  //     //eslint-disable-next-line
  //   }, [isMounted]);

  const onSubmit = async e => {
    e.preventDefault();
    //  setLoading(true);
    if (image.length > 3) {
      // setLoading(false);
      toast.error('You can only upload up to 6 images');
      return;
    }

    //  Store image in firebase
    const storeImage = async image => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        //   const fileName = `${auth.currentUser.uid}-${
        //     image.name
        //   }-${uuidv4()}`;

        const storageRef = ref(storage, 'images/' + 'test1');

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) *
              100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          error => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(
              downloadURL => {
                resolve(downloadURL);
              }
            );
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...image].map(img => storeImage(img))
    ).catch(() => {
      // setLoading(false);
      toast.error('Images not uploaded');
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp()
    };
    delete formDataCopy.images;

    const docRef = await addDoc(
      collection(db, 'tacos'),
      formDataCopy
    );
    //  setLoading(false);
    toast.success('Listing saved');
    navigate('/');
    //  navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = e => {
    let boolean = null;

    if (e.target.value === 'true') boolean = true;

    if (e.target.value === 'false') boolean = false;

    //File
    if (e.target.files) {
      setFormData(prevState => ({
        ...prevState,
        images: e.target.files
      }));
    }
    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData(prevState => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value
      }));
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography component="h1" variant="h5">
        Create Tacos
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        onSubmit={onSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          type="text"
          autoFocus
          value={name}
          onChange={onMutate}
        />
        <TextField
          margin="normal"
          fullWidth
          name="description"
          label="Description"
          type="text"
          id="description"
          value={description}
          onChange={onMutate}
          required
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          label="Price"
          name="price"
          type="text"
          value={price}
          onChange={onMutate}
        />
        <p className="imagesInfo">
          The first image will be the cover (max 6).
        </p>
        <Button variant="contained" component="label">
          <input
            style={{ display: 'none' }}
            type="file"
            id="image"
            onChange={onMutate}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          Upload File
        </Button>
      </Box>
    </Box>
  );
};
