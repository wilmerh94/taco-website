import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
export const useSignIn = () => {
  const navigate = useNavigate();
  const [isCancelled, setIsCancelled] = useState(false);

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
        if (!isCancelled) {
          toast.success('Welcome Back');
          setIsLoading(false);
          setError(null);
          navigate('/');
        }
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        toast.error(err);
        setError(err.message);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isLoading, SignIn };
};
