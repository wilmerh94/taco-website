import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const ListingItem = ({ listing }) => {
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
        <CardMedia
          component="img"
          height="194"
          alt="Tacos"
          image={listing.image}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive shrimp tacos is a perfect party dish and
            a fun meal to cook.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};
