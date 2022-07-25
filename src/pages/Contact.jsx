import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  Button
} from '@mui/material';
import useStyles from '../styles/styles';
import { toast } from 'react-toastify';
import { useFireStore } from '../Hooks/useFireStore';

const defaultValues = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

export const ContactUs = () => {
  const classes = useStyles();

  // Form Data
  const [formValues, setFormValues] = useState(defaultValues);
  const { name, email, subject, message } = formValues;

  // Reducer
  const { contactEmail, response } = useFireStore('email');

  // Handles
  const handleInputChange = e => {
    e.preventDefault();

    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    contactEmail(formValues);
  };
  useEffect(() => {
    if (response.success) {
      setFormValues(defaultValues);
      toast.success('We will get in touch with you soon!');
    }
  }, [response.success]);

  return (
    <Box className={classes.formContainer}>
      <Typography variant="h4" className={classes.formHeading}>
        Contact Us
      </Typography>
      <Box
        className={classes.form}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="name"
          label="Full Name"
          variant="outlined"
          fullWidth
          className={classes.inputField}
          value={name}
          onChange={handleInputChange}
        />

        <TextField
          id="email"
          required
          label="Email"
          variant="outlined"
          fullWidth
          className={classes.inputField}
          value={email}
          onChange={handleInputChange}
        />

        <TextField
          id="subject"
          label="Subject"
          variant="outlined"
          fullWidth
          className={classes.inputField}
          value={subject}
          onChange={handleInputChange}
        />

        <TextareaAutosize
          id="message"
          aria-label="minimum height"
          minRows={6}
          placeholder="Enter a message"
          className={classes.textArea}
          spellCheck
          value={message}
          onChange={handleInputChange}
        />
        {/* TODO sending the email
        <a
              href={`mailto:${
                landlord.email
              }?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
 */}

        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ width: '200px', fontSize: '16px' }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
