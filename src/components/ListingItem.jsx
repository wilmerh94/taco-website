// Material UI elements
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
// Icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// Hooks
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useEdit } from '../Hooks/useEdit';
import { useFireStore } from '../Hooks/useFireStore';
export const ListingItem = ({ listing }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuthContext();

  // Checking if the user is authorized to delete
  const { deleteDocument, response } = useFireStore('tacos');

  const { onEdit } = useEdit();

  useEffect(() => {
    if (response.success) {
      navigate('/profile');
      toast.success('Deleted item from the list!');
    }
  }, [response.success]);

  return (
    <>
      <Card
        key={listing.id}
        sx={{
          maxWidth: '450px',
          maxHeight: '600px',
          padding: '25px',
          borderRadius: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)'
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
          <Typography variant="subtitle1" color="text.primary">
            {listing.description}
          </Typography>
          <Typography variant="overline" color="text.secondary">
            ${listing.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          {isAdmin && (
            <>
              <IconButton
                aria-label="delete"
                onClick={() => deleteDocument(listing.id)}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => onEdit(listing.id)}
              >
                <ModeEditIcon />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
    </>
  );
};
