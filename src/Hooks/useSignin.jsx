import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
export const useSignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const SignIn = async (email, password) => {
    setError(null);
    setIsLoading(true);
    try {
      // SignIn user
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Checking if the user is already signed in
      if (!userCredential) {
        toast.error('Could not complete Sign In');
      } else {
        toast.success('Welcome Back');
        setIsLoading(false);
        setError(null);
        navigate('/');
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { error, isLoading, SignIn };
};
