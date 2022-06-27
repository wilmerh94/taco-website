import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import background from '../assets/jpg/TacoTruck1.jpeg';
export const Head = () => {
  return (
    <>
      <div
        className="Card"
        style={{
          height: '100%',
          width: '100%',
          top: '0',
          left: '0',
          minWidth: 'auto',
          minHeight: 'auto',
          maxWidth: '100%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${background}) `
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 20,
            right: 0,
            bottom: 75,
            textAlign: 'center'
          }}
        >
          <Button
            focusRipple
            variant="contained"
            sx={{ margin: 'auto' }}
          >
            Schedule Taco day
          </Button>
        </Box>
      </div>
    </>
  );
};
