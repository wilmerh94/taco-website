import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useFireStore } from '../Hooks/useFireStore';

const defaultValues = {
  name: '',
  price: 0.0,
  description: '',
  image: {}
};

export const AddingItem = ({ uid }) => {
  const { addDocument, response } = useFireStore('tacos');

  const [formValues, setFormValues] = useState(defaultValues);
  const { name, price, description, image } = formValues;

  // Making image no more than 2
  const onSubmit = async e => {
    e.preventDefault();
    addDocument(formValues);
    // if (image.length > 2) {
    //   toast.error('You can only upload up to 2 images');
    //   return;
    // }
  };

  const onMutate = e => {
    e.preventDefault();
    // let boolean = null;
    const uploadedFile = e?.target.files;

    setFormValues({
      ...formValues,
      // [e.target.id]: boolean ?? e.target.value
      [e.target.id]: e.target.value,
      image: uploadedFile,
      uid: uid
    });

    // if (e.target.value === 'true') boolean = true;

    // if (e.target.value === 'false') boolean = false;
  };
  useEffect(() => {
    if (response.success) {
      toast.success('File successfully uploaded');
      setFormValues(defaultValues);
    }
  }, [response.success]);

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
            type="number"
            required
            fullWidth
            id="price"
            label="Price"
            value={price}
            onChange={onMutate}
            inputProps={{ step: '0.1', lang: 'en-US' }}
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
          />
          <Button variant="contained" component="label">
            <input
              hidden
              type="file"
              accept=".jpg,.png,.jpeg"
              multiple
              required
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
