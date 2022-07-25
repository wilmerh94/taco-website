import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CardItem } from '../components/CardItem/CardItem';
import { useFireStore } from '../Hooks/useFireStore';

const defaultValues = {
  name: '',
  price: 0.0,
  description: '',
  image: {}
};
export const TransactionForm = ({ uid }) => {
  // Form Data
  const [formValues, setFormValues] = useState(defaultValues);
  const { name, price, description } = formValues;
  // Reducer
  const { addDocument, response } = useFireStore('tacos');

  // Handles
  const handleInputChange = e => {
    e.preventDefault();
    const uploadedFile = e?.target.files;

    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
      image: uploadedFile,
      uid: uid
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    // if (image.length > 2) {
    //   toast.error('You can only upload up to 2 images');
    //   return;
    // }

    // addImage(formValues);
    addDocument(formValues);
    if (response.success) {
      toast.success('File successfully uploaded');
    }
  };

  useEffect(() => {
    if (response.success) {
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
          onSubmit={handleSubmit}
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
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="price"
            label="Price"
            value={price}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
              onChange={handleInputChange}
              max="2"
            />
            Upload
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Adding
          </Button>
        </Box>
      </Box>
      <CardItem />
    </>
  );
};
