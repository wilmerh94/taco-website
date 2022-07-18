import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
export const useFetching = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState([]);

  // Fetching Data
  useEffect(() => {
    setError(null);
    setIsLoading(true);
    try {
      const q = query(collection(db, 'tacos'));
      const unsubscribe = onSnapshot(q, querySnapshot => {
        if (querySnapshot.empty) {
          toast.error('No tacos to load');
        } else {
          const results = [];
          querySnapshot.forEach(doc => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setListings(results);
          setIsLoading(false);
          setError(null);
        }
      });
    } catch (err) {
      console.log(err.message);
      toast.error(err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  const onDelete = async listingId => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'tacos', listingId));
      const updatedListings = listings.filter(
        listing => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success('Successfully deleted listing');
    }
  };

  //   const onEdit = listingId => navigate(`/edit-listing/${listingId}`);

  return { error, isLoading, listings, onDelete };
};
