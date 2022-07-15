import {
  addDoc,
  collection,
  doc,
  refEqual,
  setDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export const AddingItem = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    image: ''
  });
  const { name, price, description, image } = formData;

  //   useEffect(() => {
  //     const addTaco = async () => {
  //       await setDoc(doc(db, 'tacos'), {
  //         name: '',
  //         price: 0,
  //         description: '',
  //         image: ''
  //       });
  //     };
  //   }, []);
  // Making image no more than 2
  const onSubmit = async e => {
    e.preventDefault();
    if (image.length > 2) {
      toast.error('You can only upload up to 6 images');
      return;
    }

    //  Store image in firebase
    const storeImage = async image => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}`;

        const storageRef = ref(storage, 'images/' + fileName);

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
      [...images].map(image => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error('Images not uploaded');
      return;
    });
    const formDataCopy = {
      ...formData,
      imgUrls
    };
    delete formDataCopy.images;

    await addDoc(collection(db, 'tacos'), formDataCopy);
    toast.success('Listing saved');
    navigate(`/`);
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
    <>
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
          Adding a New Taco
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 2, maxWidth: '350px' }}
          onSubmit={onSubmit}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            type="text"
            autoFocus
            value={name}
            onChange={onMutate}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            type="number"
            value={price}
            onChange={onMutate}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            id="description"
            type="text"
            value={description}
            onChange={onMutate}
          />
          <Button variant="contained" component="label">
            <input
              hidden
              type="file"
              accept=".jpg,.png,.jpeg"
              multiple
              required
              label="Images"
              id="image"
              onChange={onMutate}
              max="2"
            />
            Upload
          </Button>
          <Button
            type="submit"
            onClick={onSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Adding
          </Button>
        </Box>
      </Box>
    </>
  );
};
