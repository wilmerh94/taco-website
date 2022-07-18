import {
  addDoc,
  collection,
  doc,
  refEqual,
  setDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { db } from '../../firebase.config';
import { useStorageImg } from '../Hooks/useStorageImg';
import { useEdit } from '../Hooks/useEdit';

export const EditingItems = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();
  const fileInput = useRef(null);

  const {
    error,
    isLoading,
    editItem,
    formData,
    setFormData
  } = useStorageImg();
  // const { formData } = useEdit();
  const { name, description, price } = formData;
  const [form, setForm] = useState(formData);
  // Making image no more than 2
  const onMutate = e => {
    setForm(formData);
    setForm(e.target.files);
    let boolean = null;
    if (e.target.value === 'true') boolean = true;

    if (e.target.value === 'false') boolean = false;

    //File
    if (e.target.files) {
      setFormData(prevState => ({
        ...prevState,
        [e.target.id]: e.target.files
      }));
      setForm(formData);
      console.log(form);
    } else {
      // Text/Booleans/Numbers
      setFormData(prevState => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value
      }));
      setForm(formData);
    }
    console.log(form);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(form);
    editItem(form);
  };

  return (
    <>
      {!isLoading || (formData !== null && <p>Loading...</p>)}
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
          autoComplete="off"
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
            InputLabelProps={{ shrink: true }}
            value={name}
            onChange={onMutate}
          />
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="price"
            label="Price"
            value={price}
            onChange={onMutate}
            inputProps={{
              inputMode: 'numeric',
              step: '0.1',
              lang: 'en-US'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
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
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" component="label">
            <input
              style={{ display: 'none' }}
              type="file"
              accept=".jpg,.png,.jpeg"
              multiple
              label="Image"
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
