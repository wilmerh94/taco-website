// Material UI elements
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// Icons
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
// Hooks
import { useAuthStatus } from '../Hooks/useAuthStatus';
import { useProfile } from '../Hooks/useProfile';
import { useEdit } from '../Hooks/useEdit';
import { useNavigate } from 'react-router-dom';

export const ListingItem = ({ listing, onDelete }) => {
  const navigate = useNavigate();

  // Checking if the user is authorized to delete
  const { formData } = useProfile();
  const { listing: item, onEdit } = useEdit();
  const { isAdmin } = formData;
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
          {isAdmin && (
            <>
              <IconButton aria-label="delete" onClick={onDelete}>
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
