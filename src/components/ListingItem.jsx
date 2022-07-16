import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { db } from '../../firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';

export const ListingItem = ({ listing, onDelete }) => {
  const auth = getAuth();
  const [userAuth, setUserAuth] = useState(false);
  useEffect(() => {
    if (auth.currentUser !== null) {
      setUserAuth(true);
    }
  }, [auth.currentUser]);

  return (
    <>
      <Card
        key={listing.id}
        sx={{
          maxWidth: '450px',
          maxHeight: '600px',
          padding: '25px'
        }}
      >
        <CardHeader title={listing.name} />
        {listing.imgUrl.map((url, index) => (
          <CardMedia
            key={index}
            component="img"
            height="194"
            alt={url}
            image={`${listing.imgUrl[index]} `}
          />
        ))}

        <CardContent>
          <Typography variant="body1" color="text.primary">
            {listing.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${listing.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          {userAuth && (
            <IconButton aria-label="delete" onClick={onDelete}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </>
  );
};
