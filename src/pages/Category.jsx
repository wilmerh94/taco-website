import { Grid, Typography, Box } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import useStyles from '../styles/styles';

export const Category = () => {
  const classes = useStyles();

  const sectionItems = [
    {
      id: 1,
      icon: (
        <CelebrationIcon sx={{ fontSize: 100 }} color="primary" />
      ),
      sentence:
        'Solving world problems through Mexican Food using our experience and customization to make your life easier'
    },
    {
      id: 2,
      icon: (
        <AllInclusiveIcon sx={{ fontSize: 100 }} color="primary" />
      ),
      sentence:
        'Through team work, we collaborate and deliver quality food of high standards'
    },
    {
      id: 3,
      icon: (
        <PaidOutlinedIcon sx={{ fontSize: 100 }} color="primary" />
      ),
      sentence:
        'Flexible payment plan is applicable to all our services'
    }
  ];
  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
      <Grid container className={classes.sectionGridContainer}>
        {sectionItems.map(item => (
          <Grid
            item
            xs={12}
            md={3.5}
            minHeight={300}
            key={item.id}
            className={classes.sectionGridItem}
          >
            {item.icon}
            <Typography>{item.sentence}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
